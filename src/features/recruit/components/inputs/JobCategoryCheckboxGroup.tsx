import { JOB_CATEGORIES } from "@/constants/jobCategories";
import { useState } from "react";
import { FaCaretUp } from "react-icons/fa";

type JobCategoryCheckboxGroupProps = {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
  checkedJobs: string[];
  setCheckedJobs: (jobs: string[]) => void;
};

export function JobCategoryCheckboxGroup({
  setIsOpen,
  isOpen,
  selectedFilters,
  setSelectedFilters,
  checkedJobs,
  setCheckedJobs,
}: JobCategoryCheckboxGroupProps) {
  const [selectedCategory, setSelectedCategory] = useState("외식·음료");

  const addSelectedFilter = (item: string) => {
    setSelectedFilters([...selectedFilters, item]);
  };

  const removeSelectedFilter = (item: string) => {
    setSelectedFilters(selectedFilters.filter((filter) => filter !== item));
  };

  const toggleCheck = (item: string) => {
    const isSelected = checkedJobs.includes(item);

    if (item.includes("전체")) {
      const subItems = JOB_CATEGORIES[selectedCategory] || [];

      if (isSelected) {
        setCheckedJobs([]);
        removeSelectedFilter(item);
      } else {
        setCheckedJobs([item]);
        subItems.forEach((sub) => {
          removeSelectedFilter(sub);
        });
        addSelectedFilter(item);
      }

      return;
    }

    const updated = isSelected
      ? checkedJobs.filter((v) => v !== item)
      : [...checkedJobs.filter((v) => !v.includes("전체")), item];

    setCheckedJobs(updated);

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
    <>
      <div>
        <div className="flex border border-b-0 bg-white overflow-hidden">
          {/* 대분류 */}
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
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checkedJobs.includes(item)}
                  onChange={() => toggleCheck(item)}
                  className="w-6 h-6 accent-primary"
                />
                {item}
              </label>
            ))}
          </div>
        </div>
        <div className="border flex justify-center rounded-md rounded-t-none py-2">
          <button
            type="button"
            className="flex items-center text-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            닫기
            <span className="px-2">
              <FaCaretUp />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
