"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  findCompanyEmailSchema,
  FindCompanyEmailFormValues,
} from "@/features/auth-company/model/validation/company-auth.schema";
import FindEmailBaseForm from "@/features/auth-common/ui/baseForms/FindEmailBaseForm";

export default function CompanyFindEmailForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FindCompanyEmailFormValues>({
    resolver: zodResolver(findCompanyEmailSchema),
    mode: "onBlur",
  });

  const companyName = watch("companyName");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"input" | "verified">("input");
  const [isVerified, setIsVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleFindEmail = (data: FindCompanyEmailFormValues) => {
    if (
      data.companyName === "시니어내일" &&
      data.businessNumber === "1234567890" &&
      data.phone === "010-1234-5678" &&
      data.code === "658745"
    ) {
      setEmail("manager@seniorMyJob.com");
      setStep("verified");
    } else {
      alert("입력하신 정보가 정확하지 않거나 인증에 실패했습니다.");
    }
  };

  const handleVerifyCode = () => {
    const code = watch("code");
    if (code === "658745") {
      setIsVerified(true);
      setVerificationMessage({ type: "success", text: "인증번호가 확인되었습니다." });
    } else {
      setVerificationMessage({ type: "error", text: "인증번호가 올바르지 않습니다." });
    }
  };

  return (
    <FindEmailBaseForm
      type="company"
      email={email}
      name={companyName}
      step={step}
      isVerified={isVerified}
      verificationMessage={verificationMessage}
      register={register}
      errors={errors}
      onVerifyCode={handleVerifyCode}
      onSubmit={handleSubmit(handleFindEmail)}
    />
  );
}
