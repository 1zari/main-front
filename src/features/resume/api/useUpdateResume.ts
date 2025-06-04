import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { resumeApi } from "@/api/resume";
import type { ApiError } from "@/lib/fetcher";
import type { UpdateResumeRequestDto, ResumeResponseDto } from "@/types/api/resume";

interface UseUpdateResumeOptions {
  onSuccess?: (data: ResumeResponseDto) => void;
  onError?: (error: ApiError) => void;
}

export function useUpdateResume(options?: UseUpdateResumeOptions) {
  const { data: session, status: sessionStatus } = useSession();

  const {
    mutate: updateResume,
    status,
    error,
    reset,
  } = useMutation<ResumeResponseDto, ApiError, { id: string; dto: UpdateResumeRequestDto }>({
    mutationFn: async ({ id, dto }) => {
      // 세션 상태 확인
      if (sessionStatus === "loading") {
        throw new Error("인증 정보를 확인하는 중입니다. 잠시 후 다시 시도해주세요.");
      }

      if (!session?.accessToken) {
        throw new Error("로그인이 필요합니다. 다시 로그인해주세요.");
      }
      // 파라미터 검증
      if (!id?.trim()) {
        throw new Error("이력서 ID가 필요합니다.");
      }
      try {
        return await resumeApi.update(id, dto, session.accessToken);
      } catch (error) {
        // API 에러를 사용자 친화적 메시지로 변환
        if (error instanceof Error) {
          if (error.message.includes("401") || error.message.includes("Unauthorized")) {
            throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
          }
          if (error.message.includes("403") || error.message.includes("Forbidden")) {
            throw new Error("이력서 수정 권한이 없습니다.");
          }
          if (error.message.includes("404") || error.message.includes("Not Found")) {
            throw new Error("수정하려는 이력서를 찾을 수 없습니다.");
          }
          if (error.message.includes("400") || error.message.includes("Bad Request")) {
            throw new Error("입력 정보가 올바르지 않습니다. 다시 확인해주세요.");
          }
          if (error.message.includes("409") || error.message.includes("Conflict")) {
            throw new Error("동일한 제목의 이력서가 이미 존재합니다.");
          }
          if (error.message.includes("500") || error.message.includes("Internal Server Error")) {
            throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          }
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.error("이력서 수정 실패:", error);
      options?.onError?.(error);
    },
    // 재시도 설정
    retry: (failureCount, error) => {
      // 인증 오류, 권한 오류, 404 오류는 재시도하지 않음
      if (
        error.message.includes("401") ||
        error.message.includes("403") ||
        error.message.includes("404")
      ) {
        return false;
      }
      // 최대 2번까지 재시도
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });

  const isUpdating = status === "pending";

  return {
    updateResume,
    isUpdating,
    isSuccess: status === "success",
    isError: status === "error",
    error,
    reset,
  };
}
