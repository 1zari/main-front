import { FormField } from "@/features/recruit/components/inputs";
import { INPUT_CLASS } from "@/features/recruit/constants/classNames";
import { JobPostFormValues } from "@/features/recruit/schemas/jobPostSchema";
import { FieldError, UseFormRegister } from "react-hook-form";

export function JobSummaryInput({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField label="근무요약" error={error}>
      <input {...register("jobSummary")} placeholder="50자 이내 입력" className={INPUT_CLASS} />
    </FormField>
  );
}
