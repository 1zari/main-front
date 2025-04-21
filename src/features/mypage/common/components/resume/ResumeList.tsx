import React from "react";
import { useRouter } from "next/navigation";
import { Plus, ChevronRight } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { formatDate } from "@/utils/format";
import type { Resume } from "@/types/resume";

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
    if (resumes.length >= MAX_RESUMES) {
      alert("이력서는 최대 5개까지만 작성할 수 있습니다.");
      return;
    }
    router.push("resume/create");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 sm:p-6">
        <Heading sizeOffset={3} className="font-bold text-gray-900">
          이력서 목록
        </Heading>
        <button
          onClick={handleAddResume}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium flex items-center gap-2 hover:shadow-md"
        >
          <Plus className="h-5 w-5" />
          <span>이력서 추가</span>
        </button>
      </div>

      <div className="grid gap-4">
        {resumes.map((resume) => (
          <button
            key={resume.resume_id}
            onClick={() => handleResumeClick(resume.resume_id)}
            className="w-full bg-white hover:bg-gray-50/80 border border-gray-100 rounded-xl p-4 transition-all duration-200 group hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <Heading sizeOffset={2} className="font-semibold text-gray-900 text-left">
                  {resume.resume_title}
                </Heading>
                <div className="flex items-center gap-2">
                  <span className="bg-primary/5 text-primary px-3 py-1 rounded-full font-medium">
                    {resume.job_category}
                  </span>
                  <span className="text-gray-500 text-sm">
                    최종 수정 : {formatDate(resume.updated_at)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-400 group-hover:text-primary transition-colors">
                <span className="font-medium">상세보기</span>
                <ChevronRight className="h-5 w-5" />
              </div>
            </div>
          </button>
        ))}

        {resumes.length === 0 && (
          <div className="bg-gray-50/50 rounded-xl p-8 text-center">
            <Heading sizeOffset={2} className="text-gray-500">
              작성된 이력서가 없습니다.
              <br />
              새로운 이력서를 작성해보세요!
            </Heading>
          </div>
        )}
      </div>

      {resumes.length > 0 && resumes.length < MAX_RESUMES && (
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8">
          <button
            onClick={handleAddResume}
            className="w-full flex flex-col items-center gap-2 text-gray-500 hover:text-primary transition-colors"
          >
            <Plus className="h-8 w-8" />
            <Heading sizeOffset={2}>새 이력서 작성하기</Heading>
          </button>
        </div>
      )}
    </div>
  );
}
