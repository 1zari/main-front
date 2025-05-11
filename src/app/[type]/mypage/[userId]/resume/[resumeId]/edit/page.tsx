"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/common/Spinner";
import ResumeForm from "@/features/resume/components/ResumeForm";
import { resumeApi } from "@/api/resume";
import type { ResumeResponseDto } from "@/types/api/resume";
import type { ResumeFormData } from "@/features/resume/validation/resumeSchema";

export default function ResumeEditPage() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const { userId, resumeId } = useParams() as {
    userId: string;
    resumeId: string;
  };

  useEffect(() => {
    if (sessionStatus === "loading") return;
    if (!session) {
      router.replace("/auth/login");
      return;
    }
    if (session.user.id !== userId) {
      router.replace(`/${session.user.join_type}/mypage/${session.user.id}`);
      return;
    }
  }, [session, sessionStatus, userId, router]);

  const {
    data: detailData,
    isLoading: isDetailLoading,
    error: detailError,
  } = useQuery<ResumeResponseDto, Error>({
    queryKey: ["resumeDetail", resumeId],
    queryFn: () => resumeApi.getDetail(resumeId!, session?.accessToken ?? ""),
    enabled: !!session && !!resumeId,
  });

  if (sessionStatus === "loading" || isDetailLoading) {
    return <Spinner />;
  }
  if (detailError) {
    return <p className="text-red-500">이력서 불러오기 실패: {detailError.message}</p>;
  }

  const dto = detailData!.resume;
  const defaultValues: ResumeFormData = {
    jobCategory: dto.job_category,
    title: dto.resume_title,
    name: dto.user.name,
    phone: dto.user.phone_number,
    email: session!.user.email ?? "",
    schoolType: dto.education_level,
    schoolName: dto.school_name,
    graduationStatus: dto.education_state,
    experiences: dto.career_list.map((c) => ({
      company: c.company_name,
      position: c.position,
      startDate: c.employment_period_start,
      endDate: c.employment_period_end ?? "",
      isCurrent: c.employment_period_end === null,
    })),
    certifications: dto.certification_list.map((c) => ({
      name: c.certification_name,
      issuer: c.issuing_organization,
      date: c.date_acquired,
    })),
    introduction: dto.introduce,
  };

  return (
    <div className="flex justify-center items-center flex-1">
      <div className="bg-white rounded-lg shadow-md px-10 py-[80px] w-full max-w-[1000px]">
        <h1 className="text-3xl font-bold mb-10 text-center text-primary">이력서 수정하기</h1>
        <ResumeForm mode="edit" resumeId={resumeId} defaultValues={defaultValues} />
      </div>
    </div>
  );
}
