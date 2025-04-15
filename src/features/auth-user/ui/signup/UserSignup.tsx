"use client";
import { useState } from "react";
import SignupStepOneForm from "@/features/auth-common/ui/signup/CommonSignupStepOneForm";
import SignupStepTwoUser, { UserStepTwoValues } from "@/features/auth-user/ui/signup/UserSignupStepTwoForm";
import { SignupFormValues } from "@/features/auth-common/model/validation";

export default function UserSignup() {
  const [step, setStep] = useState<1 | 2>(1);
  const [stepOneData, setStepOneData] = useState<SignupFormValues | null>(null);

  return (
    <div className="flex justify-center items-center flex-1">
      <div className="bg-white rounded-xl shadow-md px-10 py-[100px] w-full max-w-[1000px]">
        {step === 1 ? (
          <SignupStepOneForm onNext={(data) => {
            setStepOneData(data);
            setStep(2);
        }}
        userType="user" 
        />
      ) : (
        <SignupStepTwoUser onSubmit={(data: UserStepTwoValues) => {
            const payload = { ...stepOneData, ...data };
            console.log("유저회원가입 최종 payload:", payload);
          }} 
        />
      )}
      </div>
  </div>
  );
}
