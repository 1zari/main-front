"use client";

import { Suspense } from "react";
import LoginForm from "@/features/auth-user/ui/LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <LoginForm />
    </Suspense>
  );
}
