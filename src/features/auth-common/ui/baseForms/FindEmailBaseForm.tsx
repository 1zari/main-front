"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useRouter } from "next/navigation";
import AuthTypeTabs from "../components/AuthTypeTabs";
import { FindUserEmailFormValues } from "@/features/auth-user/model/validation/user-auth.schema";
import { FindCompanyEmailFormValues } from "@/features/auth-company/model/validation/company-auth.schema";

type FindEmailFormValues = {
  name?: string;
  companyName?: string;
  businessNumber?: string;
  phone?: string;
  code?: string;
};

interface FindEmailBaseFormProps {
  type: "user" | "company";
  email: string;
  name: string;
  step: "input" | "verified";
  isVerified: boolean;
  verificationMessage: {
    type: "success" | "error";
    text: string;
  } | null;
  register: UseFormRegister<FindEmailFormValues>;
  errors: FieldErrors<FindEmailFormValues>;
  onVerifyCode: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function FindEmailBaseForm({
  type,
  email,
  name,
  step,
  isVerified,
  verificationMessage,
  register,
  errors,
  onVerifyCode,
  onSubmit,
}: FindEmailBaseFormProps) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const nameLabel = type === "user" ? "이름" : "기업명";
  const namePlaceholder = type === "user" ? "이름을 입력해주세요." : "기업명을 입력해주세요.";
  const nameField = type === "user" ? "name" : "companyName";
  const phoneLabel = type === "user" ? "전화번호" : "담당자 전화번호";

  const handleTabChange = (selectedType: "user" | "company") => {
    router.push(`/auth/${selectedType}/find-email`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="w-[600px] mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-md">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
              {step === "verified"
                ? `${name} ${type === "company" ? "기업" : "님"}의 이메일`
                : "이메일 찾기"}
            </h2>

            {step === "input" && <AuthTypeTabs type={type} pageType="find-email" />}

            {step === "input" ? (
              <div className="space-y-6">
                <div>
                  <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">
                    {nameLabel}
                  </label>
                  <div className="relative border-b border-gray-300 pb-1">
                    <input
                      {...register(nameField)}
                      name={nameField}
                      placeholder={namePlaceholder}
                      className="w-full border-none outline-none px-2 py-3 bg-transparent leading-tight min-h-[2.75rem]"
                    />
                  </div>
                  {errors[nameField] && (
                    <p className="text-red-500 mt-1 text-sm sm:text-base">
                      {errors[nameField]?.message?.toString()}
                    </p>
                  )}
                </div>

                {type === "company" && (
                  <div>
                    <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">
                      사업자등록번호
                    </label>
                    <div className="relative border-b border-gray-300 pb-1">
                      <input
                        {...register("businessNumber")}
                        name="businessNumber"
                        placeholder="1234567890 (-제외 번호 입력)"
                        className="w-full border-none outline-none px-2 py-3 bg-transparent leading-tight min-h-[2.75rem]"
                      />
                    </div>
                    {errors.businessNumber && (
                      <p className="text-red-500 mt-1 text-sm sm:text-base">
                        {errors.businessNumber.message?.toString()}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">
                    {phoneLabel}
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1 border-b border-gray-300 pb-1">
                      <input
                        {...register("phone")}
                        name="phone"
                        placeholder="010-1234-5678"
                        className="w-full border-none outline-none px-2 py-3 bg-transparent leading-tight min-h-[2.75rem]"
                      />
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 text-white bg-primary rounded hover:bg-primary/80 transition-colors"
                    >
                      인증
                    </button>
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 mt-1 text-sm sm:text-base">
                      {errors.phone.message?.toString()}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">
                    인증번호
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1 border-b border-gray-300 pb-1">
                      <input
                        {...register("code")}
                        name="code"
                        placeholder="인증번호 6자리를 입력해주세요."
                        className="w-full border-none outline-none px-2 py-3 bg-transparent leading-tight min-h-[2.75rem]"
                      />
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 text-white bg-primary rounded hover:bg-primary/80 transition-colors"
                      onClick={onVerifyCode}
                    >
                      확인
                    </button>
                  </div>
                  {errors.code && (
                    <p className="text-red-500 mt-1 text-sm sm:text-base">
                      {errors.code.message?.toString()}
                    </p>
                  )}
                  {verificationMessage && (
                    <p
                      className={`mt-1 text-sm sm:text-base ${
                        verificationMessage.type === "success" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {verificationMessage.text}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 text-white rounded transition-colors ${
                    isVerified ? "bg-primary hover:bg-primary/80" : "bg-gray-300 cursor-not-allowed"
                  }`}
                  disabled={!isVerified}
                >
                  이메일 찾기
                </button>
              </div>
            ) : (
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <p className="text-gray-600">회원가입 시 등록한 이메일 주소입니다.</p>
                  <div className="flex items-center justify-center gap-2 bg-gray-50 py-4 rounded-lg">
                    <p className="text-lg font-semibold">{email}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(email);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => router.push(`/auth/login`)}
                    className="w-full bg-primary text-white py-3 rounded hover:bg-primary/80 cursor-pointer mb-4"
                  >
                    로그인 페이지로 이동
                  </button>
                  <p className="text-gray-500">
                    비밀번호를 잊으셨나요?{" "}
                    <button
                      onClick={() => router.push(`/auth/${type}/find-password`)}
                      className="text-primary hover:underline cursor-pointer"
                    >
                      비밀번호 찾기
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
