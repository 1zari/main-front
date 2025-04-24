"use client";

import { Applicants } from "@/features/applicants/data/mockApplicants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ApplicantsListControlArea from "./ApplicantsListControlArea";

export default function ApplicantsListContainer() {
  const router = useRouter();
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState("채용공고 전체");
  const applicants = Applicants;

  return (
    <>
      <ApplicantsListControlArea
        showUnreadOnly={showUnreadOnly}
        setShowUnreadOnly={setShowUnreadOnly}
        selectedJobTitle={selectedJobTitle}
        setSelectedJobTitle={setSelectedJobTitle}
      />
      <div></div>
      <p className="text-gray-500 mb-2">
        총 {""}
        <span className="text-primary">
          {
            applicants.filter(
              (applicant) =>
                (!showUnreadOnly || !applicant.isRead) &&
                (selectedJobTitle === "채용공고 전체" || applicant.jobTitle === selectedJobTitle),
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
                (!showUnreadOnly || !applicant.isRead) &&
                (selectedJobTitle === "채용공고 전체" || applicant.jobTitle === selectedJobTitle),
            )
            .map((applicant) => (
              <div
                key={applicant.id}
                className="p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                onClick={() => router.push(`/applicants/${applicant.id}`)}
              >
                <div>
                  <p className="font-medium">{applicant.name}</p>
                  <p className="">{applicant.coverLetter}</p>
                  <p className="text-sm text-gray-500">{applicant.jobTitle}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-sm text-gray-400">지원일</div>
                  <div className="text-sm text-gray-400">{applicant.date}</div>
                  <div className={`text-sm ${applicant.isRead ? "text-gray-400" : "text-primary"}`}>
                    {applicant.isRead ? "읽음" : "안읽음"}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
