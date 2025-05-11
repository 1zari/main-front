"use client";

import { jobPostApi } from "@/api/job";
import { Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ScrapBtn({
  showLabel = false,
  initialIsBookmarked = false,
  jobPostingId,
}: {
  showLabel?: boolean;
  initialIsBookmarked?: boolean;
  jobPostingId?: string;
}) {
  const params = useParams();
  const resolvedJobPostingId = jobPostingId || (params?.id as string | undefined);
  const [isSaved, setIsSaved] = useState(initialIsBookmarked);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchIsSaved = async () => {
      try {
        const res = await jobPostApi.getJobPostDetail(resolvedJobPostingId as string);
        setIsSaved(res.job_posting.is_bookmarked);
      } catch (error) {
        console.error("북마크 상태를 불러오는데 실패했습니다:", error);
      }
    };

    if (resolvedJobPostingId) {
      fetchIsSaved();
    } else {
      setIsSaved(initialIsBookmarked);
    }
  }, [resolvedJobPostingId, initialIsBookmarked]);

  const handleClick = async () => {
    const prev = isSaved;
    setIsSaved(!prev);

    try {
      if (prev) {
        await jobPostApi.removeBookmark(resolvedJobPostingId as string);
      } else {
        await jobPostApi.addBookmark(resolvedJobPostingId as string);
      }
    } catch (err) {
      setIsSaved(prev);
      alert("저장에 실패했어요.");
    }
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
