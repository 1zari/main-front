"use client";
import { useState } from "react";
import SignupStepOneForm from "@/features/auth-common/ui/signup/CommonSignupStepOneForm";
import { SignupFormValues } from "@/features/auth-common/model/validation";
import SignupStepTwoCompany, { CompanyStepTwoValues } from "./CompanySignupStepTwoForm";

export default function SignupFormCompany() {
  const [step, setStep] = useState<1 | 2>(1);
  const [stepOneData, setStepOneData] = useState<SignupFormValues | null>(null);

  return (
    <div className="flex justify-center items-center flex-1">
      <div className="bg-white rounded-xl shadow-md px-10 py-[100px] w-full max-w-[1000px]">
      {step === 1 ? (
        <SignupStepOneForm
          onNext={(data) => {
            setStepOneData(data);
            setStep(2);
          }}
          userType="company"
        />
      ) : (
        <SignupStepTwoCompany
          onSubmit={(data: CompanyStepTwoValues) => {
            const payload = { ...stepOneData, ...data };
            console.log("기업회원가입 최종 payload:", payload);
          }}
        />
    )}
    </div>
  </div>
  );
}
