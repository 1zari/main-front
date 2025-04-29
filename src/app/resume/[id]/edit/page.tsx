"use client";
import ResumeForm from "@/features/resume/components/Form";
import BackButton from "@/features/resume/components/common/BackButton";
import { useParams } from "next/navigation";

const ResumeEditPage = () => {
  const params = useParams<{ id: string }>();
  const resumeId = params.id;

  if (!resumeId) {
    return <p className="py-4 text-center text-red-500">잘못된 접근입니다.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <BackButton />

      <h1 className="text-2xl font-bold text-primary mb-6">이력서 수정하기</h1>

      <ResumeForm mode="edit" resumeId={resumeId} />
    </div>
  );
};

export default ResumeEditPage;
