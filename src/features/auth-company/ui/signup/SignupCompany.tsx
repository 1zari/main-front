'use client';

import { useState } from 'react';
import SignupStepOneForm, { SignupFormValues } from '@/features/auth-common/ui/signup/SignupCommonStepOneForm';
import SignupStepTwoCompany, { CompanyStepTwoValues } from './SignupCompanyStepTwoForm';

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
