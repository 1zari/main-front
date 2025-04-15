"use client";

import { useRouter } from "next/navigation";
import LoginBaseForm from "@/features/auth-common/ui/login/LoginBaseForm";
import { AUTH_ROUTES } from "@/features/auth-common/model/constants/auth.config";

export default function UserLoginForm() {
  const router = useRouter();

  return (
    <LoginBaseForm
      role="user"
      onEmailFind={() => router.push(AUTH_ROUTES.user.emailFind)}
      onPasswordFind={() => router.push(AUTH_ROUTES.user.passwordFind)}
      onSignup={() => router.push(AUTH_ROUTES.user.signup)}
      showSocialLogin={true}
      showEmailDomainSelect={true}
    />
  );
}
