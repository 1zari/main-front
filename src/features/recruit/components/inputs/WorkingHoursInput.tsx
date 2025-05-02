import { FormField } from "@/features/recruit/components/inputs";
import { INPUT_CLASS } from "@/features/recruit/constants/classNames";
import { JobPostFormValues } from "@/features/recruit/schemas/jobPostSchema";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export function WorkingHoursInput({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldErrors<JobPostFormValues["workingHours"]>;
}) {
  return (
    <FormField label="근무시간" error={error}>
      <div className="flex flex-wrap items-center gap-3">
        {/* <label>시작 시간</label> */}
        <div className="flex gap-1 items-center">
          <input
            type="time"
            {...register("workingHours.start")}
            className={`${INPUT_CLASS} min-w-[150px]`}
          />

          <span>~</span>
          {/* <label>종료 시간</label> */}
          <input
            type="time"
            {...register("workingHours.end")}
            className={`${INPUT_CLASS} min-w-[150px]`}
          />
        </div>
        <label>
          <input
            type="checkbox"
            {...register("workingHours.negotiable")}
            value="시간협의"
            className="hidden peer"
          />
          <div className="h-10 px-4 flex items-center justify-center border-1 rounded peer-checked:bg-white peer-checked:border-primary text-gray-700 peer-checked:text-primary">
            시간 협의
          </div>
        </label>
      </div>

      {error?.start && <p className="text-red-500 text-sm">{error.start.message}</p>}
    </FormField>
  );
}
