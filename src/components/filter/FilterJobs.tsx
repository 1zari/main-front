"use client";

import { useState } from "react";

const JOB_CATEGORIES = {
  "돌봄 서비스직(간병·육아)": ["전체", "주방장 및 조리사", "식당 서비스원"],
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
  const [selectedCategory, setSelectedCategory] = useState("돌봄 서비스직(간병·육아)");
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleCheck = (item: string) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item],
    );
  };

  return (
    <div className="flex border rounded-md overflow-hidden">
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
              checked={checkedItems.includes(item)}
              onChange={() => toggleCheck(item)}
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
