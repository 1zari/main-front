'use client';

import { Suspense, useState } from 'react';
import StepOneForm from './components/StepOneForm';
import StepTwoForm from './components/StepTwoForm';

function SignUpInner() {
  const [step, setStep] = useState<1 | 2>(1);

  return (
    <div className="flex justify-center items-center flex-1">
      <div className="bg-gray-100 rounded-xl shadow-md px-10 py-12 w-full max-w-[1000px]">
        {step === 1 ? <StepOneForm onNext={() => setStep(2)} /> : <StepTwoForm />}
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SignUpInner />
    </Suspense>
  );
}
