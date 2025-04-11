"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function InnerAuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <nav className="flex items-center p-4 bg-white shadow-md">
        <button
          onClick={() => router.push(from || "/")}
          className="text-blue-600 hover:underline"
        >
          ← 뒤로가기
        </button>
      </nav>
      <div className="flex-1 flex items-center justify-center">{children}</div>
    </main>
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <InnerAuthLayout>{children}</InnerAuthLayout>
    </Suspense>
  );
}
