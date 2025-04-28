"use client";

import BackButton from "@/features/resume/components/common/BackButton";
import RecruitForm from "../../../features/recruit/components/Form";

interface RecruitEditPageProps {
  params: { id: string };
}

const RecruitEditPage = ({ params }: RecruitEditPageProps) => {
  const jobPostingId = params.id;

  if (!jobPostingId) return <p>잘못된 접근입니다.</p>;

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto">
      <BackButton />
      <h1 className="text-2xl font-bold text-[#0F8C3B] mb-6">채용공고 수정</h1>
      <RecruitForm mode="edit" jobPostingId={jobPostingId} />
    </div>
  );
};

export default RecruitEditPage;
