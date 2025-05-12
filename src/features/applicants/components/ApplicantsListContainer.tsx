"use client";

import { applicantListApi } from "@/api/applicant";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ApplicantsListControlArea from "./ApplicantsListControlArea";

export default function ApplicantsListContainer() {
  const router = useRouter();
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("채용공고 전체");
  const { data } = useQuery({
    queryKey: ["applicantList"],
    queryFn: applicantListApi.getApplicant,
  });

  const applicants = data?.submission_list || [];
  const jobPostings = data?.job_posting_list || [];

  return (
    <>
      <ApplicantsListControlArea
        showUnreadOnly={showUnreadOnly}
        setShowUnreadOnly={setShowUnreadOnly}
        selectedJobTitle={selectedJobTitle}
        setSelectedJobTitle={setSelectedJobTitle}
        jobPostings={jobPostings}
      />
      <div></div>
      <p className="text-gray-500 mb-2">
        총 {""}
        <span className="text-primary">
          {
            applicants.filter(
              (applicant) =>
                (!showUnreadOnly || !applicant.is_read) &&
                (selectedJobTitle === "채용공고 전체" ||
                  jobPostings.find((j) => j.job_posting_id === applicant.job_posting_id)
                    ?.job_posting_title === selectedJobTitle),
            ).length
          }
        </span>
        건의 지원서
      </p>
      <section>
        <div className="border rounded-md divide-y">
          {applicants
            .filter(
              (applicant) =>
                (!showUnreadOnly || !applicant.is_read) &&
                (selectedJobTitle === "채용공고 전체" ||
                  jobPostings.find((j) => j.job_posting_id === applicant.job_posting_id)
                    ?.job_posting_title === selectedJobTitle),
            )
            .map((applicant) => (
              <div
                key={applicant.name}
                className="p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                onClick={() => router.push(`/applicants/${applicant.submission_id}`)}
              >
                <div>
                  <p className="font-medium">{applicant.name}</p>
                  <p className="">{applicant.resume_title}</p>
                  <p className="text-sm text-gray-500">{applicant.summary}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-sm text-gray-400">지원일</div>
                  <div className="text-sm text-gray-400">{applicant.created_at}</div>
                  <div
                    className={`text-sm ${applicant.is_read ? "text-gray-400" : "text-primary"}`}
                  >
                    {applicant.is_read ? "읽음" : "안읽음"}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
