"use client";

import { REGIONS } from "@/constants/regions";
import { resetFilters, useSelectedFilterStore } from "@/stores/useJobFilterStore";
import { IoMdRefresh } from "react-icons/io";

export default function SelectedChips() {
  const {
    selectedFilters,
    removeSelectedFilter,
    locationChecked,
    setLocationChecked,
    addSelectedFilter,
  } = useSelectedFilterStore();

  if (selectedFilters.length === 0) return null;

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
                  const updated = options.filter((o) => o !== option);
                  const regionDistricts = updated.filter((d) =>
                    REGIONS[selectedRegion].includes(d),
                  );
                  const label = `${groupKey}: ${regionDistricts.join(", ")}`;
                  const filters = useSelectedFilterStore
                    .getState()
                    .selectedFilters.filter((f) => !f.startsWith(`${groupKey}:`));
                  useSelectedFilterStore.setState({
                    selectedFilters: regionDistricts.length > 0 ? [...filters, label] : filters,
                  });
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
    <>
      <div className="flex flex-wrap gap-2 my-4">
        {selectedFilters.map((filter, index) => (
          <div
            key={`${filter}-${index}`}
            className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700"
          >
            <span>{filter}</span>
            <button
              onClick={() => {
                removeSelectedFilter(filter);

                // 지역 필터 제거 처리
                if (filter.includes(":")) {
                  const [region] = filter.split(":");
                  const rest = useSelectedFilterStore
                    .getState()
                    .selectedFilters.filter((f) => !f.startsWith(`${region}:`));
                  const updatedLocationChecked = useSelectedFilterStore
                    .getState()
                    .locationChecked.filter((d) => !filter.includes(d));
                  useSelectedFilterStore.setState({
                    locationChecked: updatedLocationChecked,
                    selectedFilters: rest,
                  });
                }

                // 근무요일 그룹 제거 처리
                if (filter.startsWith("근무요일:")) {
                  useSelectedFilterStore.setState({
                    selectedDays: [],
                  });
                }

                const [group, label] = filter.split(":");
                if (group === "학력" || group === "경력여부" || group === "고용형태") {
                  removeSelectedFilter(`${group}:${label}`);
                }

                if (filter === "요일 협의") {
                  useSelectedFilterStore.setState({
                    dayNegotiable: false,
                  });
                }
              }}
              className="ml-2 text-gray-500 hover:text-red-500"
              aria-label={`Remove ${filter}`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4 mb-4">
        <button
          type="button"
          onClick={() => resetFilters()}
          className="group flex justify-center items-center gap-2 border px-4 py-2 rounded-md text-sm text-gray-800 cursor-pointer"
        >
          <span className="group-hover:rotate-180 transform transition-transform duration-300">
            <IoMdRefresh />
          </span>
          초기화
        </button>
      </div>
    </>
  );
}
