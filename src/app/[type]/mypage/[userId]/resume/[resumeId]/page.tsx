"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Spinner from "@/components/common/Spinner";
import ResumeSelect from "@/features/resume/components/common/ui/ResumeSelect";
import ResumeContainer from "@/features/resume/components/ResumeContainer";
import ResumeActionButtons from "@/features/resume/components/ResumeActionButton";
import { useGetResumeDetail } from "@/features/resume/api/useGetResumeDetail";
import { useGetResumeList } from "@/features/resume/api/useGetResumeList";
import { mapToResumeFormData } from "@/features/resume/utils/mapToResumeFormData";
import type { ResumeFormData } from "@/features/resume/validation/resumeSchema";

export default function ResumeViewPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { type, userId, resumeId } = useParams() as {
    type: string;
    userId: string;
    resumeId: string;
  };

  const [selectedId, setSelectedId] = useState(resumeId);
  const {
    data: listData,
    isLoading: isListLoading,
    error: listError,
  } = useGetResumeList(type, userId);

  const {
    data: detailData,
    isLoading: isDetailLoading,
    error: detailError,
  } = useGetResumeDetail(selectedId);

  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
      return;
    }
    if (session.user.id !== userId) {
      router.replace(`/${session.user.join_type}/mypage/${session.user.id}`);
    }
  }, [session, userId, router]);

  if (status === "loading" || isListLoading || isDetailLoading) {
    return <Spinner />;
  }
  if (listError) return <p className="text-red-500">리스트 불러오기 실패: {listError.message}</p>;
  if (detailError) return <p className="text-red-500">상세 불러오기 실패: {detailError.message}</p>;

  const resume: ResumeFormData = mapToResumeFormData(detailData!.resume, session!.user.email ?? "");

  const options = listData!.resume_list.map((r) => ({
    label: r.resume_title,
    value: r.resume_id,
  }));

  const handleSelectChange = (val: string) => {
    setSelectedId(val);
    router.push(`/${type}/mypage/${userId}/resume/${val}`);
  };

  return (
    <div className="flex flex-col items-center flex-1 space-y-6">
      <div className="w-full max-w-[1000px]">
        <ResumeSelect label="" value={selectedId} onChange={handleSelectChange} options={options} />
      </div>

      <div className="bg-white rounded-lg shadow-md px-5 py-20 w-full max-w-[1000px]">
        <h1 className="text-3xl font-bold mb-10 text-center text-primary">{resume.title}</h1>
        <ResumeContainer resume={resume} />
        <ResumeActionButtons resumeId={selectedId} />
      </div>
    </div>
  );
}
