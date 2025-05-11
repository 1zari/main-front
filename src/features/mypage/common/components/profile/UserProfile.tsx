"use client";

import React, { useMemo } from "react";
import ProfileCard from "./ProfileCard";
import UserProfileTabs from "./UserProfileTabs";
import { Heading } from "@/components/ui/Heading";
import { formatBirthDate } from "@/utils/format";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/api/auth";

export default function UserProfile() {
  const { data: userProfileData, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => authApi.user.getProfile(),
  });

  // 프로필 아이템 구성
  const profileItems = useMemo(() => {
    if (!userProfileData) return [];

    const { phone_number, birthday, interest } = userProfileData;
    return [
      { labels: ["전화번호"], value: phone_number },
      { labels: ["생년월일"], value: formatBirthDate(birthday) },
      {
        labels: ["관심분야"],
        value: interest?.length ? (
          <div className="flex flex-wrap gap-2">
            {interest.map((item, index) => (
              <Heading
                key={index}
                sizeOffset={2}
                className="bg-primary/5 text-primary hover:bg-primary/10 rounded-full px-3 py-1.5 font-medium transition-colors"
              >
                {item}
              </Heading>
            ))}
          </div>
        ) : (
          "관심 분야를 선택하지 않았습니다."
        ),
        isCustom: true,
      },
    ];
  }, [userProfileData]);

  // 에러 상태 처리
  if (error) {
    return (
      <div className="text-center text-red-500">
        프로필을 불러오는데 실패했습니다.
        <br />
        {error.message || "알 수 없는 오류가 발생했습니다."}
      </div>
    );
  }

  // 로딩 상태 처리
  if (!userProfileData) {
    return <div className="text-center">프로필을 불러오는 중...</div>;
  }

  return (
    <div>
      <ProfileCard
        role="normal"
        userId={userProfileData.common_user_id}
        title={userProfileData.name}
      >
        {profileItems.map((item, idx) => (
          <ProfileCard.Item key={idx}>
            <ProfileCard.Label>{item.labels.join(" ")}</ProfileCard.Label>
            <ProfileCard.Value isDescription={item.isCustom}>{item.value}</ProfileCard.Value>
          </ProfileCard.Item>
        ))}
      </ProfileCard>
      <UserProfileTabs resumes={[]} />
    </div>
  );
}
