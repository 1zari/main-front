"use client";
import React from "react";
import Spinner from "@/components/common/Spinner";
import ResumeList from "@/features/mypage/common/components/myResume/ResumeList";
import { useGetResumeList } from "@/features/resume/api/useGetResumeList";

interface ResumeListPageProps {
  params: {
    type: string;
    userId: string;
  };
}

export default function ResumeListPage({ params }: ResumeListPageProps) {
  const { type, userId } = params;

  const { data: resumeResponse, isLoading, error } = useGetResumeList(type, userId);

  if (isLoading || !resumeResponse) return <Spinner />;
  if (error) return <p className="text-red-500">목록 불러오기 실패</p>;

  return <ResumeList type={type} userId={userId} resumes={resumeResponse.resume_list} />;
}
