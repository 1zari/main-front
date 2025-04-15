"use client";

import LoginBaseForm from "@/features/auth-common/ui/login/LoginBaseForm";
import { useLoginConfig } from "@/features/auth-common/hooks/useLoginConfig";

export default function CompanyLoginForm() {
  const loginConfig = useLoginConfig("company");
  return <LoginBaseForm {...loginConfig} />;
}
