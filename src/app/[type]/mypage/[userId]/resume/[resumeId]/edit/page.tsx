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

const ErrorCard = ({
  title,
  message,
  onRetry,
  showRetry = true,
  actionButton,
}: {
  title: string;
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
  actionButton?: React.ReactNode;
}) => (
  <div className="flex justify-center items-center flex-1">
    <div className="bg-white rounded-lg shadow-md px-10 py-[80px] w-full max-w-[1000px]">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md text-center">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-700 mb-3">{title}</h2>
          <p className="text-red-600 mb-6">{message}</p>

          <div className="flex flex-col gap-3">
            {showRetry && onRetry && (
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                다시 시도
              </button>
            )}
            {actionButton}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function ResumeEditPage() {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const { type, userId, resumeId } = useParams() as {
    type: string;
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
    refetch: refetchDetail,
  } = useQuery<ResumeResponseDto, Error>({
    queryKey: ["resumeDetail", resumeId],
    queryFn: () => resumeApi.getDetail(resumeId!, session?.accessToken ?? ""),
    enabled: !!session && !!resumeId,
  });

  if (sessionStatus === "loading" || isDetailLoading) {
    return <Spinner />;
  }

  if (detailError) {
    const getErrorMessage = (error: Error) => {
      if (error.message.includes("404")) {
        return "존재하지 않는 이력서이거나 삭제된 이력서입니다.";
      }
      if (error.message.includes("403")) {
        return "이 이력서를 수정할 권한이 없습니다.";
      }
      return "이력서를 불러오는 중 문제가 발생했습니다. 네트워크 연결을 확인해주세요.";
    };

    return (
      <ErrorCard
        title="이력서를 불러올 수 없습니다"
        message={getErrorMessage(detailError)}
        onRetry={refetchDetail}
        actionButton={
          <div className="flex flex-col gap-2">
            <button
              onClick={() => router.push(`/${type}/mypage/${userId}`)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              마이페이지로 이동
            </button>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              이전 페이지로
            </button>
          </div>
        }
      />
    );
  }

  const dto = detailData!.resume;
  const defaultValues: ResumeFormData = {
    jobCategory: dto.job_category,
    title: dto.resume_title,
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
