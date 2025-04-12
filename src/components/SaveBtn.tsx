"use client";

import { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function SaveBtn() {
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

  if (!mounted) return null;

  return (
    <button
      className="rounded-full p-2 text-xl cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-primary/70"
      onClick={handleClick}
    >
      {isSaved ? <FaStar className="text-primary" /> : <FaRegStar />}
    </button>
  );
}
