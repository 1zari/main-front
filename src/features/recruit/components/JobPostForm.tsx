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
import { useForm } from "react-hook-form";
import { undefined } from "zod";
import { JobPostFormValues, jobPostSchema } from "../schemas/jobPostSchema";
import { SectionTitle } from "./inputs";

export default function JobPostForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, touchedFields },
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
      workingHours: { start: "", end: "" },
      jobSummary: "",
      jobDescription: "",
      agreeTerms: false,
    },
  });

  const onSubmit = (data: JobPostFormValues) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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

      <WorkingHoursInput register={register} error={errors.workingHours} />
      <SectionTitle title="공고상세" />
      <JobSummaryInput register={register} error={errors.jobSummary} />
      <JobDescriptionInput register={register} error={errors.jobDescription} />
      <AgreeTermsCheckbox register={register} error={errors.agreeTerms} />
      <button
        type="submit"
        className="mt-6 h-12 bg-primary hover:bg-green-700 text-white font-bold py-2 rounded"
      >
        등록하기 || 수정하기
      </button>
    </form>
  );
}
