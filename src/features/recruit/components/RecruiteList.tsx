"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, isBefore } from "date-fns";
import Link from "next/link";
import { useState } from "react";

interface JobPost {
  job_posting_id: string;
  job_posting_title: string;
  summary: string;
  deadline: string;
}
interface JobPosting {
  job_posting_id: string;
  job_posting_title: string;
  summary: string;
  deadline: string;
  // add more fields if necessary
}
interface JobResponse {
  data: JobPosting[];
  message: string;
  page: number;
  total_pages: number;
  total_results: number;
}

export default function RecruiteList() {
  // const [jobPosts, setJobPosts] = useState<JobPost[]>([]);

  // useEffect(() => {
  //   jobPostApi.getJobPostList().then((res) => {
  //     setJobPosts(res.data);
  //   });
  // }, []);

  const fetchJobs = async (page: number): Promise<JobResponse> => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/job-postings?page=${page}`,
    );
    return data;
  };

  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["byfield-jobs", page],
    queryFn: () => fetchJobs(page),
    // keepPreviousData: true,
    staleTime: 1000 * 60, // optional: 데이터 새로고침 방지
  });

  const paginatedJobs = data?.data || [];
  const totalPages = data?.total_pages || 1;

  return (
    <section className="p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h2 className="text-xl font-semibold">채용 공고</h2>
        <Link
          href="/recruit/create"
          className="px-4 py-2 text-sm border rounded-md text-primary border-primary hover:bg-primary hover:text-white transition"
        >
          공고 등록하기
        </Link>
      </div>

      {paginatedJobs.length === 0 && (
        <div className="text-sm text-gray-500 min-h-100">아직 등록된 공고가 없습니다.</div>
      )}

      <ul className="space-y-4">
        {paginatedJobs.map((job) => (
          <li key={job.job_posting_id} job={job}>
            <Link href={`/recruit/${job.job_posting_id}`}>
              <div className="block p-4 border rounded-md shadow-sm hover:shadow-md transition bg-white">
                <div className="font-semibold text-gray-900 mb-2">{job.job_posting_title}</div>
                <div className="font-semibold text-gray-900 mb-2">{job.summary}</div>
                <div
                  className={`text-xs font-medium ${
                    isBefore(new Date(job.deadline), new Date()) ? "text-gray-400" : "text-red-600"
                  }`}
                >
                  {format(new Date(job.deadline), "yyyy.MM.dd")}{" "}
                  {isBefore(new Date(job.deadline), new Date()) ? "마감" : "진행중"}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="px-3 py-2 text-sm rounded border border-gray-300 disabled:opacity-50"
        >
          처음
        </button>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-2 text-sm rounded border border-gray-300 disabled:opacity-50"
        >
          ◀ 이전
        </button>
        <span className="text-sm font-medium text-gray-700">
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-2 text-sm rounded border border-gray-300 disabled:opacity-50"
        >
          다음 ▶
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          className="px-3 py-2 text-sm rounded border border-gray-300 disabled:opacity-50"
        >
          마지막
        </button>
      </div>
    </section>
  );
}
