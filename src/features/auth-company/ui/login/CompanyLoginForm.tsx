"use client";

import { useRouter } from "next/navigation";
import LoginBaseForm from "@/features/auth-common/ui/login/LoginBaseForm";

export default function CompanyLoginForm() {
  const router = useRouter();

  return (
    <LoginBaseForm
      role="employer"
      onEmailFind={() => router.push("/auth/company/find-email")}
      onPasswordFind={() => router.push("/auth/company/find-password")}
      onSignup={() => router.push("/auth/company/signup")}
      showSocialLogin={false}
      showEmailDomainSelect={false}
    />
  );
}
