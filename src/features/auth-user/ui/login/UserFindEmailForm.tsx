"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  findUserEmailSchema,
  FindUserEmailFormValues,
} from "@/features/auth-user/validation/user-auth.schema";
import FindEmailBaseForm from "@/features/auth-common/ui/baseForms/FindEmailBaseForm";
import { MOCK_USER } from "@/features/auth-common/mock/auth.mock";

export default function UserFindEmailForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FindUserEmailFormValues>({
    resolver: zodResolver(findUserEmailSchema),
    mode: "onBlur",
  });

  const [isVerified, setIsVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [step, setStep] = useState<"input" | "verified">("input");
  const [email, setEmail] = useState("");
  const name = watch("name");

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
    const code = watch("code");
    if (code === MOCK_USER.code) {
      setIsVerified(true);
      setVerificationMessage({ type: "success", text: "인증번호가 확인되었습니다." });
    } else {
      setVerificationMessage({ type: "error", text: "인증번호가 올바르지 않습니다." });
    }
  };

  const handleFindEmail = () => {
    const name = watch("name");
    const phone = watch("phone");
    if (name === MOCK_USER.name && phone === MOCK_USER.phone) {
      setEmail(MOCK_USER.email);
      setStep("verified");
    } else {
      alert("입력하신 정보로 등록된 이메일이 없습니다.");
    }
  };

  return (
    <FindEmailBaseForm
      type="user"
      email={email}
      name={name}
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
