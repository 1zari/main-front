import { FormField } from "@/features/recruit/components/inputs";
import { INPUT_CLASS } from "@/features/recruit/constants/classNames";
import { JobPostFormValues } from "@/features/recruit/schemas/jobPostSchema";
import { FieldError, UseFormRegister } from "react-hook-form";

export function JobDescriptionInput({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField label="상세요강" error={error}>
      <textarea
        {...register("jobDescription")}
        placeholder="상세요강 입력"
        rows={5}
        className={INPUT_CLASS}
      />
    </FormField>
  );
}
