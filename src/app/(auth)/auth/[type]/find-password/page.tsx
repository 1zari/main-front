"use client";

import { useParams } from "next/navigation";
import UserFindPasswordForm from "@/features/auth-user/ui/login/UserFindPasswordForm";
import CompanyFindPasswordForm from "@/features/auth-company/ui/login/CompanyFindPasswordForm";

export default function FindPasswordPage() {
  const params = useParams();
  const type = params.type as "user" | "company";

  if (type !== "user" && type !== "company") {
    return null; // 또는 에러 페이지 컴포넌트
  }

  return <>{type === "user" ? <UserFindPasswordForm /> : <CompanyFindPasswordForm />}</>;
}
