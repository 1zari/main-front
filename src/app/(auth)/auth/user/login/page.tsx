"use client";

import { Suspense } from "react";
import UserLoginForm from "@/features/auth-user/ui/login/UserLoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <UserLoginForm />
    </Suspense>
  );
}
