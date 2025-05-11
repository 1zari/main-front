"use client";

import { useSearchJobs } from "@/features/jobs/hooks/useSearchJobs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchPage({ setIsOpen }: { setIsOpen: (value: boolean) => void }) {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const { search } = useSearchJobs();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await search(inputValue);
    router.push("/jobs/searched");
    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-4">검색 화면</h2>
      <div className="flex gap-2">
        <input
          type="text"
          name="keyword"
          placeholder="검색어를 입력하세요"
          className="flex-1 border px-3 py-2 rounded"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="px-3 bg-primary text-white rounded">
          검색
        </button>
      </div>
    </form>
  );
}
