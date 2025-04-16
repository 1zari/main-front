"use client";

import { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { FindUserPasswordFormValues } from "@/features/auth-user/model/validation/user-auth.schema";
import { FindCompanyPasswordFormValues } from "@/features/auth-company/model/validation/company-auth.schema";
import AuthTypeTabs from "../components/AuthTypeTabs";

interface FindPasswordBaseFormProps {
  type: "user" | "company";
  step: "input" | "complete";
  isVerified: boolean;
  showPassword: boolean;
  register: UseFormRegister<FindUserPasswordFormValues & FindCompanyPasswordFormValues>;
  errors: FieldErrors<FindUserPasswordFormValues & FindCompanyPasswordFormValues>;
  onVerifyCode: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onTogglePassword: () => void;
}

export default function FindPasswordBaseForm({
  type,
  step,
  isVerified,
  showPassword,
  register,
  errors,
  onVerifyCode,
  onSubmit,
  onTogglePassword,
}: FindPasswordBaseFormProps) {
  const router = useRouter();
  const phoneLabel = type === "user" ? "전화번호" : "담당자 전화번호";

  const handleTabChange = (selectedType: "user" | "company") => {
    router.push(`/auth/${selectedType}/find-password`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pt-20">
      <div className="w-full sm:w-[600px] mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-md">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
              {step === "complete" ? "비밀번호 변경 완료" : "비밀번호 찾기"}
            </h2>

            {step === "input" && <AuthTypeTabs type={type} pageType="find-password" />}

            {step === "input" ? (
              <div className="space-y-6">
                <div>
                  <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">
                    이메일
                  </label>
                  <div className="relative border-b border-gray-300 pb-1">
                    <input
                      {...register("email")}
                      name="email"
                      placeholder="이메일을 입력해주세요."
                      className="w-full border-none outline-none px-2 py-3 bg-transparent leading-tight min-h-[2.75rem]"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 mt-1 text-sm sm:text-base">
                      {errors.email.message?.toString()}
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
                </div>

                <div>
                  <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">
                    새 비밀번호
                  </label>
                  <div className="relative border-b border-gray-300 pb-1">
                    <input
                      {...register("newPassword")}
                      name="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="새 비밀번호를 입력해주세요."
                      className="w-full border-none outline-none px-2 py-3 pr-8 bg-transparent leading-tight min-h-[2.75rem]"
                    />
                    <button
                      type="button"
                      onClick={onTogglePassword}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                    >
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-500 mt-1 text-sm sm:text-base">
                      {errors.newPassword.message?.toString()}
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
                  비밀번호 변경
                </button>
              </div>
            ) : (
              <div className="text-center space-y-8">
                <p className="text-gray-600">비밀번호가 성공적으로 변경되었습니다.</p>
                <button
                  onClick={() => router.push(`/auth/login`)}
                  className="w-full bg-primary text-white py-3 rounded hover:bg-primary/80 cursor-pointer"
                >
                  로그인 페이지로 이동
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
