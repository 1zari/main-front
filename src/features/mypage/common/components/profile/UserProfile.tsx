import React, { useMemo } from "react";
import ProfileCard, { ProfileItem } from "./ProfileCard";
import UserProfileTabs from "./UserProfileTabs";
import { Heading } from "@/components/ui/Heading";
import { UserProfile as UserProfileType } from "@/types/user";

interface UserProfileProps {}

export default function UserProfile(props: UserProfileProps) {
  // 개인회원 더미 데이터
  const userProfileData: UserProfileType = {
    userId: "123",
    name: "홍길동",
    phone_number: "010-1234-5678",
    birthday: "1990-01-01",
    interest: ["바리스타", "제과제빵", "패스트푸드점"],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { name, phone_number, birthday, interest } = userProfileData;

  const profileItems: ProfileItem[] = useMemo(
    () => [
      { labels: ["전화번호"], value: phone_number },
      { labels: ["생년월일"], value: birthday },
      {
        labels: ["관심분야"],
        value: interest?.length ? (
          <div className="flex flex-wrap gap-2">
            {interest.map((item, index) => (
              <Heading
                key={index}
                sizeOffset={2}
                className="bg-primary/5 text-primary px-3 py-1.5 rounded-full font-medium hover:bg-primary/10 transition-colors"
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
    ],
    [phone_number, birthday, interest],
  );

  return (
    <div>
      <ProfileCard role="user" title={name} items={profileItems} />
      <UserProfileTabs resumes={null} appliedJobs={null} savedJobs={null} />
    </div>
  );
}
