"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import UserProfile from "@/features/mypage/common/components/profile/UserProfile";
import CompanyProfile from "@/features/mypage/common/components/profile/CompanyProfile";
import { useSession } from "next-auth/react";
import type { JoinType } from "@/types/commonUser";

export default function MyPage() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  const type = params.type as JoinType;

  // 세션에서 현재 로그인한 사용자 정보 사용
  const currentUser = session?.user
    ? {
        id: session.user.id,
        type: session.user.join_type,
      }
    : null;

  useEffect(() => {
    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    if (!currentUser) {
      router.push("/auth/login");
      return;
    }

    // URL의 type이 normal이나 company가 아닌 경우 404
    if (!["normal", "company", "admin"].includes(type)) {
      notFound();
    }

    // URL의 userId가 현재 로그인한 사용자의 ID와 다른 경우
    // 자신의 마이페이지로 리다이렉트
    if (userId !== currentUser.id) {
      router.replace(`/${currentUser.type}/mypage/${currentUser.id}`);
      return;
    }
  }, [type, userId, currentUser, router]);

  return (
    <div className="min-h-screen">
      <div className="flex items-start justify-center mt-12">
        <div className="w-full">{type === "company" ? <CompanyProfile /> : <UserProfile />}</div>
      </div>
    </div>
  );
}
