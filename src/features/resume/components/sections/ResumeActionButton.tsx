"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDeleteResume } from "@/features/resume/api/useDeleteResume";
import { useModalStore } from "@/store/useModalStore";
import Spinner from "@/components/common/Spinner";

type Props = {
  resumeId: string;
};

export default function ResumeActionButtons({ resumeId }: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { type, userId } = useParams() as { type: string; userId: string };
  const { deleteResume, isDeleting } = useDeleteResume();
  const { showModal } = useModalStore();

  if (status === "loading") {
    return (
      <div className="mt-10 flex justify-center w-full">
        <Spinner />
      </div>
    );
  }

  if (!session) {
    router.push("/auth/login");
    return null;
  }

  const handleEdit = () => {
    router.push(`/${type}/mypage/${userId}/resume/${resumeId}/edit`);
  };

  const handleDelete = () => {
    showModal({
      title: "이력서 삭제",
      message: "정말로 이 이력서를 삭제하시겠습니까?\n삭제된 이력서는 복구할 수 없습니다.",
      confirmText: "삭제",
      onConfirm: () => {
        const token = session.accessToken;
        if (!token) {
          alert("로그인이 필요합니다.");
          router.push("/auth/login");
          return;
        }

        deleteResume(resumeId, {
          onSuccess: () => {
            router.push(`/${type}/mypage/${userId}`);
          },
          onError: (err) => {
            alert(`삭제에 실패했습니다: ${err.message}`);
          },
        });
      },
    });
  };

  return (
    <div className="mt-10 flex gap-4 w-full">
      <button
        onClick={handleEdit}
        className="w-1/2 px-5 py-[18px] rounded-md bg-gray-400 text-white hover:bg-gray-500 transition"
      >
        수정하기
      </button>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`w-1/2 px-5 py-[18px] rounded-md bg-primary text-white hover:bg-primary/90 transition
          ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isDeleting ? "삭제 중..." : "삭제하기"}
      </button>
    </div>
  );
}
