import React, { useMemo } from "react";
import ProfileCard from "./ProfileCard";
import UserProfileTabs from "./UserProfileTabs";
import { Heading } from "@/components/ui/Heading";
import { formatBirthDate } from "@/utils/format";
import { UserProfile as UserProfileType } from "@/types/user";
import type { Resume } from "@/types/resume";
import type { UserProfileItem } from "@/types/user";

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

  // 이력서 더미 데이터
  const dummyResumes: Resume[] = [
    {
      resume_id: "1",
      user_id: "123",
      resume_title: "신입 바리스타 지원합니다",
      job_category: "바리스타",
      education: "고등학교 졸업",
      introduce: "열정적인 바리스타가 되고 싶습니다.",
      created_at: "2024-01-15T09:00:00.000Z",
      updated_at: "2024-01-15T09:00:00.000Z",
    },
    {
      resume_id: "2",
      user_id: "123",
      resume_title: "제과제빵 경력 2년",
      job_category: "제과제빵",
      education: "제과제빵 전문학교",
      introduce: "맛있는 빵을 만들고 싶습니다.",
      created_at: "2024-02-01T09:00:00.000Z",
      updated_at: "2024-02-10T15:00:00.000Z",
    },
    {
      resume_id: "3",
      user_id: "123",
      resume_title: "성실한 직원이 되겠습니다",
      job_category: "패스트푸드점",
      education: "대학교 재학",
      introduce: "책임감 있게 일하겠습니다.",
      created_at: "2024-03-01T09:00:00.000Z",
      updated_at: "2024-03-01T09:00:00.000Z",
    },
    {
      resume_id: "4",
      user_id: "123",
      resume_title: "성실한 직원이 되겠습니다",
      job_category: "패스트푸드점",
      education: "대학교 재학",
      introduce: "책임감 있게 일하겠습니다.",
      created_at: "2024-03-01T09:00:00.000Z",
      updated_at: "2024-03-01T09:00:00.000Z",
    },
    // {
    //   resume_id: "5",
    //   user_id: "123",
    //   resume_title: "제과제빵 경력 2년",
    //   job_category: "제과제빵",
    //   education: "제과제빵 전문학교",
    //   introduce: "맛있는 빵을 만들고 싶습니다.",
    //   created_at: "2024-03-01T09:00:00.000Z",
    //   updated_at: "2024-03-01T09:00:00.000Z",
    // },
  ];

  const { name, phone_number, birthday, interest } = userProfileData;

  const profileItems: UserProfileItem[] = useMemo(
    () => [
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
      <UserProfileTabs resumes={dummyResumes} appliedJobs={null} savedJobs={null} />
    </div>
  );
}
