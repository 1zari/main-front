import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { JobPostFormValues, jobPostSchema } from "../schemas/jobPostSchema";
import {
  AgreeTermsCheckbox,
  CareerRadio,
  DeadlineInput,
  EducationRadio,
  EmploymentTypeSelect,
  JobDescriptionInput,
  JobSummaryInput,
  LocationInput,
  NumberOfRecruitsInput,
  OccupationInput,
  SalaryInput,
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
      numberOfRecruits: 1,
      career: "경력무관",
      education: "학력무관",
      location: "",
      deadline: "",
      salary: 0,
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
      className="flex flex-col gap-6 p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md"
    >
      <TitleInput register={register} error={errors.title} />
      <OccupationInput register={register} error={errors.occupation} />
      <EmploymentTypeSelect register={register} error={errors.employmentType} />
      <NumberOfRecruitsInput register={register} error={errors.numberOfRecruits} />
      <CareerRadio register={register} error={errors.career} />
      <EducationRadio register={register} error={errors.education} />
      <LocationInput register={register} error={errors.location} />
      <DeadlineInput register={register} error={errors.deadline} />
      <SalaryInput register={register} error={errors.salary} />
      <WorkingDaysCheckbox register={register} error={Array.isArray(errors.workingDays) ? errors.workingDays : undefined} />
      <WorkingHoursInput register={register} error={errors.workingHours} />
      <JobSummaryInput register={register} error={errors.jobSummary} />
      <JobDescriptionInput register={register} error={errors.jobDescription} />
      <AgreeTermsCheckbox register={register} error={errors.agreeTerms} />
      <button
        type="submit"
        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded"
      >
        등록하기
      </button>
    </form>
  );
}
