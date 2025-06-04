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
import { handleSignupError, showUserSignupSuccessModal } from "@/utils/errorHandlers";
import { convertUserSignupData } from "@/utils/formDataConverters";

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
                handleSignupError(err, showModal, router);
              }
            }}
          />
        ) : (
          <SignupStepTwoUser
            onSubmit={async (data: UserStepTwoValues) => {
              if (!stepOneData || !userId) return;

              try {
                const signupPayload = convertUserSignupData(data, userId);

                console.log("일반 회원가입 요청 데이터:", signupPayload);

                await authApi.user.completeSignup(signupPayload);
                console.log("회원가입 최종 완료");
                showUserSignupSuccessModal(data.name, showModal, router);
              } catch (err) {
                handleSignupError(err, showModal, router);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
