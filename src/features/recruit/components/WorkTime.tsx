"use client";
import { useFormContext, Controller } from "react-hook-form";
import CheckNegotiable from "./common/Negotiable";

const timeOptions = Array.from({ length: 48 }, (_, index) => {
  const hour = String(Math.floor(index / 2)).padStart(2, "0");
  const minute = index % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

const WorkTime = () => {
  const { control, watch, setValue } = useFormContext();
  const negotiable = watch("workTimeNegotiable") || false;

  return (
    <div className="text-gray-700">
      <div className="flex items-center">
        <label className="text-sm font-medium text-gray-700 min-w-[64px]">근무 시간</label>
        <div className="flex items-center gap-1">
          <Controller
            control={control}
            name="workStartTime"
            render={({ field }) => (
              <select
                {...field}
                className="ml-1 w-28 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F8C3B]"
                disabled={negotiable}
              >
                <option value="">시작 시간</option>
                {timeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            )}
          />
          <span className="text-sm font-medium">~</span>
          <Controller
            control={control}
            name="workEndTime"
            render={({ field }) => (
              <select
                {...field}
                className="w-28 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F8C3B]"
                disabled={negotiable}
              >
                <option value="">종료 시간</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      </div>
      <div className="mt-1 ml-18">
        <Controller
          control={control}
          name="workTimeNegotiable"
          render={({ field }) => (
            <CheckNegotiable
              id="workTimeNegotiable"
              checked={field.value || false}
              onChange={(checked: boolean) => {
                field.onChange(checked);
                if (checked) {
                  setValue("workStartTime", "");
                  setValue("workEndTime", "");
                }
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default WorkTime;
