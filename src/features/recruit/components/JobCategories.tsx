"use client";
import { useFormContext, Controller } from "react-hook-form";
import { useState, useRef, useEffect } from "react";

const JOB_OPTIONS = ["서비스", "운반", "청소", "배달", "인바운드", "경비", "고객상담"];

const SelectJobs = () => {
  const {
    control,

  } = useFormContext();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className=" flex mt-2 relative items-center" ref={dropdownRef}>
      <label className="w-18 block text-sm font-medium text-gray-700 mb-1">직종</label>
      <Controller
        control={control}
        name="selectJobs"
        render={({ field: { value = [], onChange } }) => (
          <>
            <button
              type="button"
              className={`w-full text-left px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F8C3B] 
              `}
              onClick={() => setOpen((prev) => !prev)}
            >
              {value.length === 0 ? (
                <span className="text-gray-400">직종을 선택하세요</span>
              ) : (
                value.join(", ")
              )}
            </button>
            {open && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto">
                {JOB_OPTIONS.map((job) => (
                  <label
                    key={job}
                    className="flex items-center px-3 py-2 cursor-pointer hover:bg-[#F0FFF5] text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={value.includes(job)}
                      onChange={() => {
                        if (value.includes(job)) {
                          onChange(value.filter((v: string) => v !== job));
                        } else {
                          onChange([...value, job]);
                        }
                      }}
                      className="mr-2"
                    />
                    {job}
                  </label>
                ))}
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};

export default SelectJobs;
