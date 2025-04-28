"use client";
import { useState } from "react";
import { formatDate } from "@/utils/format";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/features/mypage/common/components/ui/Button";
import { Textarea } from "@/features/mypage/common/components/ui/Textarea";
import { cn } from "@/utils/cn";
import { Star, BookmarkPlus } from "lucide-react";

export interface AppliedJob {
  id: string;
  company: string;
  location: string;
  title: string;
  summary: string;
  deadline: string;
  appliedAt: string;
}

interface AppliedJobListProps {
  jobs: AppliedJob[];
}

export default function AppliedJobList({ jobs }: AppliedJobListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [memos, setMemos] = useState<Record<string, string>>({});
  const [tempMemo, setTempMemo] = useState("");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const handleStartEdit = (id: string) => {
    setEditingId(id);
    setTempMemo(memos[id] || "");
  };

  const handleCancel = () => {
    setEditingId(null);
    setTempMemo("");
  };

  const handleSave = (id: string) => {
    setMemos((prev) => ({ ...prev, [id]: tempMemo }));
    setEditingId(null);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 mb-6 text-gray-300">
          <BookmarkPlus className="w-16 h-16" />
        </div>

        <p className="text-lg font-semibold text-gray-900 mb-2">지원한 공고가 없습니다</p>
        <p className="text-gray-500 mb-6">간편 이력서로 지원해 보세요!</p>

        <Button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90">
          채용공고 보러가기 →
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-8 pb-12">
      <Heading sizeOffset={2} className="font-semibold text-2xl">
        내가 지원한 공고 ({jobs.length}건)
      </Heading>

      {jobs.map((job) => {
        const isFavorite = favorites[job.id];

        return (
          <div
            key={job.id}
            className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden px-6 py-6 space-y-4"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-7">
              <div className="w-full lg:w-[220px] shrink-0 flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full shrink-0" />
                <div className="flex flex-col justify-center">
                  <span className="text-base font-semibold text-gray-900">{job.company}</span>
                  <span className="text-sm text-gray-500">{job.location}</span>
                </div>
              </div>

              <div className="flex flex-col flex-1 gap-1 mb-6">
                <div className="flex justify-between items-start">
                  <div className="bg-lime-500 text-white px-3 py-1 mb-2 rounded-full">
                    {formatDate(job.deadline)} 마감
                  </div>
                  <button onClick={() => toggleFavorite(job.id)} aria-label="즐겨찾기 토글">
                    <Star
                      className={cn(
                        "w-5 h-5",
                        isFavorite ? "text-primary fill-primary" : "text-gray-300",
                      )}
                    />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-900 ml-2">{job.title}</h2>
                <p className="text-gray-700 ml-2">{job.summary}</p>
              </div>
            </div>

            <div className="bg-primary text-white flex items-center justify-between px-6 py-3 rounded-xl">
              <span className="font-semibold">
                지원일자 <span className="ml-2">{formatDate(job.appliedAt)}</span>
              </span>
              {editingId !== job.id && (
                <Button
                  variant="outline"
                  className={cn(
                    "text-primary bg-white hover:bg-gray-100 border-white rounded-md px-4 py-1.5",
                    memos[job.id] && "border-primary text-primary",
                  )}
                  onClick={() => handleStartEdit(job.id)}
                >
                  {memos[job.id] ? "메모수정" : "메모하기"}
                </Button>
              )}
            </div>

            {editingId === job.id ? (
              <div className="bg-white rounded-xl px-5 py-4 mt-2">
                <Textarea
                  className="resize-none min-h-[100px]"
                  value={tempMemo}
                  onChange={(e) => setTempMemo(e.target.value)}
                  placeholder="메모를 작성해주세요. (최대 50자까지)"
                  maxLength={50}
                />
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="ghost"
                    className="bg-gray-300 text-white hover:bg-gray-400"
                    onClick={handleCancel}
                  >
                    취소
                  </Button>
                  <Button
                    className="bg-primary text-white hover:bg-primary/90"
                    onClick={() => handleSave(job.id)}
                  >
                    작성 완료
                  </Button>
                </div>
              </div>
            ) : (
              memos[job.id] && (
                <div className="bg-white rounded-lg px-1 py-3">
                  <span className="inline-block pt-1 pb-1 pr-4 pl-4 mb-1 text-primary border rounded-lg border-primary">
                    작성한 메모
                  </span>
                  <p className="text-gray-900 whitespace-pre-line pl-4 pt-2">{memos[job.id]}</p>
                </div>
              )
            )}
          </div>
        );
      })}
    </div>
  );
}
