"use client";

import { useRouter } from "next/navigation";
import LoginBaseForm from "@/features/auth-common/ui/login/LoginBaseForm";
import { AUTH_ROUTES } from "@/features/auth-common/model/constants/auth";

export default function CompanyLoginForm() {
  const router = useRouter();

  return (
    <LoginBaseForm
      role="employer"
      onEmailFind={() => router.push(AUTH_ROUTES.company.emailFind)}
      onPasswordFind={() => router.push(AUTH_ROUTES.company.passwordFind)}
      onSignup={() => router.push(AUTH_ROUTES.company.signup)}
      showSocialLogin={false}
      showEmailDomainSelect={false}
    />
  );
}
