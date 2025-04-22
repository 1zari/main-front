"use client";
import { Suspense } from "react";
import SignupEntryPage from "@/features/auth-common/ui/signup/SignupEntry";

export default function UserSignupPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SignupEntryPage />
    </Suspense>
  );
}
