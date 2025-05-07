"use client";

import React, { useMemo } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import ProfileCard from "./ProfileCard";
import type { CompanyProfileResponseDto } from "@/types/api/company";
import type { CompanyProfileItem } from "@/types/company";
import { API_ENDPOINTS } from "@/constants/apiEndPoints";
import { fetcher } from "@/lib/fetcher";

const fetchCompanyProfile = async (url: string, accessToken?: string) => {
  try {
    console.log("Fetching company profile from:", url);
    console.log("Access token:", accessToken);

    const response = await fetcher.get<CompanyProfileResponseDto>(url, {
      secure: true,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    });
    console.log("Company profile response:", response);
    return response;
  } catch (error) {
    console.error("Error fetching company profile:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    });
    throw error;
  }
};

export default function CompanyProfile() {
  const { data: session } = useSession();
  console.log("Current session:", session);

  const { data: companyProfileData, error } = useSWR(
    session ? [API_ENDPOINTS.COMPANY.PROFILE, session.accessToken] : null,
    ([url, token]) => fetchCompanyProfile(url, token),
    {
      onError: (err) => {
        console.error("SWR error:", err);
      },
    },
  );

  if (error) {
    console.error("Profile error state:", error);
    return (
      <div className="text-center text-red-500">
        프로필을 불러오는데 실패했습니다.
        <br />
        {error.message || "알 수 없는 오류가 발생했습니다."}
      </div>
    );
  }

  if (!companyProfileData) {
    return <div className="text-center">프로필을 불러오는 중...</div>;
  }

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
      <ProfileCard role="company" userId={companyProfileData.common_user_id} title={company_name}>
        {profileItems.map((item, idx) => (
          <ProfileCard.Item key={idx}>
            <ProfileCard.Label>{item.labels.join(" ")}</ProfileCard.Label>
            <ProfileCard.Value isDescription={item.isDescription}>{item.value}</ProfileCard.Value>
          </ProfileCard.Item>
        ))}
      </ProfileCard>
    </div>
  );
}
