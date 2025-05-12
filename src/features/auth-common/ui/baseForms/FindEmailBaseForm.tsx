"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthTypeTabs from "@/features/auth-common/components/AuthTypeTabs";
import { FindEmailBaseFormProps } from "@/features/auth-common/types/find-auth.types";

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

  const nameLabel = type === "normal" ? "이름" : "기업명";
  const namePlaceholder = type === "normal" ? "이름을 입력해주세요." : "기업명을 입력해주세요.";
  const nameField = type === "normal" ? "name" : "companyName";
  const phoneLabel = type === "normal" ? "전화번호" : "담당자 전화번호";

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="mx-auto w-full px-4 sm:w-[600px] sm:px-6 lg:px-8">
        <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-md">
          <div className="p-6 sm:p-8">
            <h2 className="mb-8 text-2xl font-bold text-center sm:text-3xl">
              {step === "verified"
                ? `${name}${type === "normal" ? "님" : ""}의 이메일`
                : "이메일 찾기"}
            </h2>

            {step === "input" && <AuthTypeTabs type={type} pageType="find-email" />}

            {step === "input" ? (
              <div className="space-y-6">
                <div>
                  <label className="block mb-3 ml-2 text-base font-semibold sm:text-lg">
                    {nameLabel}
                  </label>
                  <div className="relative pb-1 border-b border-gray-300">
                    <input
                      {...register(nameField)}
                      name={nameField}
                      placeholder={namePlaceholder}
                      className="min-h-[2.75rem] w-full border-none bg-transparent px-2 py-3 leading-tight outline-none"
                    />
                  </div>
                  {errors[nameField] && (
                    <p className="mt-1 text-sm text-red-500 sm:text-base">
                      {errors[nameField]?.message?.toString()}
                    </p>
                  )}
                </div>

                {type === "company" && (
                  <div>
                    <label className="block mb-3 ml-2 text-base font-semibold sm:text-lg">
                      사업자등록번호
                    </label>
                    <div className="relative pb-1 border-b border-gray-300">
                      <input
                        {...register("businessNumber")}
                        name="businessNumber"
                        placeholder="1234567890 (-제외 번호 입력)"
                        className="min-h-[2.75rem] w-full border-none bg-transparent px-2 py-3 leading-tight outline-none"
                      />
                    </div>
                    {errors.businessNumber && (
                      <p className="mt-1 text-sm text-red-500 sm:text-base">
                        {errors.businessNumber.message?.toString()}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block mb-3 ml-2 text-base font-semibold sm:text-lg">
                    {phoneLabel}
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1 pb-1 border-b border-gray-300">
                      <input
                        {...register("phone")}
                        name="phone"
                        placeholder="010-1234-5678"
                        className="min-h-[2.75rem] w-full border-none bg-transparent px-2 py-3 leading-tight outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 text-white transition-colors rounded bg-primary hover:bg-primary/80"
                    >
                      인증
                    </button>
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500 sm:text-base">
                      {errors.phone.message?.toString()}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-3 ml-2 text-base font-semibold sm:text-lg">
                    인증번호
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1 pb-1 border-b border-gray-300">
                      <input
                        {...register("code")}
                        name="code"
                        placeholder="인증번호 6자리를 입력해주세요."
                        className="min-h-[2.75rem] w-full border-none bg-transparent px-2 py-3 leading-tight outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 text-white transition-colors rounded bg-primary hover:bg-primary/80"
                      onClick={onVerifyCode}
                    >
                      확인
                    </button>
                  </div>
                  {errors.code && (
                    <p className="mt-1 text-sm text-red-500 sm:text-base">
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
                  className={`w-full rounded py-3 text-white transition-colors ${
                    isVerified ? "bg-primary hover:bg-primary/80" : "cursor-not-allowed bg-gray-300"
                  }`}
                  disabled={!isVerified}
                >
                  이메일 찾기
                </button>
              </div>
            ) : (
              <div className="space-y-8 text-center">
                <div className="space-y-4">
                  <p className="text-gray-600">회원가입 시 등록한 이메일 주소입니다.</p>
                  <div className="flex items-center justify-center gap-2 py-4 rounded-lg bg-gray-50">
                    <p className="text-lg font-semibold">{email}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(email);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="p-1 transition-colors rounded cursor-pointer hover:bg-gray-200"
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
                    className="w-full py-3 mb-4 text-white rounded cursor-pointer bg-primary hover:bg-primary/80"
                  >
                    로그인 페이지로 이동
                  </button>
                  <p className="text-gray-500">
                    비밀번호를 잊으셨나요?{" "}
                    <button
                      onClick={() => router.push(`/auth/${type}/find-password`)}
                      className="cursor-pointer text-primary hover:underline"
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
