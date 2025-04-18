"use client";
import { useFormContext, Controller } from "react-hook-form";
import { useState, useMemo, useRef, useEffect } from "react";

const JOB_CATEGORIES = [
  {
    main: "서비스업",
    subs: ["음식 서비스", "고객 관리", "판매 지원", "인바운드", "홀서빙"],
  },
  {
    main: "운송업",
    subs: ["화물 운반", "배달 운전", "특수 운송"],
  },
  {
    main: "생산업",
    subs: ["제조 보조", "품질 검사", "포장 작업"],
  },
];

const SelectJobs = () => {
  const { control, setValue, watch } = useFormContext();
  const selectedMain = watch("jobMain") || "";
  const selectedSubs = watch("selectJobs") || [];
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // 대분류 변경 시 중분류 초기화
  const handleMainChange = (newMain: string) => {
    setValue("jobMain", newMain);
    setValue("selectJobs", []);
    setOpen(false);
  };

  const subOptions = useMemo(() => {
    const found = JOB_CATEGORIES.find((cat) => cat.main === selectedMain);
    return found ? found.subs : [];
  }, [selectedMain]);

  // 전체 선택 핸들러
  const handleSelectAll = (onChange: (v: string[]) => void, allSelected: boolean) => {
    if (allSelected) {
      onChange([]);
    } else {
      onChange([...subOptions]);
    }
  };

  const allSelected = subOptions.length > 0 && selectedSubs.length === subOptions.length;

  return (
    <div className="flex items-center w-full">
      {/* 대분류 드롭다운 */}
      <div className="w-20 text-sm font-semibold">
        <label> 직종</label>
      </div>
      <Controller
        control={control}
        name="jobMain"
        render={({ field }) => (
          <select
            {...field}
            className="ml-2 border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#0F8C3B]"
            onChange={(e) => handleMainChange(e.target.value)}
          >
            <option value="">대분류 선택</option>
            {JOB_CATEGORIES.map((cat) => (
              <option key={cat.main} value={cat.main}>
                {cat.main}
              </option>
            ))}
          </select>
        )}
      />

      {/* 중분류 다중선택 드롭다운 (기존 방식) */}
      <Controller
        control={control}
        name="selectJobs"
        render={({ field: { value = [], onChange } }) => (
          <div className="relative w-full" ref={dropdownRef}>
            <button
              type="button"
              className="ml-1 w-full text-left px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F8C3B]"
              onClick={() => setOpen((prev) => !prev)}
              disabled={!selectedMain}
            >
              {value.length === 0 ? (
                <span className="text-gray-400">중분류 선택</span>
              ) : allSelected ? (
                <span className="text-[#0F8C3B]">전체</span>
              ) : (
                value.join(", ")
              )}
            </button>
            {open && selectedMain && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto">
                {/* 전체 선택 */}
                <label className="flex items-center px-3 py-2 cursor-pointer hover:bg-[#F0FFF5] text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() => handleSelectAll(onChange, allSelected)}
                    className="mr-2"
                  />
                  전체
                </label>
                <div className="border-t" />
                {subOptions.map((sub) => (
                  <label
                    key={sub}
                    className="flex items-center px-3 py-2 cursor-pointer hover:bg-[#F0FFF5] text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={value.includes(sub)}
                      onChange={() => {
                        if (value.includes(sub)) {
                          onChange(value.filter((v: string) => v !== sub));
                        } else {
                          onChange([...value, sub]);
                        }
                      }}
                      className="mr-2"
                    />
                    {sub}
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default SelectJobs;
