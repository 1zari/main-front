import { SIGNUP_CONSTANTS } from "@/constants/signup";
import type { UseFormSetError, FieldValues, Path } from "react-hook-form";

// 회원가입 관련 공통 에러 처리
export const handleSignupError = (
  error: unknown,
  showModal: (options: {
    title: string;
    message: string;
    confirmText: string;
    onConfirm: () => void;
  }) => void,
  router: { push: (path: string) => void },
) => {
  console.error("회원가입 실패:", error);
  showModal({
    title: SIGNUP_CONSTANTS.MESSAGES.ERROR.SIGNUP_FAILED,
    message: SIGNUP_CONSTANTS.MESSAGES.INFO.SIGNUP_ERROR_RETRY,
    confirmText: SIGNUP_CONSTANTS.MODAL_BUTTONS.CONFIRM,
    onConfirm: () => router.push("/"),
  });
};

// SMS 인증 관련 에러 처리
export const handleSmsVerificationError = <T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  phoneFieldName: Path<T>,
  showModal: (options: {
    title: string;
    message: string;
    confirmText: string;
    onConfirm: () => void;
    hideCancelButton?: boolean;
  }) => void,
) => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "status" in error.response
  ) {
    // 중복 전화번호 에러
    showModal({
      title: "⚠️",
      message: SIGNUP_CONSTANTS.MESSAGES.ERROR.SMS_DUPLICATE,
      confirmText: SIGNUP_CONSTANTS.MODAL_BUTTONS.CONFIRM,
      onConfirm: () => {},
      hideCancelButton: true,
    });
  } else {
    // 일반적인 SMS 요청 실패
    setError(phoneFieldName, {
      type: "manual",
      message: SIGNUP_CONSTANTS.MESSAGES.ERROR.SMS_FAILED,
    });
  }
};

// SMS 인증 코드 확인 에러 처리
export const handleSmsCodeVerificationError = <T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  codeFieldName: Path<T>,
) => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "status" in error.response
  ) {
    const response = error.response as { status?: number };

    if (response.status === 408) {
      // 인증 시간 만료
      setError(codeFieldName, {
        type: "manual",
        message: SIGNUP_CONSTANTS.MESSAGES.ERROR.SMS_TIMEOUT,
      });
    } else {
      // 인증번호 불일치
      setError(codeFieldName, {
        type: "manual",
        message: SIGNUP_CONSTANTS.MESSAGES.ERROR.SMS_INVALID_CODE,
      });
    }
  } else {
    // 일반적인 인증 확인 실패
    setError(codeFieldName, {
      type: "manual",
      message: SIGNUP_CONSTANTS.MESSAGES.ERROR.SMS_FAILED,
    });
  }
};

// 사업자 인증 에러 처리
export const handleBusinessVerificationError = (
  error: unknown,
  showModal: (options: {
    title: string;
    message: string;
    confirmText: string;
    onConfirm: () => void;
  }) => void,
) => {
  if (error && typeof error === "object" && "isAxiosError" in error && error.isAxiosError) {
    const axiosError = error as {
      config?: { url?: string };
      response?: { status?: number; data?: unknown };
    };

    console.error("요청 URL:", axiosError.config?.url);
    console.error("응답 status:", axiosError.response?.status);
    console.error("응답 data:", axiosError.response?.data);
  } else {
    console.error(error);
  }

  showModal({
    title: "⚠️ 인증 오류",
    message: SIGNUP_CONSTANTS.MESSAGES.ERROR.BUSINESS_VERIFICATION_FAILED,
    confirmText: SIGNUP_CONSTANTS.MODAL_BUTTONS.CONFIRM,
    onConfirm: () => {},
  });
};

// 파일 검증 에러 처리
export const handleFileValidationError = (
  type: "business" | "birth",
  showModal: (options: {
    title: string;
    message: string;
    confirmText: string;
    onConfirm: () => void;
  }) => void,
  router: { push: (path: string) => void },
) => {
  const titles = {
    business: "사업자등록증 미첨부",
    birth: "개업년월일 미입력",
  };

  const messages = {
    business: "사업자등록증을 첨부해주세요.",
    birth: "개업년월일을 입력해주세요.",
  };

  showModal({
    title: titles[type],
    message: messages[type],
    confirmText: SIGNUP_CONSTANTS.MODAL_BUTTONS.CONFIRM,
    onConfirm: () => router.push("/"),
  });
};

// 회원가입 성공 모달 - 기업회원
export const showSignupSuccessModal = (
  companyName: string,
  showModal: (options: {
    title: string;
    message: string;
    confirmText: string;
    onConfirm: () => void;
  }) => void,
  router: { push: (path: string) => void },
) => {
  showModal({
    title: SIGNUP_CONSTANTS.MESSAGES.SUCCESS.SIGNUP_COMPLETE,
    message: `${SIGNUP_CONSTANTS.MESSAGES.INFO.SIGNUP_WELCOME} \n ${companyName}${SIGNUP_CONSTANTS.MESSAGES.INFO.SIGNUP_BUSINESS_SUPPORT}`,
    confirmText: SIGNUP_CONSTANTS.MODAL_BUTTONS.GO_TO_LOGIN,
    onConfirm: () => router.push("/auth/login?tab=company"),
  });
};

// 회원가입 성공 모달 - 일반회원
export const showUserSignupSuccessModal = (
  userName: string,
  showModal: (options: {
    title: string;
    message: string;
    confirmText: string;
    onConfirm: () => void;
  }) => void,
  router: { push: (path: string) => void },
) => {
  showModal({
    title: SIGNUP_CONSTANTS.MESSAGES.SUCCESS.SIGNUP_COMPLETE,
    message: `${SIGNUP_CONSTANTS.MESSAGES.INFO.SIGNUP_WELCOME} \n ${userName}님의 내일을 응원해요 🤗🎉`,
    confirmText: SIGNUP_CONSTANTS.MODAL_BUTTONS.GO_TO_LOGIN,
    onConfirm: () => router.push("/auth/login?tab=user"),
  });
};
