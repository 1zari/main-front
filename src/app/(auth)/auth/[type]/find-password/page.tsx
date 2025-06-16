"use client";

import CompanyFindPasswordForm from "@/features/auth-company/ui/login/CompanyFindPasswordForm";
import UserFindPasswordForm from "@/features/auth-user/ui/login/UserFindPasswordForm";
import { useParams } from "next/navigation";

export default function FindPasswordPage() {
  const params = useParams();
  const type = params.type as "normal" | "company";

  if (type !== "normal" && type !== "company") {
    return null; // 또는 에러 페이지 컴포넌트
  }

  return <>{type === "normal" ? <UserFindPasswordForm /> : <CompanyFindPasswordForm />}</>;
}
