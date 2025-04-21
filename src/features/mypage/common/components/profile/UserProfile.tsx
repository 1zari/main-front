import React from "react";
import ProfileCard from "./ProfileCard";
import UserProfileTabs from "../tabs/UserProfileTabs";
import { Heading } from "@/components/ui/Heading";

interface UserProfileProps {}

export default function UserProfile(props: UserProfileProps) {
  // 개인회원 더미 데이터
  const userProfileData = {
    name: "홍길동",
    email: "hong@example.com",
    phone: "010-1234-5678",
    birthDate: "1990-01-01",
    interests: ["바리스타", "제과제빵", "패스트푸드점"],
  };

  const { name, email, phone, birthDate, interests } = userProfileData;

  return (
    <div>
      <ProfileCard role="user" title={name}>
        <div className="space-y-5">
          <div className="flex items-center py-3 hover:bg-white/80 transition-colors rounded-lg px-4 group">
            <span className="w-32 text-gray-500 font-medium flex flex-wrap items-center gap-1">
              <Heading sizeOffset={2} className="inline-block">
                이메일
              </Heading>
            </span>
            <Heading sizeOffset={2} className="flex-1 text-gray-900 font-normal">
              {email}
            </Heading>
          </div>
          <div className="flex items-center py-3 hover:bg-white/80 transition-colors rounded-lg px-4 group">
            <span className="w-32 text-gray-500 font-medium flex flex-wrap items-center gap-1">
              <Heading sizeOffset={2} className="inline-block">
                전화번호
              </Heading>
            </span>
            <Heading sizeOffset={2} className="flex-1 text-gray-900 font-normal">
              {phone}
            </Heading>
          </div>
          <div className="flex items-center py-3 hover:bg-white/80 transition-colors rounded-lg px-4 group">
            <span className="w-32 text-gray-500 font-medium flex flex-wrap items-center gap-1">
              <Heading sizeOffset={2} className="inline-block">
                생년월일
              </Heading>
            </span>
            <Heading sizeOffset={2} className="flex-1 text-gray-900 font-normal">
              {birthDate}
            </Heading>
          </div>
          <div className="flex items-start py-3 hover:bg-white/80 transition-colors rounded-lg px-4 group">
            <span className="w-32 text-gray-500 font-medium flex flex-wrap items-center gap-1">
              <Heading sizeOffset={2} className="inline-block">
                관심분야
              </Heading>
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <Heading
                    key={index}
                    sizeOffset={2}
                    className="bg-primary/5 text-primary px-3 py-1.5 rounded-full font-medium hover:bg-primary/10 transition-colors"
                  >
                    {interest}
                  </Heading>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ProfileCard>

      <UserProfileTabs
        resumes={
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">내 이력서 목록</h3>
            <p className="text-gray-500">아직 작성된 이력서가 없습니다.</p>
          </div>
        }
        appliedJobs={
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">지원한 공고 목록</h3>
            <p className="text-gray-500">아직 지원한 공고가 없습니다.</p>
          </div>
        }
        savedJobs={
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">저장한 공고 목록</h3>
            <p className="text-gray-500">아직 저장한 공고가 없습니다.</p>
          </div>
        }
      />
    </div>
  );
}
