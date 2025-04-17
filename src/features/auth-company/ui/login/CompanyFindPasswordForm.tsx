"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  findCompanyPasswordSchema,
  FindCompanyPasswordFormValues,
} from "@/features/auth-company/validation/company-auth.schema";
import FindPasswordBaseForm from "@/features/auth-common/ui/baseForms/FindPasswordBaseForm";

export default function CompanyFindPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [step, setStep] = useState<"input" | "complete">("input");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FindCompanyPasswordFormValues>({
    resolver: zodResolver(findCompanyPasswordSchema),
    mode: "onBlur",
  });

  const MOCK_USER = {
    email: "manager@seniorMyJob.com",
    phone: "010-1234-5678",
    code: "658745",
  };

  const handleVerifyCode = () => {
    const phone = watch("phone");
    const code = watch("code");
    if (phone === MOCK_USER.phone && code === MOCK_USER.code) {
      setIsVerified(true);
    } else {
      alert("인증번호가 올바르지 않거나 전화번호가 일치하지 않습니다.");
    }
  };

  const handlePasswordChange = () => {
    const email = watch("email");
    const phone = watch("phone");
    if (email === MOCK_USER.email && phone === MOCK_USER.phone) {
      setStep("complete");
    } else {
      alert("입력하신 정보가 정확하지 않습니다.");
    }
  };

  return (
    <FindPasswordBaseForm
      type="company"
      step={step}
      isVerified={isVerified}
      showPassword={showPassword}
      register={register}
      errors={errors}
      onVerifyCode={handleVerifyCode}
      onSubmit={handleSubmit(handlePasswordChange)}
      onTogglePassword={() => setShowPassword(!showPassword)}
    />
  );
}
