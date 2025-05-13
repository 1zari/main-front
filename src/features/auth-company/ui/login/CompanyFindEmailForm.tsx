"use client";

import { MOCK_COMPANY } from "@/features/auth-common/mock/auth.mock";
import FindEmailBaseForm from "@/features/auth-common/ui/baseForms/FindEmailBaseForm";
import {
  FindCompanyEmailFormValues,
  findCompanyEmailSchema,
} from "@/features/auth-company/validation/company-auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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

  const [isVerified, setIsVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [step, setStep] = useState<"input" | "verified">("input");
  const [email, setEmail] = useState("");
  // const companyName = watch("companyName");

  // 컴포넌트 언마운트 시 상태 초기화
  useEffect(() => {
    return () => {
      setIsVerified(false);
      setVerificationMessage(null);
      setStep("input");
      setEmail("");
    };
  }, []);

  const handleVerifyCode = () => {
    // const code = watch("code");
    const code = MOCK_COMPANY.code;
    if (code === MOCK_COMPANY.code) {
      setIsVerified(true);
      setVerificationMessage({ type: "success", text: "인증번호가 확인되었습니다." });
    } else {
      setVerificationMessage({ type: "error", text: "인증번호가 올바르지 않습니다." });
    }
  };

  const handleFindEmail = () => {
    // const companyName = watch("companyName");
    // const businessNumber = watch("businessNumber");
    // const phone = watch("phone");
    const companyName = MOCK_COMPANY.companyName;
    const businessNumber = MOCK_COMPANY.businessNumber;
    const phone = MOCK_COMPANY.phone;
    if (
      companyName === MOCK_COMPANY.companyName &&
      businessNumber === MOCK_COMPANY.businessNumber &&
      phone === MOCK_COMPANY.phone
    ) {
      setEmail(MOCK_COMPANY.email);
      setStep("verified");
    } else {
      alert("입력하신 정보로 등록된 이메일이 없습니다.");
    }
  };

  return (
    <FindEmailBaseForm
      type="company"
      email={email}
      name="companyName"
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
