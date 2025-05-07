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

  return (
    <FormProvider {...methods}>
      <form
        noValidate
        onSubmit={methods.handleSubmit(handleSubmitStep)}
        className="flex flex-col items-center space-y-8"
      >
        <FadeInUp delay={0.1}>
          <h2 className="text-3xl font-semibold">
            {userType === "company" ? "기업 회원가입" : "개인 회원가입"}
          </h2>
        </FadeInUp>

        <div className="w-full max-w-[700px] space-y-6">
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
            >
              다음 단계로
            </button>
          </FadeInUp>
        </div>
      </form>
    </FormProvider>
  );
}
