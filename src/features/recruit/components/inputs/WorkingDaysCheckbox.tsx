import { FormField } from "@/features/recruit/components/inputs";
import { JobPostFormValues } from "@/features/recruit/schemas/jobPostSchema";
import { FieldError, UseFormRegister } from "react-hook-form";

export function WorkingDaysCheckbox({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError | FieldError[] | undefined;
}) {
  return (
    <FormField label="근무요일" error={error}>
      <div className="flex gap-2 flex-wrap">
        {["월", "화", "수", "목", "금", "토", "일", "요일협의"].map((day) => (
          <label key={day}>
            <input
              type="checkbox"
              value={day}
              {...register("workingDays")}
              className="hidden peer"
            />
            <div
              className={`flex items-center justify-center border-1 rounded peer-checked:bg-white peer-checked:border-primary text-gray-700 peer-checked:text-primary ${
                day === "요일협의" ? "h-10 px-4" : "w-10 h-10"
              }`}
            >
              {day}
            </div>
          </label>
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm">
          {Array.isArray(error) ? error[0]?.message : error.message}
        </p>
      )}
    </FormField>
  );
}
