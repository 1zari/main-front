"use client";

import { useState } from "react";

export default function FilterOtherConditions() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [dayNegotiable, setDayNegotiable] = useState(false);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const checkboxGroup = (label: string, options: string[]) => (
    <div className="grid grid-cols-[4rem_2fr] items-start gap-x-3">
      <span className="w-16 font-bold">{label}</span>
      <div className="flex gap-4 flex-wrap">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-1">
            <input type="checkbox" />
            {option}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="border rounded-md rounded-t-none bg-white p-4 grid gap-x-4 gap-y-7">
      {checkboxGroup("고용형태", ["정규직", "계약직"])}
      {checkboxGroup("경력여부", ["경력무관", "경력"])}
      {checkboxGroup("학력", ["학력무관", "고졸", "대졸이상"])}

      <div className="grid grid-cols-[4rem_1fr] items-start gap-x-3">
        <span className="w-16 font-bold">근무요일</span>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-x-2 gap-y-2">
            {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-4 py-2 border rounded ${
                  selectedDays.includes(day) ? "bg-primary text-white" : "bg-white text-black"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={dayNegotiable}
              onChange={() => setDayNegotiable(!dayNegotiable)}
            />
            요일 협의
          </label>
        </div>
      </div>
    </div>
  );
}
