"use client";
import { useParams } from "next/navigation";
import ResumeForm from "@/features/resume/components/ResumeForm";

const ResumeEditPage = () => {
  const { id: resumeId } = useParams<{ id: string }>();

  if (!resumeId) {
    return (
      <div className="py-8 text-center text-red-500">잘못된 접근입니다. (이력서 ID가 없습니다)</div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-1">
      <div className="bg-white rounded-lg shadow-md px-10 py-[80px] w-full max-w-[1000px]">
        <h1 className="text-3xl font-bold mb-10 text-center text-[#285634]">이력서 수정하기</h1>
        <ResumeForm mode="edit" resumeId={resumeId} />
      </div>
    </div>
  );
};

export default ResumeEditPage;
