"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import SignupStepOneForm from "@/features/auth-common/ui/signup/CommonSignupStepOneForm";
import SignupStepTwoUser, {
  UserStepTwoValues,
} from "@/features/auth-user/ui/signup/UserSignupStepTwoForm";
import { SignupFormValues } from "@/features/auth-common/validation/signup-auth.schema";
import { useModalStore } from "@/store/useModalStore";
import { showUserSignupSuccessModal } from "@/utils/errorHandlers";
import { useUserSignupStep1, useUserSignupStep2 } from "../../hooks/useUserSignup";
import { toast } from "react-hot-toast";

export default function UserSignup() {
  const router = useRouter();
  const showModal = useModalStore((s) => s.showModal);
  const [step, setStep] = useState<1 | 2>(1);
  const [stepOneData, setStepOneData] = useState<SignupFormValues | null>(null);
  const [userId, setUserId] = useState<string>("");

  // 1단계 회원가입
  const {
    mutate: signupStep1,
    isPending: isStep1Loading,
    error: step1Error,
    reset: resetStep1,
  } = useUserSignupStep1();

  // 2단계 회원가입
  const {
    mutate: signupStep2,
    isPending: isStep2Loading,
    error: step2Error,
    reset: resetStep2,
  } = useUserSignupStep2();

  // 공통 에러 핸들러 메모이제이션
  const handleSignupError = useCallback(
    (error: unknown) => {
      console.error("회원가입 실패:", error);
      showModal({
        title: "⚠️ 회원가입 실패",
        message: "회원정보 입력 중 오류가 발생했습니다. \n 잠시 후 다시 시도해주세요.",
        confirmText: "확인",
        onConfirm: () => router.push("/"),
      });
    },
    [showModal, router],
  );

  // 1단계 제출 핸들러 메모이제이션
  const handleStep1Submit = useCallback(
    (data: SignupFormValues) => {
      signupStep1(
        {
          email: data.email,
          password: data.password,
          join_type: "normal",
        },
        {
          onSuccess: (res) => {
            console.log("1단계 회원가입 성공:", res);
            setStepOneData(data);
            setUserId(res.common_user_id);
            setStep(2);
            toast.success("이메일, 비밀번호 등록 완료! 상세정보를 입력해주세요.");
          },
          onError: handleSignupError,
        },
      );
    },
    [signupStep1, handleSignupError],
  );

  // 2단계 제출 핸들러 메모이제이션
  const handleStep2Submit = useCallback(
    (data: UserStepTwoValues) => {
      if (!stepOneData || !userId) return;

      signupStep2(
        { data, commonUserId: userId },
        {
          onSuccess: () => {
            console.log("회원가입 최종 완료");
            showUserSignupSuccessModal(data.name, showModal, router);
          },
          onError: handleSignupError,
        },
      );
    },
    [stepOneData, userId, signupStep2, showModal, router, handleSignupError],
  );

  return (
    <div className="flex items-center justify-center flex-1">
      <div className="bg-white rounded-lg shadow-md px-10 py-[100px] w-full max-w-[1000px]">
        {step === 1 ? (
          <SignupStepOneForm userType="normal" onNext={handleStep1Submit} />
        ) : (
          <SignupStepTwoUser onSubmit={handleStep2Submit} />
        )}

        {(isStep1Loading || isStep2Loading) && (
          <div className="mt-4 flex items-center justify-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3" />
            <p className="text-blue-800">
              {isStep1Loading ? "회원정보를 등록 중입니다..." : "회원가입을 완료하는 중입니다..."}
            </p>
          </div>
        )}

        {step1Error && step === 1 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-800 font-medium">1단계 회원가입 중 오류가 발생했습니다</p>
                <p className="text-red-600 text-sm mt-1">
                  {step1Error?.message || "알 수 없는 오류가 발생했습니다."}
                </p>
              </div>
              <button
                onClick={() => resetStep1()}
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                다시 시도
              </button>
            </div>
          </div>
        )}

        {step2Error && step === 2 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-800 font-medium">회원가입 완료 중 오류가 발생했습니다</p>
                <p className="text-red-600 text-sm mt-1">
                  {step2Error?.message || "알 수 없는 오류가 발생했습니다."}
                </p>
              </div>
              <button
                onClick={() => resetStep2()}
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                다시 시도
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
