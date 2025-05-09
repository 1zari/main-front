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
import { SalaryInput } from "@/features/recruit/components/inputs/SalaryInput";
import { TitleInput } from "@/features/recruit/components/inputs/TitleInput";
import { WorkingDaysCheckbox } from "@/features/recruit/components/inputs/WorkingDaysCheckbox";
import { WorkingHoursInput } from "@/features/recruit/components/inputs/WorkingHoursInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
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
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
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
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("현재 로그인한 유저:", session?.user);
    } else {
      console.log("로그인 상태 아님:", status);
    }
  }, [session, status]);
  const convertFormDataToRequestDto = (formData: JobPostFormValues) => {
    return {
      title: formData.title,
      occupation: formData.occupation,
      address: `${formData.location} ${formData.locationDetail}`,
      deadline: formData.deadline,
      workingDays: formData.workingDays,
      // workingHours: {
      //   start: formData.workingHourStart,
      //   end: formData.workingHourEnd,
      //   negotiable: formData.workingHourNegotiable,
      // },
      salary: {
        type: formData.salaryType!,
        amount: Number(formData.salary),
      },
      summary: formData.jobSummary,
      description: formData.jobDescription,
    };
  };

  const onSubmit = async (data: JobPostFormValues) => {
    const requestData = convertFormDataToRequestDto(data);

    try {
      if (mode === "create") {
        await jobPostApi.createJobPost(requestData);
        alert("등록이 완료되었습니다!");
      } else {
        if (!id) throw new Error("수정에는 ID가 필요합니다.");

        await jobPostApi.updateJobPost(id, requestData);
        alert("수정이 완료되었습니다!");
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
