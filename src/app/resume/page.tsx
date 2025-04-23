"use client";

import BackButton from "@/features/resume/components/common/BackButton";
import ResumeForm from "@/features/resume/components/Form";

const ResumePage = () => {
  return (
    <div>
      <div className="m-5">
        <BackButton />
      </div>
      <h1 className="flex justify-center m-5 text-2xl font-bold items-center text-gray-700] mb-6">
        이력서 등록하기
      </h1>
      <ResumeForm mode="new" resumeId="" />
    </div>
  );
};

export default ResumePage;
