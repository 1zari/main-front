import { jobPostApi } from "@/api/job";
import { AgreeTermsCheckbox } from "@/features/recruit/components/inputs/AgreeTermsCheckbox";
import { CareerRadio } from "@/features/recruit/components/inputs/CareerRadio";
import { DeadlineInput } from "@/features/recruit/components/inputs/DeadlineInput";
import { EducationRadio } from "@/features/recruit/components/inputs/EducationRadio";
import { EmploymentTypeSelect } from "@/features/recruit/components/inputs/EmploymentTypeSelect";
import { JobDescriptionInput } from "@/features/recruit/components/inputs/JobDescriptionInput";
import { JobLocationInput } from "@/features/recruit/components/inputs/JobLocationInput";
import { JobSummaryInput } from "@/features/recruit/components/inputs/JobSummaryInput";
import { NumberOfRecruitsInput } from "@/features/recruit/components/inputs/NumberOfRecruitsInput";
import { OccupationInput } from "@/features/recruit/components/inputs/OccupationInput";
import { PostingType } from "@/features/recruit/components/inputs/PostingType";
import { SalaryInput } from "@/features/recruit/components/inputs/SalaryInput";
import { TitleInput } from "@/features/recruit/components/inputs/TitleInput";
import { WorkingDaysCheckbox } from "@/features/recruit/components/inputs/WorkingDaysCheckbox";
import { WorkingHoursInput } from "@/features/recruit/components/inputs/WorkingHoursInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { JobPostFormValues, jobPostSchema } from "../schemas/jobPostSchema";
import { SectionTitle } from "./inputs";

type Mode = "create" | "edit";

type JobPostFormProps = {
  mode: Mode;
  id?: string;
  defaultValues?: Partial<JobPostFormValues>;
  onSubmitSuccess?: () => void;
};

export default function JobPostForm({
  mode,
  id,
  defaultValues,
  onSubmitSuccess,
}: JobPostFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<JobPostFormValues>({
    resolver: zodResolver(jobPostSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      occupation: [],
      location: "",
      locationDetail: "",
      deadline: "",
      workingDays: [],
      jobSummary: "",
      jobDescription: "",
      agreeTerms: false,
      ...defaultValues,
    },
  });
  const sessionRef = useRef<Session | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && !sessionRef.current) {
      sessionRef.current = session;
      console.log("세션 캐싱:", sessionRef.current);
    }
    // else {
    //   console.log("로그인 상태 아님:", status);
    // }
  }, [session, status]);

  useEffect(() => {
    const fetchJobPostData = async () => {
      if (mode === "edit" && id) {
        try {
          const data = await jobPostApi.getJobPostDetail(id);
          const job_posting = data.job_posting;
          reset({
            title: job_posting.job_posting_title,
            occupation: job_posting.job_keyword_sub,
            location: job_posting.city || "",
            locationDetail: job_posting.address || "",
            deadline: job_posting.deadline || "",
            workingDays: job_posting.work_day as JobPostFormValues["workingDays"],
            jobSummary: job_posting.summary || "",
            jobDescription: job_posting.content || "",
            agreeTerms: true,
            numberOfRecruits: job_posting.number_of_positions ?? 0,
            salary: job_posting.salary ?? 0,
            salaryType: job_posting.salary_type || "",
            posting_type: job_posting.posting_type === "true" ? true : false,
          });
        } catch (error) {
          console.error("공고 데이터를 불러오는 중 에러 발생:", error);
        }
      }
    };

    fetchJobPostData();
  }, [mode, id, reset]);
  const convertFormDataToRequestDto = (formData: JobPostFormValues) => {
    return {
      job_posting_title: formData.title,
      occupation: formData.occupation,
      address: `${formData.location} ${formData.locationDetail}`,
      // city: "",
      // town: "",
      // district: "",
      // location: [2.3, 2.3],
      // location: formData.locationxy,
      // location: null,
      // location: {
      //   type: "Point",
      //   coordinates: [127.123456, 37.123456],
      // },
      // location: [127.123456, 37.123456],
      workingDays: formData.workingDays,
      work_time_start: "09:00",
      work_time_end: "18:00",
      posting_type: String(formData.posting_type),
      employment_type: formData.employmentType,
      work_experience: formData.career,
      job_keyword_main: "",
      job_keyword_sub: formData.occupation,
      number_of_positions: Number(formData.numberOfRecruits),
      education: formData.education,
      deadline: formData.deadline,
      time_discussion: true,
      day_discussion: true,
      work_day: formData.workingDays,
      salary_type: formData.salaryType!,
      salary: Number(formData.salary),
      summary: formData.jobSummary,
      content: formData.jobDescription,
    };
  };

  const onSubmit = async (data: JobPostFormValues) => {
    const requestData = convertFormDataToRequestDto(data);

    try {
      if (mode === "create") {
        await jobPostApi.createJobPost(requestData);
        alert("등록이 완료되었습니다!");
        router.push("/recruit");
      } else {
        if (!id) throw new Error("수정에는 ID가 필요합니다.");

        await jobPostApi.updateJobPost(id, requestData);
        alert("수정이 완료되었습니다!");
        router.push("/recruit");
      }

      onSubmitSuccess?.();
    } catch (error) {
      console.error(error);
      alert("에러가 발생했습니다.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => {
        console.log("유효성 검사 실패", errors);
      })}
      className="flex flex-col gap-6 p-6 mt-3 max-w-3xl mx-auto mb-10 bg-white rounded-lg shadow-lg"
    >
      <TitleInput register={register} error={errors.title} />
      <SectionTitle title="채용조건" />

      <OccupationInput register={register} error={errors.occupation} setValue={setValue} />
      <EmploymentTypeSelect register={register} error={errors.employmentType} />
      <NumberOfRecruitsInput register={register} error={errors.numberOfRecruits} />
      <CareerRadio register={register} error={errors.career} />
      <EducationRadio register={register} error={errors.education} />
      <JobLocationInput
        register={register}
        error={{
          location: errors.location,
          locationDetail: errors.locationDetail,
        }}
        setValue={setValue}
        watch={watch}
      />
      <DeadlineInput register={register} error={errors.deadline} />
      <SectionTitle title="근무조건" />

      <SalaryInput register={register} error={errors.salary} />
      <WorkingDaysCheckbox
        register={register}
        error={Array.isArray(errors.workingDays) ? errors.workingDays : undefined}
      />

      <WorkingHoursInput
        register={register}
        error={errors.workingHourStart || errors.workingHourEnd || errors.workingHourNegotiable}
      />
      <SectionTitle title="공고상세" />
      <JobSummaryInput register={register} error={errors.jobSummary} />
      <JobDescriptionInput register={register} error={errors.jobDescription} />

      {/* <div className="flex items-center gap-2">
        <input type="checkbox" id="isPublicJob" {...register("posting_type")} className="w-4 h-4" />
        <label htmlFor="isPublicJob" className="text-sm">
          공공일자리 여부
        </label>
      </div> */}
      <PostingType register={register} />

      <AgreeTermsCheckbox register={register} error={errors.agreeTerms} />
      <button
        type="submit"
        className="mt-6 h-12 bg-primary hover:bg-green-700 text-white font-bold py-2 rounded"
      >
        {mode === "create" ? "등록하기" : "수정하기"}
      </button>
    </form>
  );
}
