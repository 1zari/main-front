"use client";

import LoginBaseForm from "@/features/auth-common/ui/baseForms/LoginBaseForm";
import { useLoginConfig } from "@/features/auth-common/hooks/useLoginConfig";

export default function UserLoginForm() {
  const loginConfig = useLoginConfig("user");
  return <LoginBaseForm {...loginConfig} />;
}
