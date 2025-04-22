"use client";

import ResumeTitle from "@/features/resume/components/ResumeTitle";
import { useState } from "react";

const Resume = () => {
  const [resumeTitle, setResumeTitle] = useState("");

  return (
    <div>
      <ResumeTitle value={resumeTitle} onChange={setResumeTitle} />
    </div>
  );
};

export default Resume;
