"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  findUserEmailSchema,
  FindUserEmailFormValues,
} from "@/features/auth-user/model/validation/user-auth.schema";
import FindEmailBaseForm from "@/features/auth-common/ui/baseForms/FindEmailBaseForm";
import { FindStep } from "@/features/auth-common/types/auth";
import { useVerification } from "@/features/auth-common/hooks/useVerification";
import { AUTH_MESSAGES } from "@/features/auth-common/constants/messages";

export default function UserFindEmailForm() {
  const MOCK_USER = {
    name: "홍길동",
    phone: "010-1234-1234",
    code: "123456",
    email: "honggildong@example.com",
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FindUserEmailFormValues>({
    resolver: zodResolver(findUserEmailSchema),
    mode: "onBlur",
  });

  const { isVerified, verificationMessage, handleVerification } = useVerification();
  const [step, setStep] = useState<FindStep>("input");
  const [email, setEmail] = useState("");
  const name = watch("name");

  const handleVerifyCode = () => {
    const code = watch("code");
    handleVerification(code === MOCK_USER.code);
  };

  const handleFindEmail = () => {
    const name = watch("name");
    const phone = watch("phone");
    if (name === MOCK_USER.name && phone === MOCK_USER.phone) {
      setEmail(MOCK_USER.email);
      setStep("verified");
    } else {
      alert(AUTH_MESSAGES.findEmail.notFound);
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
