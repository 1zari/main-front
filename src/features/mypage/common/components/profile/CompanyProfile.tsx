import React, { useMemo } from "react";
import ProfileCard from "./ProfileCard";
import type { CompanyProfile as CompanyProfileType } from "@/types/company";
import type { CompanyProfileItem } from "@/types/company";

const CompanyProfile = () => {
  // 기업회원 더미 데이터
  const companyProfileData: CompanyProfileType = {
    companyId: "123",
    company_name: "예시 기업",
    manager_name: "김담당",
    manager_phone_number: "010-9876-5432",
    manager_email: "kim@example.com",
    company_introduction: "우리 회사는 혁신적인 기술 솔루션을 제공하는 기업입니다.",
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { company_name, manager_name, manager_phone_number, manager_email, company_introduction } =
    companyProfileData;

  const profileItems: CompanyProfileItem[] = useMemo(
    () => [
      { labels: ["담당자", "성함"], value: manager_name },
      { labels: ["담당자", "전화번호"], value: manager_phone_number },
      { labels: ["담당자", "이메일"], value: manager_email },
      { labels: ["기업", "소개"], value: company_introduction, isDescription: true },
    ],
    [manager_name, manager_phone_number, manager_email, company_introduction],
  );

  return (
    <div>
      <ProfileCard role="company" title={company_name} items={profileItems} />
    </div>
  );
};

export default React.memo(CompanyProfile);
