"use client";

import { useSelectedFilterStore } from "@/stores/useJobFilterStore";

export default function JobConditionsFilter() {
  const {
    selectedDays,
    setSelectedDays,
    dayNegotiable,
    setDayNegotiable,
    addSelectedFilter,
    removeSelectedFilter,
    selectedFilters,
  } = useSelectedFilterStore();

  const toggleDay = (day: string) => {
    const currentDays = useSelectedFilterStore.getState().selectedDays;
    const isSelected = currentDays.includes(day);
    const updated = isSelected
      ? currentDays.filter((d) => d !== day)
      : [...currentDays, day];
    setSelectedDays(updated);

    const label = `근무요일: ${updated.join(",")}`;
    const filters = useSelectedFilterStore.getState().selectedFilters.filter(f => !f.startsWith("근무요일:"));
    useSelectedFilterStore.setState({
      selectedFilters: updated.length > 0 ? [...filters, label] : filters,
    });
  };

  const checkboxGroup = (label: string, options: string[], groupKey: string) => (
    <div className="grid grid-cols-[4rem_2fr] items-start gap-x-3">
      <span className="w-16 font-bold">{label}</span>
      <div className="flex gap-4 flex-wrap">
        {options.map((option) => {
          const value = `${groupKey}:${option}`;
          const isChecked = selectedFilters.includes(value);
          return (
            <label key={value} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                  if (isChecked) {
                    removeSelectedFilter(value);
                    // 지역 필터 제거 처리
                    if (value.includes(":")) {
                      const [region] = value.split(":");
                      const rest = useSelectedFilterStore.getState().selectedFilters.filter(f => !f.startsWith(`${region}:`));
                      const updatedLocationChecked = useSelectedFilterStore.getState().locationChecked.filter(d => !value.includes(d));
                      useSelectedFilterStore.setState({
                        locationChecked: updatedLocationChecked,
                        selectedFilters: rest,
                      });
                    }
                  } else {
                    addSelectedFilter(value);
                  }
                }}
              />
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="border rounded-md rounded-t-none bg-white p-4 grid gap-x-4 gap-y-7">
      {checkboxGroup("고용형태", ["정규직", "계약직"], "고용형태")}
      {checkboxGroup("경력여부", ["경력무관", "경력"], "경력여부")}
      {checkboxGroup("학력", ["학력무관", "고졸", "대졸이상"], "학력")}

      <div className="grid grid-cols-[4rem_1fr] items-start gap-x-3">
        <span className="w-16 font-bold">근무요일</span>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-x-2 gap-y-2">
            {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-4 py-2 border rounded ${
                  Array.isArray(selectedDays) && selectedDays.includes(day)
                    ? "bg-primary text-white"
                    : "bg-white text-black"
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
              onChange={() => {
                setDayNegotiable(!dayNegotiable);
                if (!dayNegotiable) {
                  addSelectedFilter("요일 협의");
                } else {
                  removeSelectedFilter("요일 협의");
                }
              }}
            />
            요일 협의
          </label>
        </div>
      </div>
    </div>
  );
}
