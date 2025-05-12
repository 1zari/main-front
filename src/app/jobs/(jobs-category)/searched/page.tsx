"use client";

import { JobCardSearched } from "@/features/home/components/JobCardSearched";
import SelectedChips from "@/features/jobs/components/SelectedChips";
import { useFilterTabStore } from "@/features/jobs/components/filter/stores/useJobFilterTabsStore";
import { useSearchStore } from "@/store/useSearchStore";
import useSearchedListStore from "@/store/useSearchedListStore";
import { SearchJobResult } from "@/types/api/job";
import { useEffect, useState } from "react";
import JobFilter from "../../../../features/jobs/components/JobFilter";

export default function SearchedJobsListPage() {
  const setShowLocation = useFilterTabStore((state) => state.setShowLocation);
  const setShowJobs = useFilterTabStore((state) => state.setShowJobs);
  const setShowOtherConditions = useFilterTabStore((state) => state.setShowOtherConditions);

  useEffect(() => {
    setShowLocation(false);
    setShowJobs(false);
    setShowOtherConditions(false);
  }, []);

  const { searchedList } = useSearchedListStore();
  console.log("searchedList", searchedList);
  const [jobs, setJobs] = useState<SearchJobResult[]>([]);

  useEffect(() => {
    if (Array.isArray(searchedList)) {
      setJobs(searchedList);
    } else {
      setJobs([]);
    }
  }, [searchedList]);

  const keyword = useSearchStore((state) => state.keyword);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-6">
        <JobFilter />
        <SelectedChips />
      </div>
      <div className="bg-gray-z-light py-6">
        <section className="w-full max-w-7xl mx-auto my-8 px-4 ">
          <div className="flex justify-between items-center py-6 mb-4">
            <h2 className="text-2xl font-semibold">검색 된 채용공고</h2>
            <span>{}건</span>
            <span>검색키워드: {keyword || "없음"}</span>
          </div>
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {jobs.map((job) => (
                <JobCardSearched key={job.job_posting_id} job={job} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">검색된 채용공고가 없습니다.</p>
          )}
        </section>
      </div>
    </>
  );
}
