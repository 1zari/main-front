import React from "react";
import { useRouter } from "next/navigation";
import { Plus, ChevronRight } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { formatDate } from "@/utils/format";
import type { Resume } from "@/types/resume";

interface ResumeCardProps {
  resume: Resume;
  onClick: (resumeId: string) => void;
}

const ResumeCard = ({ resume, onClick }: ResumeCardProps) => (
  <button
    onClick={() => onClick(resume.resume_id)}
    className="w-full p-4 transition-all duration-200 bg-white border border-gray-100 hover:bg-gray-50/80 rounded-xl group hover:shadow-md"
  >
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <Heading sizeOffset={2} className="font-semibold text-left text-gray-900">
          {resume.resume_title}
        </Heading>
        <div className="flex items-center gap-2">
          <div className="inline-block px-3 py-1 font-medium rounded-full bg-primary/5 text-primary whitespace-nowrap">
            {resume.job_category}
          </div>
          <div className="text-gray-500">최종 수정 : {formatDate(resume.updated_at)}</div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-gray-400 transition-colors group-hover:text-primary">
        <span className="hidden font-medium sm:inline">상세보기</span>
        <ChevronRight className="w-5 h-5" />
      </div>
    </div>
  </button>
);

interface AddResumeButtonProps {
  onClick: () => void;
}

const AddResumeButton = ({ onClick }: AddResumeButtonProps) => (
  <div className="p-4 border-2 border-gray-200 border-dashed rounded-xl">
    <button
      onClick={onClick}
      className="flex flex-col items-center w-full gap-2 text-gray-500 transition-colors hover:text-primary"
    >
      <Plus className="w-8 h-8" />
      <Heading sizeOffset={2}>새 이력서 작성하기</Heading>
    </button>
  </div>
);

interface ResumeListProps {
  resumes: Resume[];
}

export default function ResumeList({ resumes }: ResumeListProps) {
  const router = useRouter();
  const MAX_RESUMES = 5;

  const handleResumeClick = (resumeId: string) => {
    router.push(`/resume/${resumeId}`);
  };

  const handleAddResume = () => {
    router.push("/resume/create");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pt-4 sm:pt-6">
        <Heading sizeOffset={3} className="pl-3 font-bold text-gray-900">
          이력서 목록
        </Heading>
      </div>

      <div className="grid gap-4">
        {resumes.map((resume) => (
          <ResumeCard key={resume.resume_id} resume={resume} onClick={handleResumeClick} />
        ))}
      </div>

      {resumes.length < MAX_RESUMES && <AddResumeButton onClick={handleAddResume} />}
    </div>
  );
}
