"use client";

import { useSelectedFilterStore } from "@/stores/useJobFilterStore";
import { useEffect, useState } from "react";

const REGIONS = {
  서울: [
    "서울 전체",
    "강남구",
    "서초구",
    "광진구",
    "강동구",
    "강서구",
    "영등포구",
    "마포구",
    "용산구",
    "종로구",
    "중구",
    "성동구",
    "동대문구",
    "성북구",
    "강북구",
    "도봉구",
    "노원구",
    "은평구",
    "서대문구",
    "양천구",
    "금천구",
    "관악구",
    "동작구",
    "송파구",
  ],
  경기: [
    "경기 전체",
    "수원시",
    "고양시",
    "용인시",
    "성남시",
    "화성시",
    "안산시",
    "부천시",
    "남양주시",
    "안양시",
    "평택시",
    "파주시",
    "김포시",
    "광명시",
  ],
  부산: [
    "부산 전체",
    "해운대구",
    "연제구",
    "부산진구",
    "동래구",
    "남구",
    "사하구",
    "금정구",
    "동구",
    "서구",
  ],
  인천: [],
  대구: [],
  대전: [],
  세종: [],
  경북: [],
  충북: [],
  aa: [],
  bb: [],
  cc: [],
  dd: [],
};

export default function FilterLocation() {
  const [selectedRegion, setSelectedRegion] = useState("서울");
  const [checkedDistricts, setCheckedDistricts] = useState<string[]>([]);
  const { selectedFilters, locationChecked, setLocationChecked } = useSelectedFilterStore();

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
    <div className="flex border rounded-md rounded-t-none bg-white overflow-hidden">
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
  );
}
