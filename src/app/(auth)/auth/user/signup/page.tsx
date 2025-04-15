"use client";
import { Suspense } from "react";
import UserSignup from "@/features/auth-user/ui/signup/UserSignup";

export default function UserSignupPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <UserSignup />
    </Suspense>
  );
}
