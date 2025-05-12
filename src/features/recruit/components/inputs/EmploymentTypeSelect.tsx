import { FormField } from "@/features/recruit/components/inputs";
import { RADIO_CHECKBOX_CLASS } from "@/features/recruit/constants/classNames";
import { JobPostFormValues } from "@/features/recruit/schemas/jobPostSchema";
import { FieldError, UseFormRegister } from "react-hook-form";

export function EmploymentTypeSelect({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField label="고용형태" error={error}>
      <div className="flex gap-2">
        {["정규직", "계약직"].map((option) => (
          <label key={option} className="cursor-pointer">
            <input
              type="radio"
              value={option}
              {...register("employmentType")}
              className="hidden peer"
            />
            <div className={RADIO_CHECKBOX_CLASS}>{option}</div>
          </label>
        ))}
      </div>
    </FormField>
  );
}
