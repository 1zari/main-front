"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function BackButton() {
  const router = useRouter();

  const handleBack = useCallback(() => {
    if (typeof window !== "undefined" && window.history.state && window.history.state.idx > 0) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

  return (
    <button type="button" onClick={handleBack} className="px-4 py-2 rounded hover:bg-gray-300">
      ← 뒤로 가기
    </button>
  );
}
