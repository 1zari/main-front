"use client";

import ResumeForm from "@/features/resume/components/Form";
import ResumeTitle from "@/features/resume/components/ResumeTitle";
import { useState } from "react";

interface ResumeEditPageProps {
  params: { id: string };
}

const ResumeEditPage = ({ params }: ResumeEditPageProps) => {
  const jobPostingId = params.id;

  if (!jobPostingId) return <p>잘못된 접근입니다.</p>;

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto">
      <h1 className="text-2xl font-bold text-[#0F8C3B] mb-6">이력서 수정하기</h1>
      <ResumeForm mode="edit" jobPostingId={jobPostingId} />
    </div>
  );
};

export default ResumeEditPage;
