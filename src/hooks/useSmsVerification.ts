import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { userApi } from "@/api/user";
import { SIGNUP_CONSTANTS } from "@/constants/signup";
import type { PhoneVerificationRequestDto, VerifyCodeRequestDto } from "@/types/api/user";

export const useSmsVerification = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  // 타이머 효과
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 인증번호 요청
  const requestMutation = useMutation({
    mutationFn: (data: PhoneVerificationRequestDto) => userApi.requestPhoneCode(data),
    onSuccess: () => {
      setTimeLeft(SIGNUP_CONSTANTS.SMS_VERIFICATION.TIMEOUT_SECONDS);
      setIsVerified(false);
    },
    retry: 2,
    retryDelay: 1000,
  });

  // 인증번호 확인
  const verifyMutation = useMutation({
    mutationFn: (data: VerifyCodeRequestDto) => userApi.verifyPhoneCode(data),
    onSuccess: () => {
      setIsVerified(true);
      setTimeLeft(0);
    },
    retry: 1,
  });

  // 타이머 포맷팅
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // 상태 리셋 - 재전송 시
  const resetVerification = () => {
    setIsVerified(false);
    setTimeLeft(0);
    requestMutation.reset();
    verifyMutation.reset();
  };

  return {
    // 요청 관련
    requestVerification: requestMutation.mutate,
    isRequestingCode: requestMutation.isPending,
    requestError: requestMutation.error,

    // 확인 관련
    verifyCode: verifyMutation.mutate,
    isVerifyingCode: verifyMutation.isPending,
    verifyError: verifyMutation.error,

    // 상태
    isVerified,
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isTimeExpired: timeLeft === 0,

    // 유틸
    resetVerification,
  };
};
