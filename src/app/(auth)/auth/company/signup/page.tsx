'use client';

import { Suspense } from 'react';
import SignupCompany from '@/features/auth-company/ui/signup/SignupCompany';

export default function CompanySignupPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <div className="flex justify-center items-center flex-1">
        <div className="bg-gray-100 rounded-xl shadow-md px-10 py-[100px] w-full max-w-[1000px]">
          <SignupCompany />
        </div>
      </div>
    </Suspense>
  );
}
