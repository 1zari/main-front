"use client";
import React from "react";
import Spinner from "@/components/common/Spinner";
import ResumeList from "@/features/mypage/common/components/myResume/ResumeList";
import { useGetResumeList } from "@/features/resume/api/useGetResumeList";

// 2025.06.08) params 타입 변경 (Promise 타입으로 변경됨)
interface ResumeListPageProps {
  params: Promise<{
    type: string;
    userId: string;
  }>;
}

// 2025.06.08) params가 Promise 타입으로 변경되어 async/await 적용
export default async function ResumeListPage({ params }: ResumeListPageProps) {
  const { type, userId } = await params;

  // 클라이언트 컴포넌트로 분리하여 hook 사용
  return <ResumePageClient type={type} userId={userId} />;
}

// 2025.06.08) 클라이언트 컴포넌트로 분리
function ResumePageClient({ type, userId }: { type: string; userId: string }) {
  const { data: resumeResponse, isLoading, error } = useGetResumeList(type, userId);

  if (isLoading || !resumeResponse) return <Spinner />;
  if (error) return <p className="text-red-500">목록 불러오기 실패</p>;

  return <ResumeList type={type} userId={userId} resumes={resumeResponse.resume_list} />;
}