"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupSchema,
  SignupFormValues,
} from "@/features/auth-common/validation/signup-auth.schema";
import { FadeInUp } from "@/components/motion/FadeInUp";
import EmailInputWithCheck from "@/features/auth-common/components/fields/EmailInputWithCheck";
import PasswordInput from "@/features/auth-common/components/fields/PasswordInput";
import { SIGNUP_CONSTANTS } from "@/constants/signup";

type Props = {
  onNext: (data: SignupFormValues) => void;
  userType: "company" | "normal";
};

export default function SignupStepOneForm({ onNext, userType }: Props) {
  const methods = useForm<SignupFormValues>({
    mode: "onSubmit",
    resolver: zodResolver(signupSchema),
  });

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmitStep = (data: SignupFormValues) => {
    onNext(data);
  };

  const userTypeText = userType === "company" ? "기업" : "개인";

  return (
    <FormProvider {...methods}>
      <form
        noValidate
        onSubmit={methods.handleSubmit(handleSubmitStep)}
        className="flex flex-col items-center space-y-8"
        role="form"
        aria-label={`${userTypeText} 회원가입 1단계 폼`}
      >
        <FadeInUp delay={0.1}>
          <h2
            className="text-3xl font-semibold"
            id="signup-title"
            aria-label={`${userTypeText} 회원가입 절차를 시작합니다`}
          >
            {userType === "company" ? "기업 회원가입" : "개인 회원가입"}
          </h2>
        </FadeInUp>

        <div
          className="w-full max-w-[700px] space-y-6"
          role="group"
          aria-labelledby="signup-title"
          aria-describedby="signup-step-info"
        >
          <div id="signup-step-info" className="sr-only" aria-live="polite">
            이메일과 비밀번호를 입력해주세요. 이메일 중복 확인이 필요합니다.
          </div>

          <FadeInUp delay={0.2}>
            <EmailInputWithCheck
              register={methods.register}
              error={methods.formState.errors.email?.message}
              onCheckSuccess={() => setIsEmailChecked(true)}
              onEmailChange={() => setIsEmailChecked(false)}
            />
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <PasswordInput
              label="비밀번호"
              register={methods.register("password")}
              show={showPassword}
              onToggle={() => setShowPassword((prev) => !prev)}
              error={methods.formState.errors.password?.message}
            />
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <button
              type="submit"
              disabled={!isEmailChecked}
              className={`w-full h-[60px] bg-primary text-white font-semibold rounded hover:opacity-90 transition cursor-pointer${
                !isEmailChecked ? " opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label={
                !isEmailChecked
                  ? "이메일 중복 확인을 먼저 완료해주세요"
                  : `${userTypeText} 상세정보 입력 페이지로 이동합니다`
              }
              aria-describedby="next-button-help"
            >
              {SIGNUP_CONSTANTS.BUTTON_TEXT.NEXT_STEP}
            </button>
            <div id="next-button-help" className="sr-only" aria-live="polite">
              {!isEmailChecked
                ? "다음 단계로 진행하려면 이메일 중복 확인이 필요합니다"
                : "다음 단계에서는 상세 정보를 입력합니다"}
            </div>
          </FadeInUp>
        </div>
      </form>
    </FormProvider>
  );
}
