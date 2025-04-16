"use client";

import { useSearchParams } from "next/navigation";
import RecruitForm from "../../../features/recruit/components/Form";

const RecruitEditPage = () => {
  const searchParams = useSearchParams();
  const jobPostingId = searchParams.get("id");

  if (!jobPostingId) return <p>잘못된 접근입니다.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#0F8C3B] mb-6">채용공고 수정</h1>
      <RecruitForm mode="edit" jobPostingId={jobPostingId} />
    </div>
  );
};

export default RecruitEditPage;