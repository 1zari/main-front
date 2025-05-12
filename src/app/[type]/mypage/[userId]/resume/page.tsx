"use client";
import Spinner from "@/components/common/Spinner";
import ResumeList from "@/features/mypage/common/components/myResume/ResumeList";
import { useGetResumeList } from "@/features/resume/api/useGetResumeList";
import { use } from "react";

type ResumeListPageProps = {
  params: Promise<Params>;
};
type Params = {
  type: string;
  userId: string;
};
export default function ResumeListPage({ params }: ResumeListPageProps) {
  const { type, userId } = use(params); // ← 여기서 Promise 언래핑

  const { data: resumeResponse, isLoading, error } = useGetResumeList(type, userId);

  if (isLoading || !resumeResponse) return <Spinner />;
  if (error) return <p className="text-red-500">목록 불러오기 실패</p>;

  return <ResumeList type={type} userId={userId} resumes={resumeResponse.resume_list} />;
}
