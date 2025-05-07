"use client";
import { useParams } from "next/navigation";
import CompanyInformationEdit from "@/features/mypage/company/ui/edit/CompanyInformationEdit";
import UserInformationEdit from "@/features/mypage/user/ui/edit/UserInformationEdit";
import { useSession } from "next-auth/react";

const VALID_TYPES = ["normal", "company"] as const;

export default function InformationEditPage() {
  const params = useParams();
  const { data: session, status } = useSession();
  const type = params?.type as string;
  const userId = params?.userId as string;

  if (!VALID_TYPES.includes(type as "normal" | "company")) {
    return <p className="text-center text-red-500">잘못된 접근입니다. (type 오류)</p>;
  }

  if (status === "loading") {
    return <div className="text-center">로딩 중...</div>;
  }
  if (!session || !session.user) {
    return <p className="text-center text-red-500">로그인이 필요합니다.</p>;
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
      {role === "company" && <CompanyInformationEdit defaultValues={session.user} />}
      {role === "normal" && <UserInformationEdit defaultValues={session.user} />}
    </>
  );
}
