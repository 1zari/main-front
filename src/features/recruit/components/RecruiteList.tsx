"use client";

import { jobPostApi } from "@/api/job";
import { format, isBefore } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RecruiteList() {
  const [jobPosts, setJobPosts] = useState<any[]>([]);

  useEffect(() => {
    jobPostApi.getJobPostList().then((res) => {
      setJobPosts(res.data);
    });
  }, []);

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

      {jobPosts.length === 0 && (
        <div className="text-sm text-gray-500 min-h-100">아직 등록된 공고가 없습니다.</div>
      )}

      <ul className="space-y-4">
        {jobPosts.map((item) => (
          <li key={item.job_posting_id}>
            <Link href={`/recruit/${item.job_posting_id}`}>
              <div className="block p-4 border rounded-md shadow-sm hover:shadow-md transition bg-white">
                <div className="font-semibold text-gray-900 mb-2">{item.job_posting_title}</div>
                <div className="font-semibold text-gray-900 mb-2">{item.summary}</div>
                <div
                  className={`text-xs font-medium ${
                    isBefore(new Date(item.deadline), new Date()) ? "text-gray-400" : "text-red-600"
                  }`}
                >
                  {format(new Date(item.deadline), "yyyy.MM.dd")}{" "}
                  {isBefore(new Date(item.deadline), new Date()) ? "마감" : "진행중"}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
