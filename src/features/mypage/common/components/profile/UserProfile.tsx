"use client";

import { Heading } from "@/components/ui/Heading";
import { API_ENDPOINTS } from "@/constants/apiEndPoints";
import { fetcher } from "@/lib/fetcher";
import type { UserProfileResponseDto } from "@/types/api/user";
import { formatBirthDate } from "@/utils/format";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import useSWR from "swr";
import ProfileCard from "./ProfileCard";
import UserProfileTabs from "./UserProfileTabs";

// fetcher 함수를 컴포넌트 외부로 이동
const fetchUserProfile = async (url: string, accessToken?: string) => {
  try {
    const response = await fetcher.get<UserProfileResponseDto>(url, {
      secure: true,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export default function UserProfile() {
  const { data: session } = useSession();

  const { data: userProfileData, error } = useSWR(
    session ? [API_ENDPOINTS.USER.PROFILE, session.accessToken] : null,
    ([url, token]) => fetchUserProfile(url, token),
  );

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
      <UserProfileTabs />
    </div>
  );
}
