"use client";

import { useState, useEffect, useRef } from "react";

interface JobProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const JobList = ["서비스", "운반", "청소", "배달", "인바운드", "경비", "고객상담"];

const SelectJobs = ({ value, onChange }: JobProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleCategory = (category: string) => {
    if (value.includes(category)) {
      onChange(value.filter((item) => item !== category));
    } else {
      onChange([...value, category]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center text-gray-700 relative" ref={dropdownRef}>
      {/* 왼쪽: 레이블 */}
      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">직종</label>

      {/* 오른쪽: 드롭다운 버튼 */}
      <div className="ml-8 w-full relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full text-left px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F8C3B]"
        >
          <span className={value.length === 0 ? "text-gray-400" : "text-gray-700"}>
            {value.length === 0 ? "직종을 선택하세요" : value.join(", ")}
          </span>
        </button>

        {/* 드롭다운 목록 */}
        {open && (
          <div className="absolute z-10 w-full mt-1 border border-gray-300 bg-white rounded-md shadow-md max-h-48 overflow-auto">
            {JobList.map((job) => (
              <label
                key={job}
                className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={value.includes(job)}
                  onChange={() => toggleCategory(job)}
                />
                {job}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectJobs;
