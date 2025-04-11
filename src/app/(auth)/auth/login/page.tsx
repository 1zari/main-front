"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginInner() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="text-2xl font-bold">
      로그인 페이지
      {error && <p className="text-red-500">에러: {error}</p>}
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <LoginInner />
    </Suspense>
  );
}
