"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import UserProfile from "@/features/mypage/common/components/profile/UserProfile";
import EmployerProfile from "@/features/mypage/common/components/profile/EmployerProfile";

type UserType = "user" | "company";

export default function MyPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;
  const type = params.type as string;

  // 실제로는 여기서 API를 통해 현재 로그인한 사용자의 정보를 가져와야 합니다
  const currentUser = {
    id: "123", // 실제로는 로그인한 사용자의 ID
    type: type as UserType, // 테스트를 위해 URL의 type을 사용
  };

  useEffect(() => {
    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    if (!currentUser) {
      router.push("/auth/login");
      return;
    }

    // URL의 type이 user나 company가 아닌 경우 404
    if (!["user", "company"].includes(type)) {
      notFound();
      return;
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
      <div className="flex justify-center items-start mt-12">
        <div className="w-full">{type === "company" ? <EmployerProfile /> : <UserProfile />}</div>
      </div>
    </div>
  );
}
