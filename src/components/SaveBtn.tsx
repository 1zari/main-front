"use client";

import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function SaveBtn({ showLabel = false }: { showLabel?: boolean }) {
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
          {isSaved ? <FaStar className="text-primary" /> : <FaRegStar />}
          <span>{label}</span>
        </button>
      ) : (
        <button
          className="p-2 text-xl cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-primary/70"
          onClick={handleClick}
          aria-label={label}
        >
          {isSaved ? <FaStar className="text-primary" /> : <FaRegStar />}
        </button>
      )}
    </>
  );
}
