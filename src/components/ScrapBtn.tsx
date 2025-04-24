"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export default function ScrapBtn({ showLabel = false }: { showLabel?: boolean }) {
  const [isSaved, setIsSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = async () => {
    const prev = isSaved;
    setIsSaved(!prev);

    // try {
    //   //API 준비되면 아래 코드 수정필요
    //   await axios.post("/api/save", { method: "POST" });
    // } catch (err) {
    //   setIsSaved(prev);
    //   alert("저장에 실패했어요.");
    // }
  };

  const label = isSaved ? "저장 취소" : "저장하기";

  if (!mounted) return null;

  return (
    <>
      {showLabel ? (
        <button
          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
          onClick={handleClick}
        >
          <Star className={`w-5 h-5 ${isSaved ? "fill-current text-primary" : "text-gray-400"}`} />
          <span>{label}</span>
        </button>
      ) : (
        <button
          className="p-2 text-xl transition-transform duration-200 cursor-pointer hover:scale-110 hover:text-primary/70"
          onClick={handleClick}
          aria-label={label}
        >
          <Star className={`w-6 h-6 ${isSaved ? "fill-current text-primary" : "text-gray-400"}`} />
        </button>
      )}
    </>
  );
}
