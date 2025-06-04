import { toast } from "react-hot-toast";
import { ApiError } from "@/features/resume/types";
import { ERROR_MESSAGES } from "@/features/resume/constants/messages";

type ResumeMode = "create" | "edit";

interface HandleResumeErrorOptions {
  mode: ResumeMode;
  setError: (error: string) => void;
  showToast?: boolean;
  logError?: boolean;
}

export function handleResumeError(
  error: ApiError | Error | unknown,
  options: HandleResumeErrorOptions,
) {
  const { mode, setError, showToast = true, logError = true } = options;

  let errorMessage =
    mode === "create" ? ERROR_MESSAGES.CREATE_FAILED : ERROR_MESSAGES.UPDATE_FAILED;

  // 에러 메시지 추출
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    errorMessage = mode === "create" ? ERROR_MESSAGES.CREATE_FAILED : ERROR_MESSAGES.UPDATE_FAILED;
  }

  // 상태 업데이트
  setError(errorMessage);

  // 토스트 표시
  if (showToast) {
    toast.error(errorMessage);
  }

  // 콘솔 로깅
  if (logError) {
    console.error(`이력서 ${mode === "create" ? "생성" : "수정"} 실패:`, error);
  }

  return errorMessage;
}

export function clearResumeError(setError: (error: string | null) => void) {
  setError(null);
}
