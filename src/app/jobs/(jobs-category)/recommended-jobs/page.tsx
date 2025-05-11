"use client";

import SelectedChips from "@/features/jobs/components/SelectedChips";
import { useFilterTabStore } from "@/features/jobs/components/filter/stores/useJobFilterTabsStore";
import { useEffect, useState } from "react";
import JobCard from "../../../../features/home/components/JobCard";
import JobFilter from "../../../../features/jobs/components/JobFilter";

export default function RecommendedJobsPage() {
  const setShowLocation = useFilterTabStore((state) => state.setShowLocation);
  const setShowJobs = useFilterTabStore((state) => state.setShowJobs);
  const setShowOtherConditions = useFilterTabStore((state) => state.setShowOtherConditions);

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const allJobs = Array.from({ length: 1000 }).map((_, i) => ({
    job_posting_id: `job-${i + 1}`,
    title: `Job ${i + 1}`,
  }));

  const paginatedJobs = allJobs.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(allJobs.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setShowLocation(false);
    setShowJobs(false);
    setShowOtherConditions(false);
  }, []);
  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-6">
        <JobFilter />
        <SelectedChips />
      </div>
      <div className="bg-gray-z-light py-6">
        <section className="w-full max-w-7xl mx-auto my-8 px-4 ">
          <div className="flex justify-between items-center py-6 mb-4">
            <h2 className="text-2xl font-semibold">추천 공고</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {paginatedJobs.map((job) => (
              <JobCard key={job.job_posting_id} job={job} />
            ))}
          </div>
          <div className="flex justify-center gap-3 mt-8">
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
              이전
            </button>
            <span>
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              다음
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
