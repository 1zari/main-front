"use client";

import { REGIONS } from "@/constants/regions";
import { useSelectedFilterStore } from "@/features/jobs/stores/job-filters/useSelectedFiltersStore";

import { useEffect, useState } from "react";
import { FaCaretUp } from "react-icons/fa";

export default function JobLocationFilter({ setShowLocation, showLocation }) {
  const [selectedRegion, setSelectedRegion] = useState("서울");
  const [checkedDistricts, setCheckedDistricts] = useState<string[]>([]);

  const selectedFilters = useSelectedFilterStore((state) => state.selectedFilters);
  const locationChecked = useSelectedFilterStore((state) => state.locationChecked);
  const setLocationChecked = useSelectedFilterStore((state) => state.setLocationChecked);

  useEffect(() => {
    setCheckedDistricts(locationChecked);
  }, [locationChecked]);

  const toggleDistrict = (district: string) => {
    const isSelected = checkedDistricts.includes(district);
    const currentRegionDistricts = REGIONS[selectedRegion] || [];

    let updated: string[] = [];

    // Handle '전체' 선택
    if (district.endsWith("전체")) {
      if (isSelected) {
        updated = checkedDistricts.filter((d) => d !== district);
        const filters = selectedFilters.filter((f) => !f.startsWith(`${selectedRegion}:`));
        setCheckedDistricts(updated);
        setLocationChecked(updated);
        useSelectedFilterStore.setState({
          selectedFilters: filters,
        });
        return;
      } else {
        if (!checkedDistricts.includes(district)) {
          updated = [district];

          // remove all individual districts from selectedFilters
          currentRegionDistricts.forEach((d) => {
            if (d !== district) {
              updated = updated.filter((item) => item !== d);
            }
          });

          const label = `${selectedRegion}: ${district}`;
          const filters = selectedFilters.filter((f) => !f.startsWith(`${selectedRegion}:`));
          setCheckedDistricts(updated);
          setLocationChecked(updated);
          useSelectedFilterStore.setState({
            selectedFilters: [...filters, label],
          });
          return;
        } else {
          updated = [...checkedDistricts];
        }
      }
      setCheckedDistricts(updated);
      setLocationChecked(updated);
      return;
    }
    // '전체'가 선택된 상태에서 개별 선택 시 전체 제거
    else if (checkedDistricts.includes(`${selectedRegion} 전체`)) {
      const full = `${selectedRegion} 전체`;
      updated = [...checkedDistricts.filter((d) => d !== full), district];
    } else {
      updated = isSelected
        ? checkedDistricts.filter((d) => d !== district)
        : [...checkedDistricts, district];
    }

    // '전체' 제거 로직
    if (currentRegionDistricts.includes(district)) {
      updated = updated.filter((d) => d !== `${selectedRegion} 전체`);
    }

    // store 업데이트
    const regionDistricts = updated.filter((d) => REGIONS[selectedRegion].includes(d));
    const label = `${selectedRegion}: ${regionDistricts.join(", ")}`;
    const filters = selectedFilters.filter((f) => !f.startsWith(`${selectedRegion}:`));
    setLocationChecked(updated);
    setCheckedDistricts(updated);
    useSelectedFilterStore.setState({
      selectedFilters: regionDistricts.length > 0 ? [...filters, label] : filters,
    });
  };

  return (
    <div>
      <div className="flex border border-b-0  bg-white overflow-hidden">
        {/* 지역 목록 */}
        <div className="w-32 max-h-80 border-r overflow-y-auto p-2 scroll-auto">
          {Object.keys(REGIONS).map((region) => (
            <div
              key={region}
              className={`p-2 cursor-pointer ${
                selectedRegion === region ? "text-green-700 font-bold" : ""
              }`}
              onClick={() => setSelectedRegion(region)}
            >
              {region} &rsaquo;
            </div>
          ))}
        </div>

        {/* 구/군 체크박스 목록 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-3 p-4 w-full max-h-80 h-full overflow-y-auto">
          {(REGIONS[selectedRegion] || []).map((district) => (
            <label key={district} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checkedDistricts.includes(district)}
                onChange={() => toggleDistrict(district)}
              />
              {district}
            </label>
          ))}
        </div>
      </div>
      <div className="border flex justify-center rounded-md rounded-t-none py-2">
        <button className="flex items-center " onClick={() => setShowLocation(!showLocation)}>
          닫기
          <span className="px-2">
            <FaCaretUp />
          </span>
        </button>
      </div>
    </div>
  );
}
