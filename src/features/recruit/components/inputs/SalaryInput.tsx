import { FormField } from "@/features/recruit/components/inputs";
import { INPUT_CLASS } from "@/features/recruit/constants/classNames";
import { JobPostFormValues } from "@/features/recruit/schemas/jobPostSchema";
import { FieldError, UseFormRegister } from "react-hook-form";

export function SalaryInput({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField label="급여" error={error}>
      <div className="flex gap-2 w-full">
        <select {...register("salaryType")} className="border rounded p-2">
          <option value="일급">일급</option>
          <option value="월급">월급</option>
          <option value="연봉">연봉</option>
        </select>
        <div className="relative w-full">
          <input
            type="text"
            {...register("salary", {
              valueAsNumber: true,
              setValueAs: (v) => (v === "" ? undefined : Number(String(v).replace(/,/g, ""))),
            })}
            placeholder="급여"
            className={`w-full ${INPUT_CLASS} [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
            onBlur={(e) => {
              const value = e.target.value.replace(/,/g, "");
              if (!isNaN(Number(value))) {
                e.target.value = Number(value).toLocaleString();
              }
            }}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">원</span>
        </div>
      </div>
    </FormField>
  );
}
