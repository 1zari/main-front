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

  const handleVerifyCode = () => {
    // 인증번호 검증 로직 - 임시로 항상 성공으로 처리
    setIsVerified(true);
  };

  const handlePasswordChange = () => {
    const businessNumber = watch("businessNumber");
    const managerEmail = watch("managerEmail");
    if (businessNumber && managerEmail) {
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
      register={register as never}
      errors={errors}
      onVerifyCode={handleVerifyCode}
      onSubmit={handleSubmit(handlePasswordChange)}
      onTogglePassword={() => setShowPassword(!showPassword)}
    />
  );
}
