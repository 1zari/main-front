"use client";

import ScrapBtn from "@/components/ScrapBtn";
import type { SearchJobResult } from "@/types/api/job";
import { useRouter } from "next/navigation";
interface Job {
  job_posting_id: string;
  company_name: string;
  address: string;
  job_posting_title: string;
}

export function JobCardSearched({ job }: { job: SearchJobResult }) {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/jobs/${job.job_posting_id}`)} className="cursor-pointer">
      <div className="bg-white shadow-sm rounded-lg p-4 transition duration-200 hover:shadow-md hover:-translate-y-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="text-black/70">{job.company_name}</p>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <ScrapBtn initialIsBookmarked={job.is_bookmarked} jobPostingId={job.job_posting_id} />
          </div>
        </div>
        <h3 className="text-2 font-semibold py-2">{job.job_posting_title}</h3>
        <div className="flex justify-between items-center mt-4">
          <p className="text-black/70">
            {job.city} {job.district}
          </p>
          <p className="text-black/70">{job.deadline}</p>
        </div>
      </div>
    </div>
  );
}

interface JobCardsSearchedProps {
  job: SearchJobResult;
}

export default function JobCardsSearched({ job }: JobCardsSearchedProps) {
  return (
    <>
      <JobCardSearched key={job.job_posting_id} job={job} />
    </>
  );
}
