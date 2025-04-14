"use client";

import { useSelectedFilterStore } from "@/stores/useJobFilterStore";
import { useState } from "react";

const JOB_CATEGORIES = {
  "돌봄 서비스직(간병·육아)": ["전체", "간병인", "등하교도우미"],
  "음식 서비스직": ["전체", "주방장 및 조리사", "식당 서비스원"],
  "운전·운송직": [],
  "예술·디자인·방송직": [],
  "경호·경비직": [],
  "영업·판매직": [],
  "청소 및 기타 개인서비스직": [],
  사무직: [],
  기타: [],
  "IT·인터넷·게임": [],
};

export default function FilterJobs() {
  const { checkedJobs, setCheckedJobs, addSelectedFilter, removeSelectedFilter } = useSelectedFilterStore();
  const [selectedCategory, setSelectedCategory] = useState("돌봄 서비스직(간병·육아)");

  const toggleCheck = (item: string) => {
    const isSelected = checkedJobs.includes(item);

    if (item === "전체") {
      const subItems = JOB_CATEGORIES[selectedCategory] || [];

      if (isSelected) {
        setCheckedJobs([]);
        removeSelectedFilter("전체");
      } else {
        setCheckedJobs(["전체"]);
        addSelectedFilter("전체");

        subItems.forEach((sub) => {
          if (sub !== "전체") {
            removeSelectedFilter(sub);
          }
        });
      }

      return;
    }

    const updated = isSelected
      ? checkedJobs.filter((v) => v !== item)
      : [...checkedJobs.filter((v) => v !== "전체"), item]; // "전체" 제거

    setCheckedJobs(updated);

    if (isSelected) {
      removeSelectedFilter(item);
    } else {
      addSelectedFilter(item);
      removeSelectedFilter("전체"); // 전체 chip도 제거
    }
  };

  return (
    <div className="flex border rounded-md rounded-t-none bg-white overflow-hidden">
      {/* Left: Job categories */}
      <div className="w-70 max-h-80 border-r overflow-y-auto p-2 scroll-auto">
        {Object.keys(JOB_CATEGORIES).map((category) => (
          <div
            key={category}
            className={`p-2 cursor-pointer ${
              selectedCategory === category ? "text-green-700 font-bold" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category} &rsaquo;
          </div>
        ))}
      </div>

      {/* Right: Subcategories */}
      <div className="grid grid-col gap-x-2 gap-y-3 p-4 w-full h-full overflow-y-auto">
        {(JOB_CATEGORIES[selectedCategory] || []).map((item) => (
          <label key={item} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checkedJobs.includes(item)}
              onChange={() => toggleCheck(item)}
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
