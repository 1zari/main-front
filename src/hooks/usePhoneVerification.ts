import { useState, useEffect } from "react";
import type {
  UseFormSetError,
  UseFormSetValue,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import { useModalStore } from "@/store/useModalStore";
import { SIGNUP_CONSTANTS } from "@/constants/signup";
import { handleSmsVerificationError, handleSmsCodeVerificationError } from "@/utils/errorHandlers";
import { userApi } from "@/api/user";
import type { PhoneVerificationRequestDto, VerifyCodeRequestDto } from "@/types/api/user";

interface UsePhoneVerificationProps<T extends FieldValues> {
  setError: UseFormSetError<T>;
  setValue: UseFormSetValue<T>;
  clearErrors: (name?: Path<T>) => void;
  phoneFieldName: Path<T>;
  codeFieldName: Path<T>;
}

export const usePhoneVerification = <T extends FieldValues>({
  setError,
  setValue,
  clearErrors,
  phoneFieldName,
  codeFieldName,
}: UsePhoneVerificationProps<T>) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [isVerifyInputVisible, setIsVerifyInputVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState(SIGNUP_CONSTANTS.TIMER.INITIAL_VALUE);
  const [isVerified, setIsVerified] = useState(false);
  const showModal = useModalStore((s) => s.showModal);

  // 타이머 관리
  useEffect(() => {
    if (!isRequesting) return;
    if (timeLeft <= 0) {
      setIsRequesting(false);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isRequesting, timeLeft]);

  const getTimerText = () => {
    if (!isRequesting) return undefined;
    return `${Math.floor(timeLeft / SIGNUP_CONSTANTS.TIMER.SECONDS_PER_MINUTE)}:${String(
      timeLeft % SIGNUP_CONSTANTS.TIMER.SECONDS_PER_MINUTE,
    ).padStart(SIGNUP_CONSTANTS.SMS_VERIFICATION.TIMER_FORMAT.SECONDS_PADDING, "0")}`;
  };

  // SMS 인증 요청
  const requestVerification = async (phoneNumber: string) => {
    clearErrors(phoneFieldName);

    const payload: PhoneVerificationRequestDto = {
      phone_number: phoneNumber || "",
      join_type: "normal",
    };

    try {
      await userApi.requestPhoneCode(payload);

      setIsRequesting(true);
      setTimeLeft(SIGNUP_CONSTANTS.SMS_VERIFICATION.TIMEOUT_SECONDS);
      setIsVerifyInputVisible(true);
      setIsFadingOut(false);
      showModal({
        title: SIGNUP_CONSTANTS.MESSAGES.SUCCESS.SMS_SENT,
        message: SIGNUP_CONSTANTS.MESSAGES.INFO.SMS_GUIDE,
        confirmText: SIGNUP_CONSTANTS.MODAL_BUTTONS.CONFIRM,
        onConfirm: () => {},
      });
    } catch (error: unknown) {
      handleSmsVerificationError(error, setError, phoneFieldName, showModal);
    }
  };

  // SMS 인증 코드 확인
  const verifyCode = async (phoneNumber: string, code: string) => {
    if (!code) {
      setError(codeFieldName, {
        type: "manual",
        message: "인증번호 6자리를 입력해주세요.",
      });
      return;
    }

    const payload: VerifyCodeRequestDto = {
      phone_number: phoneNumber || "",
      code,
      join_type: "normal",
    };

    try {
      await userApi.verifyPhoneCode(payload);

      setIsVerified(true);
      setValue(codeFieldName, code as PathValue<T, Path<T>>, { shouldValidate: true });
      setIsFadingOut(true);

      setTimeout(() => {
        setIsVerifyInputVisible(false);
        setIsRequesting(false);
      }, SIGNUP_CONSTANTS.SMS_VERIFICATION.RETRY_DELAY);

      showModal({
        title: SIGNUP_CONSTANTS.MESSAGES.SUCCESS.SMS_VERIFIED,
        message: SIGNUP_CONSTANTS.MESSAGES.INFO.SMS_COMPLETE_GUIDE,
        confirmText: SIGNUP_CONSTANTS.MODAL_BUTTONS.CONFIRM,
        onConfirm: () => {},
      });
    } catch (error: unknown) {
      handleSmsCodeVerificationError(error, setError, codeFieldName);
    }
  };

  return {
    isRequesting,
    isVerifyInputVisible,
    isFadingOut,
    isVerified,
    timeLeft,

    requestVerification,
    verifyCode,
    getTimerText,

    RETRY_DELAY: SIGNUP_CONSTANTS.SMS_VERIFICATION.RETRY_DELAY,
  };
};
