"use client";
import { API_ENDPOINTS } from "@/constants/apiEndPoints";
import CompanyInformationEdit from "@/features/mypage/company/ui/edit/CompanyInformationEdit";
import UserInformationEdit from "@/features/mypage/user/ui/edit/UserInformationEdit";
import { fetcher } from "@/lib/fetcher";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import useSWR from "swr";

const VALID_TYPES = ["normal", "company"] as const;

export default function InformationEditPage() {
  const params = useParams();
  const { data: session, status } = useSession();
  const type = params?.type as string;
  const userId = params?.userId as string;

  // 프로필 API 경로 분기
  const profileApi =
    type === "company" ? API_ENDPOINTS.COMPANY.PROFILE : API_ENDPOINTS.USER.PROFILE;
  const {
    data: profile,
    error: profileError,
    isLoading: profileLoading,
  } = useSWR(
    session && session.accessToken ? [profileApi, session.accessToken] : null,
    ([url, token]) =>
      fetcher.get(url, { secure: true, headers: { Authorization: `Bearer ${token}` } }),
  );

  if (!VALID_TYPES.includes(type as "normal" | "company")) {
    return <p className="text-center text-red-500">잘못된 접근입니다. (type 오류)</p>;
  }

  if (status === "loading" || profileLoading) {
    return <div className="text-center">로딩 중...</div>;
  }
  if (!session || !session.user) {
    return <p className="text-center text-red-500">로그인이 필요합니다.</p>;
  }
  if (profileError) {
    return <p className="text-center text-red-500">프로필 정보를 불러오는데 실패했습니다.</p>;
  }
  const role = session.user.join_type;

  if (type !== role) {
    return <p className="text-center text-red-500">접근 권한이 없습니다. (role mismatch)</p>;
  }

  if (userId !== session.user.id) {
    return <p className="text-center text-red-500">잘못된 접근입니다. (userId mismatch)</p>;
  }

  return (
    <>
      {role === "company" && profile && <CompanyInformationEdit defaultValues={profile} />}
      {role === "normal" && profile && <UserInformationEdit defaultValues={profile} />}
    </>
  );
}
