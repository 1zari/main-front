'use client';

import { useState } from 'react';
import SignupStepOneForm from '@/features/auth-common/ui/signup/CommonSignupStepOneForm';
import { SignupFormValues } from '@/features/auth-common/model/validation';
import SignupStepTwoCompany, { CompanyStepTwoValues } from './CompanySignupStepTwoForm';

export default function SignupFormCompany() {
  const [step, setStep] = useState<1 | 2>(1);
  const [stepOneData, setStepOneData] = useState<SignupFormValues | null>(null);

  return (
    <>
      {step === 1 ? (
        <SignupStepOneForm
          onNext={(data) => {
            setStepOneData(data);
            setStep(2);
          }}
        />
      ) : (
        <SignupStepTwoCompany
          onSubmit={(data: CompanyStepTwoValues) => {
            const payload = { ...stepOneData, ...data };
            console.log('최종 기업회원가입 payload:', payload);
          }}
        />
      )}
    </>
  );
}
