"use client";

import ScrapBtn from "@/components/ScrapBtn";
import type { JobPostsListResponseDto } from "@/types/api/job";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function JobCard({ job }: { job: JobPostsListResponseDto["results"][number] }) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div onClick={() => router.push(`/jobs/${job.job_posting_id}`)} className="cursor-pointer">
      <div className="bg-white shadow-sm rounded-lg p-4 transition duration-200 hover:shadow-md hover:-translate-y-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {job.company_logo && (
              <img
                src={job.company_logo}
                alt="회사 로고"
                className="w-8 h-8 object-cover rounded-lg p-1"
              />
            )}
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
          <p className="text-black/70">
            {job.city} {job.district}
          </p>
          <p className="text-black/70">{job.deadline}</p>
        </div>
      </div>
    </div>
  );
}
