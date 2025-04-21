import React from "react";
import ProfileCard from "./ProfileCard";
import { Heading } from "@/components/ui/Heading";

interface EmployerProfileProps {}

export default function EmployerProfile(props: EmployerProfileProps) {
  // 기업회원 더미 데이터
  const companyProfileData = {
    companyName: "예시 기업",
    managerName: "김담당",
    managerPhone: "010-9876-5432",
    managerEmail: "kim@example.com",
    companyDescription: "우리 회사는 혁신적인 기술 솔루션을 제공하는 기업입니다.",
  };

  const { companyName, managerName, managerPhone, managerEmail, companyDescription } =
    companyProfileData;

  return (
    <div>
      <ProfileCard role="company" title={companyName}>
        <div className="space-y-5">
          <div className="flex items-center py-3 hover:bg-white/80 transition-colors rounded-lg px-4 group">
            <span className="min-w-32 text-gray-500 font-medium flex flex-wrap items-center gap-1 mr-8">
              <Heading sizeOffset={2} className="inline-block">
                담당자
              </Heading>
              <Heading sizeOffset={2} className="inline-block">
                성함
              </Heading>
            </span>
            <Heading sizeOffset={2} className="flex-1 text-gray-900 font-normal">
              {managerName}
            </Heading>
          </div>
          <div className="flex items-center py-3 hover:bg-white/80 transition-colors rounded-lg px-4 group">
            <span className="min-w-32 text-gray-500 font-medium flex flex-wrap items-center gap-1 mr-8">
              <Heading sizeOffset={2} className="inline-block">
                담당자
              </Heading>
              <Heading sizeOffset={2} className="inline-block">
                전화번호
              </Heading>
            </span>
            <Heading sizeOffset={2} className="flex-1 text-gray-900 font-normal">
              {managerPhone}
            </Heading>
          </div>
          <div className="flex items-center py-3 hover:bg-white/80 transition-colors rounded-lg px-4 group">
            <span className="min-w-32 text-gray-500 font-medium flex flex-wrap items-center gap-1 mr-8">
              <Heading sizeOffset={2} className="inline-block">
                담당자
              </Heading>
              <Heading sizeOffset={2} className="inline-block">
                이메일
              </Heading>
            </span>
            <Heading sizeOffset={2} className="flex-1 text-gray-900 font-normal">
              {managerEmail}
            </Heading>
          </div>
          <div className="flex items-center py-3 hover:bg-white/80 transition-colors rounded-lg px-4 group">
            <span className="min-w-32 text-gray-500 font-medium flex flex-wrap items-center gap-1 mr-8">
              <Heading sizeOffset={2} className="inline-block">
                기업
              </Heading>
              <Heading sizeOffset={2} className="inline-block">
                소개
              </Heading>
            </span>
            <Heading
              sizeOffset={2}
              className="flex-1 text-gray-900 font-normal whitespace-pre-wrap leading-relaxed"
            >
              {companyDescription}
            </Heading>
          </div>
        </div>
      </ProfileCard>
    </div>
  );
}
