"use client";

import { Suspense } from "react";
import CompanyLoginForm from "@/features/auth-company/ui/login/CompanyLoginForm";

export default function CompanyLoginPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <CompanyLoginForm />
    </Suspense>
  );
}
