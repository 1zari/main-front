import { FormField } from "@/features/recruit/components/inputs";
import { RADIO_CHECKBOX_CLASS } from "@/features/recruit/constants/classNames";
import { JobPostFormValues } from "@/features/recruit/schemas/jobPostSchema";
import { FieldError, UseFormRegister } from "react-hook-form";

export function EducationRadio({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField label="학력" error={error}>
      <div className="flex gap-2">
        {["고졸", "대졸", "학력무관"].map((option) => (
          <label key={option} className="cursor-pointer">
            <input type="radio" value={option} {...register("education")} className="hidden peer" />
            <div className={RADIO_CHECKBOX_CLASS}>{option}</div>
          </label>
        ))}
      </div>
    </FormField>
  );
}
