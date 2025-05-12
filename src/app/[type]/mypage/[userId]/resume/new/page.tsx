"use client";
import ResumeForm from "@/features/resume/components/ResumeForm";

export default function ResumeNewPage() {
  return (
    <div className="flex justify-center items-center flex-1">
      <div className="bg-white rounded-lg shadow-md px-10 py-[80px] w-full max-w-[1000px]">
        <h1 className="text-3xl font-bold mb-10 text-center text-[#285634]">이력서 작성하기</h1>
        <ResumeForm mode="create" />
      </div>
    </div>
  );
}
