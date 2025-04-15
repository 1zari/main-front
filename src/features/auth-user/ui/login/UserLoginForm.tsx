"use client";

import { useRouter } from "next/navigation";
import LoginBaseForm from "@/features/auth-common/ui/login/LoginBaseForm";

export default function UserLoginForm() {
  const router = useRouter();

  return (
    <LoginBaseForm
      role="user"
      onEmailFind={() => router.push("/auth/user/find-email")}
      onPasswordFind={() => router.push("/auth/user/find-password")}
      onSignup={() => router.push("/auth/user/signup")}
      showSocialLogin={true}
      showEmailDomainSelect={true}
    />
  );
}
