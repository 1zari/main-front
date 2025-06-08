"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import SignupStepOneForm from "@/features/auth-common/ui/signup/CommonSignupStepOneForm";
import { SignupFormValues } from "@/features/auth-common/validation/signup-auth.schema";
import SignupStepTwoCompany, { CompanyStepTwoValues } from "./CompanySignupStepTwoForm";
import { useModalStore } from "@/store/useModalStore";
import { handleFileValidationError, showSignupSuccessModal } from "@/utils/errorHandlers";
import { validateDate } from "@/utils/formDataConverters";
import { useCompanySignupStep1, useCompanySignupStep2 } from "../../hooks/useCompanySignup";
import { toast } from "react-hot-toast";

export default function SignupFormCompany() {
  const router = useRouter();
  const showModal = useModalStore((s) => s.showModal);
  const [step, setStep] = useState<1 | 2>(1);
  const [stepOneData, setStepOneData] = useState<SignupFormValues | null>(null);
  const [commonUserId, setCommonUserId] = useState<string | null>(null);

  // 1단계 회원가입
  const {
    mutate: signupStep1,
    isPending: isStep1Loading,
    error: step1Error,
    reset: resetStep1,
  } = useCompanySignupStep1();

  // 2단계 회원가입
  const {
    mutate: signupStep2,
    isPending: isStep2Loading,
    error: step2Error,
    reset: resetStep2,
  } = useCompanySignupStep2();

  // 1단계 성공 콜백 메모이제이션
  const handleStep1Success = useCallback(
    (res: { common_user_id: string }, data: SignupFormValues) => {
      console.log("1단계 회원가입 성공:", res);
      setStepOneData(data);
      setCommonUserId(res.common_user_id);
      setStep(2);
      toast.success("이메일, 비밀번호 등록완료!");
    },
    [],
  );

  // 1단계 에러 콜백 메모이제이션
  const handleStep1Error = useCallback(
    (error: unknown) => {
      console.error("1단계 회원가입 실패:", error);
      showModal({
        title: "⚠️ 회원가입 실패",
        message: "회원정보 입력 중 오류가 발생했습니다. \n 잠시 후 다시 시도해주세요.",
        confirmText: "확인",
        onConfirm: () => router.push("/"),
      });
    },
    [showModal, router],
  );

  // 2단계 성공 콜백 메모이제이션
  const handleStep2Success = useCallback(
    (companyName: string) => {
      console.log("기업회원 가입 최종 완료");
      showSignupSuccessModal(companyName, showModal, router);
    },
    [showModal, router],
  );

  // 2단계 에러 콜백 메모이제이션
  const handleStep2Error = useCallback(
    (error: unknown) => {
      console.error("기업회원 가입 실패:", error);
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
          join_type: "company",
          company_name: "-",
          business_number: "-",
          representative_name: "-",
          phone_number: "-",
        },
        {
          onSuccess: (res) => handleStep1Success(res, data),
          onError: handleStep1Error,
        },
      );
    },
    [signupStep1, handleStep1Success, handleStep1Error],
  );

  // 2단계 제출 핸들러 메모이제이션
  const handleStep2Submit = useCallback(
    (data: CompanyStepTwoValues) => {
      if (!stepOneData || !commonUserId) return;

      // 파일 검증
      const businessFile = data.businessFile?.[0];
      if (!businessFile) {
        handleFileValidationError("business", showModal, router);
        return;
      }

      // 날짜 검증
      if (!validateDate(data.startDate)) {
        handleFileValidationError("birth", showModal, router);
        return;
      }

      signupStep2(
        { data, commonUserId },
        {
          onSuccess: () => handleStep2Success(data.companyName),
          onError: handleStep2Error,
        },
      );
    },
    [
      stepOneData,
      commonUserId,
      signupStep2,
      handleStep2Success,
      handleStep2Error,
      showModal,
      router,
    ],
  );

  return (
    <div className="flex justify-center items-center flex-1">
      <div className="bg-white rounded-lg shadow-md px-10 py-[100px] w-full max-w-[1000px]">
        {step === 1 ? (
          <SignupStepOneForm userType="company" onNext={handleStep1Submit} />
        ) : (
          <SignupStepTwoCompany onSubmit={handleStep2Submit} />
        )}

        {(isStep1Loading || isStep2Loading) && (
          <div className="mt-4 w-full max-w-[700px] mx-auto">
            <div className="w-full h-[60px] flex items-center justify-center bg-primary/10 border border-primary rounded">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mr-3" />
              <p className="text-primary font-medium">
                {isStep1Loading ? "회원정보를 등록 중입니다..." : "회원가입을 완료하는 중입니다..."}
              </p>
            </div>
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
