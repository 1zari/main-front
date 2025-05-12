"use client";

import { jobPostApi } from "@/api/job";
import ScrapBtn from "@/components/ScrapBtn";
import type { JobPostsListResponseDto } from "@/types/api/job";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function JobCard({ job }: { job: JobPostsListResponseDto["data"][number] }) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div onClick={() => router.push(`/jobs/${job.job_posting_id}`)} className="cursor-pointer">
      <div className="bg-white shadow-sm rounded-lg p-4 transition duration-200 hover:shadow-md hover:-translate-y-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="text-black/70">{job.company_name}</p>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            {session?.user?.join_type === "normal" && (
              <ScrapBtn initialIsBookmarked={job.is_bookmarked} jobPostingId={job.job_posting_id} />
            )}
          </div>
        </div>
        <h3 className="text-2 font-semibold py-2">{job.job_posting_title}</h3>
        <div className="flex justify-between items-center mt-4">
          <p className="text-black/70">{job.company_address.split(" ").slice(0, 2).join(" ")}</p>
          <p className="text-black/70">{job.deadline}</p>
        </div>
      </div>
    </div>
  );
}

export default function JobCards() {
  const [page, setPage] = useState(1);
  const { data } = useQuery({
    queryKey: ["jobPostList", page],
    queryFn: () => jobPostApi.getJobPostList(page),
    staleTime: 1000 * 60, // 1분 동안 캐시 유지
  });

  const jobs = data?.data ?? [];

  return (
    <>
      {jobs.map((job) => (
        <JobCard key={job.job_posting_id} job={job} />
      ))}
      <div className="flex justify-center gap-4 mt-6">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          이전
        </button>
        <span>페이지 {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>다음</button>
      </div>
    </>
  );
}
