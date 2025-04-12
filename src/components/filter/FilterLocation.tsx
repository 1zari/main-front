"use client";

import { useState } from "react";

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

  const toggleDistrict = (district: string) => {
    setCheckedDistricts((prev) => {
      const isSelected = prev.includes(district);

      // Handle '전체' selection for the current region
      if (district.endsWith("전체")) {
        return isSelected ? prev.filter((d) => d !== district) : [district];
      }

      // Get the current region's districts
      const currentRegionDistricts = REGIONS[selectedRegion] || [];

      // If selecting a specific district while '전체' is already selected
      if (currentRegionDistricts.includes(district) && prev.includes(`${selectedRegion} 전체`)) {
        return [...prev.filter((d) => d !== `${selectedRegion} 전체`), district];
      }

      const updated = isSelected ? prev.filter((d) => d !== district) : [...prev, district];

      // If after update, any district in the current region is selected, remove '전체'
      if (currentRegionDistricts.includes(district)) {
        return updated.filter((d) => d !== `${selectedRegion} 전체`);
      }

      return updated;
    });
  };

  return (
    <div className="flex border rounded-md overflow-hidden">
      {/* 지역 목록 */}
      <div className="w-32  border-r overflow-y-auto p-2 scroll-auto">
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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-3 p-4 w-full h-full overflow-y-auto">
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
