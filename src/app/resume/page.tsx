"use client";

import ResumeForm from "@/features/resume/components/Form";
import ResumeTitle from "@/features/resume/components/ResumeTitle";
import { useState } from "react";

const ResumePage = () => {
  const [resumeTitle, setResumeTitle] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0F8C3B] mb-6">이력서 등록하기</h1>
      <ResumeForm />
    </div>
  );
};

export default ResumePage;
