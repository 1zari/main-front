"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  findCompanyEmailSchema,
  FindCompanyEmailFormValues,
} from "@/features/auth-company/model/validation/company-auth.schema";
import FindEmailBaseForm from "@/features/auth-common/ui/baseForms/FindEmailBaseForm";
import { FindStep } from "@/features/auth-common/types/auth";
import { useVerification } from "@/features/auth-common/hooks/useVerification";
import { AUTH_MESSAGES } from "@/features/auth-common/constants/messages";

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
  const { isVerified, verificationMessage, handleVerification } = useVerification();
  const [step, setStep] = useState<FindStep>("input");
  const [email, setEmail] = useState("");

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
      alert(AUTH_MESSAGES.findEmail.notFound);
    }
  };

  const handleVerifyCode = () => {
    const code = watch("code");
    handleVerification(code === "658745");
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
