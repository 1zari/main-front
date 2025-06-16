import { FormField } from "@/features/recruit/components/inputs";
import { RADIO_CHECKBOX_CLASS } from "@/features/recruit/constants/classNames";
import { JobPostFormValues } from "@/features/recruit/schemas/jobPostSchema";
import { FieldError, UseFormRegister } from "react-hook-form";

export function PostingType({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField label="일자리종류" error={error}>
      <div className="flex gap-2">
        {["기업", "공공"].map((option) => (
          <label key={option} className="cursor-pointer">
            <input
              type="radio"
              value={option}
              {...register("posting_type")}
              className="hidden peer"
            />
            <div className={RADIO_CHECKBOX_CLASS}>{option}</div>
          </label>
        ))}
      </div>
    </FormField>
  );
}
