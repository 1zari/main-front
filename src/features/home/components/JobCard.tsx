"use client";

import { jobPostApi } from "@/api/job";
import ScrapBtn from "@/components/ScrapBtn";
import type { JobPostsListResponseDto } from "@/types/api/job";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function JobCard({ job }: { job: JobPostsListResponseDto["data"][number] }) {
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
          <p className="text-black/70">{job.company_address.split(" ").slice(0, 2).join(" ")}</p>
          <p className="text-black/70">{job.deadline}</p>
        </div>
      </div>
    </div>
  );
}

export default function JobCards() {
  const { data } = useQuery({
    queryKey: ["jobPostList"],
    queryFn: jobPostApi.getJobPostList,
  });

  const jobs = data?.data ?? [];

  return (
    <>
      {jobs.map((job) => (
        <JobCard key={job.job_posting_id} job={job} />
      ))}
    </>
  );
}
