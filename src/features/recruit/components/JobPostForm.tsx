import { AgreeTermsCheckbox } from "@/features/recruit/components/inputs/AgreeTermsCheckbox";
import { OccupationInput } from "@/features/recruit/components/inputs/OccupationInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { JobPostFormValues, jobPostSchema } from "../schemas/jobPostSchema";
import {
  CareerRadio,
  DeadlineInput,
  EducationRadio,
  EmploymentTypeSelect,
  JobDescriptionInput,
  JobSummaryInput,
  LocationInput,
  NumberOfRecruitsInput,
  SalaryInput,
  SectionTitle,
  TitleInput,
  WorkingDaysCheckbox,
  WorkingHoursInput,
} from "./inputs";

export default function JobPostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobPostFormValues>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      title: "",
      occupation: "",
      employmentType: "정규직",
      numberOfRecruits: null,
      career: "경력무관",
      education: "학력무관",
      location: "",
      deadline: "",
      salary: null,
      workingDays: [],
      workingHours: { start: "09:00", end: "16:00" },
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

      <OccupationInput register={register} error={errors.occupation} />
      <EmploymentTypeSelect register={register} error={errors.employmentType} />
      <NumberOfRecruitsInput register={register} error={errors.numberOfRecruits} />
      <CareerRadio register={register} error={errors.career} />
      <EducationRadio register={register} error={errors.education} />
      <LocationInput register={register} error={errors.location} />
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
        등록하기
      </button>
    </form>
  );
}
