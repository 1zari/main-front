"use client";
import { useParams } from "next/navigation";
import ResumeForm from "@/features/resume/components/ResumeForm";
import { resumeMockList } from "@/features/resume/mock/resumeMock";
import { ResumeFormData } from "@/features/resume/validation/resumeSchema";

const ResumeEditPage = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  console.log("resumeId:", resumeId);

  if (!resumeId) {
    return (
      <div className="py-8 text-center text-red-500">잘못된 접근입니다. (이력서 ID가 없습니다)</div>
    );
  }

  const targetResume = resumeMockList.find((r) => r.id === resumeId);
  console.log("targetResume:", targetResume);

  if (!targetResume) {
    return (
      <div className="py-8 text-center text-red-500">
        존재하지 않는 이력서입니다. (ID: {resumeId})
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-1">
      <div className="bg-white rounded-lg shadow-md px-10 py-[80px] w-full max-w-[1000px]">
        <h1 className="text-3xl font-bold mb-10 text-center text-primary">이력서 수정하기</h1>
        <ResumeForm mode="edit" defaultValues={targetResume as ResumeFormData} />
      </div>
    </div>
  );
};

export default ResumeEditPage;
