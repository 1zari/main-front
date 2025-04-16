"use client";

import { Heading } from "@/components/ui/Heading";
import { FaCaretDown } from "react-icons/fa";

import { useFilterTabStore } from "@/features/jobs/stores/job-filters/useJobFilterTabsStore";
import FilterJobs from "./filter/JobCategoryFilter";
import FilterOtherConditions from "./filter/JobConditionsFilter";
import FilterLocation from "./filter/JobLocationFilter";

export default function JobFilter() {
  const {
    showLocation,
    showJobs,
    showOtherConditions,
    setShowLocation,
    setShowJobs,
    setShowOtherConditions,
  } = useFilterTabStore();

  const navBtnClassName =
    "w-full border border-gray-300 px-2 py-3 rounded-md flex justify-center items-center gap-2 text-gray-500";

  const navBtnSelectedClassName = "border-primary font-bold text-primary";

  return (
    <>
      <section className="w-full max-w-7xl mx-auto my-8">
        <div className="flex flex-col mb-4">
          <Heading sizeOffset={3} className="font-bold py-6 break-keep">
            <span className="text-primary">전체 지역, 모든 직종</span>에 대한 채용공고에요!
            <br />
            검색 조건을 변경하고 싶으신가요?
          </Heading>
          <div className="max-w-2xl flex gap-2 mt-4 justify-between items-center mb-3">
            <button
              className={`${navBtnClassName} ${showLocation ? navBtnSelectedClassName : ""}`}
              onClick={() => setShowLocation(!showLocation)}
            >
              지역
              <span
                className={`transition-transform duration-300 ${showLocation ? "rotate-180" : ""}`}
              >
                <FaCaretDown />
              </span>
            </button>
            <button
              className={`${navBtnClassName} ${showJobs ? navBtnSelectedClassName : ""}`}
              onClick={() => setShowJobs(!showJobs)}
            >
              직종
              <span className={`transition-transform duration-300 ${showJobs ? "rotate-180" : ""}`}>
                <FaCaretDown />
              </span>
            </button>
            <button
              className={`${navBtnClassName} ${showOtherConditions ? navBtnSelectedClassName : ""}`}
              onClick={() => setShowOtherConditions(!showOtherConditions)}
            >
              상세
              <span
                className={`transition-transform duration-300 ${showOtherConditions ? "rotate-180" : ""}`}
              >
                <FaCaretDown />
              </span>
            </button>
            <button className="w-full bg-primary text-white px-2 py-3 rounded-md flex justify-center items-center gap-2">
              검색하기
            </button>
          </div>
          {showLocation && <FilterLocation />}
          {showJobs && <FilterJobs />}
          {showOtherConditions && <FilterOtherConditions />}
        </div>
      </section>
    </>
  );
}
