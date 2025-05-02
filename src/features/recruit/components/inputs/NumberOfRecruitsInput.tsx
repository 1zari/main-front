import { FormField } from "@/features/recruit/components/inputs";
import { INPUT_CLASS } from "@/features/recruit/constants/classNames";
import { JobPostFormValues } from "@/features/recruit/schemas/jobPostSchema";
import { FieldError, UseFormRegister } from "react-hook-form";

export function NumberOfRecruitsInput({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField label="모집인원" error={error}>
      <input
        type="number"
        {...register("numberOfRecruits", { valueAsNumber: true })}
        placeholder="예시) 00"
        className={`relative ${INPUT_CLASS} [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">명</span>
    </FormField>
  );
}
