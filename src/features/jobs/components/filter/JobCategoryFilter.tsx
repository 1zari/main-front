"use client";

import { useState } from "react";

import { JOB_CATEGORIES } from "@/constants/jobCategories";
import { useSelectedFilterStore } from "@/features/jobs/stores/job-filters/useSelectedFiltersStore";
import { FaCaretUp } from "react-icons/fa";

export default function JobCategoryFilter({ setShowJobs, showJobs }) {
  const { checkedJobs, setCheckedJobs, addSelectedFilter, removeSelectedFilter } =
    useSelectedFilterStore();
  const [selectedCategory, setSelectedCategory] = useState("외식·음료");

  const toggleCheck = (item: string) => {
    const isSelected = checkedJobs.includes(item);

    if (item.includes("전체")) {
      const subItems = JOB_CATEGORIES[selectedCategory] || [];

      if (isSelected) {
        setCheckedJobs([]);
        removeSelectedFilter(item);
      } else {
        setCheckedJobs([item]);

        // Remove all subItems from chips
        subItems.forEach((sub) => {
          removeSelectedFilter(sub);
        });

        // Add the '전체' item to chips
        addSelectedFilter(item);
      }

      return;
    }

    const updated = isSelected
      ? checkedJobs.filter((v) => v !== item)
      : [...checkedJobs.filter((v) => !v.includes("전체")), item];

    setCheckedJobs(updated);
    useSelectedFilterStore.setState({ checkedJobs: updated });

    if (isSelected) {
      removeSelectedFilter(item);
    } else {
      addSelectedFilter(item);
      checkedJobs.forEach((job) => {
        if (job.includes("전체")) {
          removeSelectedFilter(job);
        }
      });
    }
  };

  return (
    <div>
      <div className="flex border border-b-0  bg-white overflow-hidden">
        {/* 대분류*/}
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

        {/* 중분류 */}
        <div className="grid grid-col md:grid-cols-2 max-h-80 gap-x-2 gap-y-3 p-4 w-full h-full overflow-y-auto">
          {(JOB_CATEGORIES[selectedCategory] || []).map((item) => (
            <label key={item} className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={checkedJobs.includes(item)}
                onChange={() => toggleCheck(item)}
                className="mt-1.5"
              />
              {item}
            </label>
          ))}
        </div>
      </div>
      <div className="border flex justify-center rounded-md rounded-t-none py-2">
        <button type="button" className="flex items-center " onClick={() => setShowJobs(!showJobs)}>
          닫기
          <span className="px-2">
            <FaCaretUp />
          </span>
        </button>
      </div>
    </div>
  );
}
