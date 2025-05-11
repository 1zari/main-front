"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SignupStepOneForm from "@/features/auth-common/ui/signup/CommonSignupStepOneForm";
import SignupStepTwoUser, {
  UserStepTwoValues,
} from "@/features/auth-user/ui/signup/UserSignupStepTwoForm";
import { SignupFormValues } from "@/features/auth-common/validation/signup-auth.schema";
import { authApi } from "@/api/auth";
import { useModalStore } from "@/store/useModalStore";

export default function UserSignup() {
  const router = useRouter();
  const showModal = useModalStore((s) => s.showModal);
  const [step, setStep] = useState<1 | 2>(1);
  const [stepOneData, setStepOneData] = useState<SignupFormValues | null>(null);
  const [userId, setUserId] = useState<string>("");

  return (
    <div className="flex items-center justify-center flex-1">
      <div className="bg-white rounded-lg shadow-md px-10 py-[100px] w-full max-w-[1000px]">
        {step === 1 ? (
          <SignupStepOneForm
            userType="normal"
            onNext={async (data) => {
              try {
                const res = await authApi.user.signup({
                  email: data.email,
                  password: data.password,
                  join_type: "normal",
                });
                console.log("1단계 회원가입 성공:", res);

                setStepOneData(data);
                setUserId(res.common_user_id);
                setStep(2);
              } catch (err) {
                console.error("1단계 회원가입 실패:", err);
                showModal({
                  title: "회원가입 실패",
                  message: "회원정보 입력 중 오류가 발생했습니다. \n 잠시 후 다시 시도해주세요.",
                  confirmText: "확인",
                  onConfirm: () => router.push("/"),
                });
              }
            }}
          />
        ) : (
          <SignupStepTwoUser
            onSubmit={async (data: UserStepTwoValues) => {
              if (!stepOneData || !userId) return;

              const birthDate = new Date(data.birth);
              if (isNaN(birthDate.getTime())) {
                return;
              }
              const isoBirth = birthDate.toISOString();
              console.log("birth (ISO):", isoBirth);

              try {
                await authApi.user.completeSignup({
                  common_user_id: userId,
                  name: data.name,
                  phone_number: data.phone,
                  gender: data.gender!,
                  birthday: isoBirth,
                  interest: data.interests || [],
                  purpose_subscription: data.purposes,
                  route: data.channels,
                });
                console.log("회원가입 최종 완료");
                showModal({
                  title: "회원가입 완료",
                  message: `시니어내일에 오신 것을 환영합니다! \n ${data.name}님의 내일을 응원해요 🤗🎉`,
                  confirmText: "로그인 하러가기",
                  onConfirm: () => router.push("/auth/login?tab=user"),
                });
              } catch (err) {
                console.error("회원가입 최종 실패:", err);
                showModal({
                  title: "회원가입 실패",
                  message: "회원정보 입력 중 오류가 발생했습니다. \n 잠시 후 다시 시도해주세요.",
                  confirmText: "확인",
                  onConfirm: () => router.push("/"),
                });
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
