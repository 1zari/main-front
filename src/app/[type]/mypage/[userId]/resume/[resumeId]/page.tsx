"use client";
import { useParams } from "next/navigation";
import { resumeMockList } from "@/features/resume/mock/resumeMock";
import ResumeContainer from "@/features/resume/components/ResumeContainer";
import { ResumeFormData } from "@/features/resume/validation/resumeSchema";
import ResumeActionButtons from "@/features/resume/components/ResumeActionButton";

const getMockResumeById = (resumeId: string): ResumeFormData | undefined => {
  return resumeMockList.find((r) => r.id === resumeId);
};

const ResumeViewPage = () => {
  const { resumeId } = useParams<{ resumeId: string }>();

  const resume = resumeId ? getMockResumeById(resumeId) : undefined;

  if (!resumeId || !resume) {
    return (
      <div className="py-8 text-center text-red-500">
        {resumeId ? `존재하지 않는 이력서입니다. (ID: ${resumeId})` : "잘못된 접근입니다."}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-1">
      <div className="bg-white rounded-lg shadow-md px-10 py-[80px] w-full max-w-[1000px]">
        <h1 className="text-3xl font-bold mb-10 text-center text-primary">{resume.title}</h1>
        <ResumeContainer resume={resume} />
        <ResumeActionButtons resumeId={resumeId} />
      </div>
    </div>
  );
};

export default ResumeViewPage;
