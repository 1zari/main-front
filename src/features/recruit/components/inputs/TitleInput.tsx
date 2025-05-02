import { FormField } from "@/features/recruit/components/inputs";
import { INPUT_CLASS } from "@/features/recruit/constants/classNames";
import { JobPostFormValues } from "@/features/recruit/schemas/jobPostSchema";
import { FieldError, UseFormRegister } from "react-hook-form";

export function TitleInput({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField label="공고 제목" error={error}>
      <input
        {...register("title")}
        placeholder="50자 이내로 입력해주세요."
        className={INPUT_CLASS}
      />
    </FormField>
  );
}
