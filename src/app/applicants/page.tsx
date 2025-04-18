"use client";
import { Heading } from "@/components/ui/Heading";
import ApplicantsListContainer from "@/features/applicants/components/ApplicantsListContainer";
import ApplicantsListControlArea from "@/features/applicants/components/ApplicantsListControlArea";
import WelcomeBanner from "@/features/home/components/WelcomeBanner";
import { useState } from "react";

export default function applicants() {
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const applicants = [
    {
      id: 1,
      name: "홍길동",
      position: "디자인 인턴",
      date: "2025-04-10",
      coverLetter: "저는 디자인에 진심인 사람입니다...",
    },
    {
      id: 2,
      name: "김개발",
      position: "프론트엔드 개발자",
      date: "2025-04-08",
      coverLetter: "React와 Next.js를 다룰 수 있습니다...",
    },
  ];

  return (
    <>
      <WelcomeBanner />
      <section className="w-full max-w-7xl mx-auto my-8 px-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <ApplicantsListContainer />
        </div>
      </section>
      <div></div>
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <Heading sizeOffset={3} className="font-bold">
            지원자 조회
          </Heading>
        </div>
        <ApplicantsListControlArea />

        <div className="border rounded-md divide-y">
          {applicants.map((applicant) => (
            <div
              key={applicant.id}
              className="p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
              onClick={() => setSelectedApplicant(applicant)}
            >
              <div>
                <p className="font-medium">{applicant.name}</p>
                <p className="text-sm text-gray-500">{applicant.position}</p>
              </div>
              <div className="text-sm text-gray-400">{applicant.date}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
