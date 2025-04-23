"use client";
// app/jobs/page.tsx
import { useEffect } from "react";

export default function VoiceTest() {
  const keywordList =
    typeof window !== "undefined"
      ? (new URLSearchParams(window.location.search).get("keywords")?.split(",") ?? [])
      : [];

  useEffect(() => {
    if (keywordList.length > 0) {
      console.log("음성으로 전달된 키워드:", keywordList);
      // TODO: 이걸 기반으로 API 요청 or 필터 상태 업데이트
    }
  }, [keywordList]);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">채용 공고 목록</h1>
      {/* 여기에 keywordList 기반으로 필터된 채용 목록 보여주기 */}
    </main>
  );
}
