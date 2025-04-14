"use client";
import { Suspense } from "react";
import CompanySignup from "@/features/auth-company/ui/signup/CompanySignup";

export default function CompanySignupPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <CompanySignup />
    </Suspense>
  );
}
