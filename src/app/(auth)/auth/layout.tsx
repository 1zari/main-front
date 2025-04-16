"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import AuthLoading from "@/features/auth-common/ui/loading/AuthLoading";

function InnerAuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <nav className="flex items-center p-4 bg-white shadow-md">
        <button onClick={() => router.push(from || "/")} className="text-primary hover:underline">
          ← 뒤로가기
        </button>
      </nav>
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6">{children}</div>
    </main>
  );
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<AuthLoading />}>
      <InnerAuthLayout>{children}</InnerAuthLayout>
    </Suspense>
  );
}
