"use client";
import CheckNegotiable from "./common/Negotiable";
import { useState } from "react";

interface WorkDayProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const Days = ["월", "화", "수", "목", "금", "토", "일"];

const CheckDays = ({ value, onChange }: WorkDayProps) => {
  const [isNegotiable, setIsNegotiable] = useState(false);

  const toggleDay = (day: string) => {
    if (value.includes(day)) {
      onChange(value.filter((d) => d !== day));
    } else {
      onChange([...value, day]);
    }
  };

  return (
    <div className="text-gray-700">
      <div className="flex items-center ">
        <label className="text-sm font-medium text-gray-700">근무 요일</label>
        <div className="flex gap-1 flex-wrap items-center ml-2">
          {Days.map((day) => (
            <button
              type="button"
              key={day}
              onClick={() => toggleDay(day)}
              className={`px-2 py-1 border rounded-md text-sm ${
                value.includes(day)
                  ? "bg-[#0F8C3B] text-white"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-1 ml-14">
        {/* 드롭다운 정렬 맞추기 위해 label 너비만큼 왼쪽 여백 */}
        <CheckNegotiable
          id="workTimeNegotiable"
          checked={isNegotiable}
          onChange={setIsNegotiable}
        />
      </div>
    </div>
  );
};

export default CheckDays;
