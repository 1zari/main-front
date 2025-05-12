"use client";
import { useFormContext } from "react-hook-form";
import CheckNegotiable from "./CheckNegotiable";

const Days = ["월", "화", "수", "목", "금", "토", "일"];

const CheckDays = () => {
  const { watch, setValue } = useFormContext();
  const value: string[] = watch("workDays") || [];
  const isNegotiable: boolean = watch("workDaysNegotiable") || false;

  const toggleDay = (day: string) => {
    const newDays = value.includes(day) ? value.filter((d) => d !== day) : [...value, day];
    setValue("workDays", newDays);
  };

  return (
    <div className="text-gray-700">
      <div className="flex items-center">
        <label className="text-sm font-medium text-gray-700 min-w-[64px]">근무 요일</label>
        <div className="flex gap-1 flex-wrap items-center ml-2">
          {Days.map((day) => (
            <button
              type="button"
              key={day}
              onClick={() => toggleDay(day)}
              className={`px-2 py-1 border rounded-md text-sm ${
                value.includes(day)
                  ? "bg-[#0F8C3B] text-white border-[#0F8C3B]"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-1 ml-18">
        <CheckNegotiable
          id="workDaysNegotiable"
          checked={isNegotiable}
          onChange={(checked: boolean) => setValue("workDaysNegotiable", checked)}
        />
      </div>
    </div>
  );
};

export default CheckDays;
