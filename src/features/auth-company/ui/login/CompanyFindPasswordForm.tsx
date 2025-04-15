"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import {
  findCompanyPasswordSchema,
  FindCompanyPasswordFormValues,
} from "@/features/auth-company/model/validation/company-auth.schema";

export default function CompanyFindPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
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

  const email = watch("email");
  const phone = watch("phone");
  const code = watch("code");

  const MOCK_USER = {
    email: "manager@seniorMyJob.com",
    phone: "010-1234-5678",
    code: "658745",
  };

  const handleVerifyCode = () => {
    if (phone === MOCK_USER.phone && code === MOCK_USER.code) {
      setIsVerified(true);
    } else {
      alert("인증번호가 올바르지 않거나 전화번호가 일치하지 않습니다.");
    }
  };

  const handlePasswordChange = () => {
    if (email === MOCK_USER.email && phone === MOCK_USER.phone) {
      setStep("complete");
    } else {
      alert("입력하신 정보가 정확하지 않습니다.");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-gray-50 pt-10 sm:pt-20 px-4">
      <div className="w-full max-w-[320px] sm:max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8 text-center">
        <h2 className="text-lg sm:text-xl font-semibold mb-6">
          {step === "complete" ? "비밀번호 변경" : "비밀번호 찾기"}
        </h2>

        {step === "input" && (
          <form onSubmit={handleSubmit(handlePasswordChange)} className="space-y-6">
            {/* 이메일 입력 */}
            <div className="mb-6 text-left">
              <label className="block mb-2 text-sm font-medium">이메일</label>
              <div className="flex gap-2">
                <div className="relative border-b border-gray-300 pb-1 flex-1">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="이메일을 입력해주세요."
                    className="w-full border-none outline-none px-1 bg-transparent text-sm sm:text-base"
                  />
                </div>
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
            </div>

            {/* 사업자등록번호 */}
            <div className="mb-6 text-left">
              <label className="block mb-2 text-sm font-medium">사업자등록번호</label>
              <div className="relative border-b border-gray-300 pb-1">
                <input
                  {...register("businessNumber")}
                  type="text"
                  placeholder="숫자만 입력 (예: 1234567890)"
                  className="w-full border-none outline-none px-1 bg-transparent text-sm sm:text-base"
                />
              </div>
              {errors.businessNumber && (
                <p className="text-red-500 text-sm mt-2">{errors.businessNumber.message}</p>
              )}
            </div>

            {/* 전화번호 */}
            <div className="mb-6 text-left">
              <label className="block mb-2 text-sm font-medium">담당자 전화번호</label>
              <div className="flex gap-2">
                <div className="relative border-b border-gray-300 pb-1 flex-1">
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="010-1234-5678"
                    className="w-full border-none outline-none px-1 bg-transparent text-sm sm:text-base"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  className="bg-primary text-white px-4 rounded hover:bg-primary/80"
                >
                  인증
                </button>
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone.message}</p>}
            </div>

            {/* 인증번호 */}
            <div className="mb-6 text-left">
              <label className="block mb-2 text-sm font-medium">인증번호</label>
              <div className="flex gap-2">
                <div className="relative border-b border-gray-300 pb-1 flex-1">
                  <input
                    {...register("code")}
                    type="text"
                    placeholder="인증번호 6자리를 입력해주세요."
                    className="w-full border-none outline-none px-1 bg-transparent text-sm sm:text-base"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  className="bg-primary text-white px-4 rounded hover:bg-primary/80"
                >
                  확인
                </button>
              </div>
              {errors.code && <p className="text-red-500 text-sm mt-2">{errors.code.message}</p>}
            </div>

            {/* 새 비밀번호 */}
            {isVerified && (
              <div className="mb-6 text-left">
                <label className="block mb-2 text-sm font-medium">새 비밀번호 입력</label>
                <div className="relative border-b border-gray-300 pb-1">
                  <input
                    {...register("newPassword")}
                    type={showPassword ? "text" : "password"}
                    placeholder="새 비밀번호를 입력해주세요."
                    className="w-full border-none outline-none px-1 bg-transparent text-sm sm:text-base pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-2 whitespace-pre-line">
                    비밀번호는 8자 이상 16자 이하이며,{"\n"}
                    영어 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.
                  </p>
                )}
              </div>
            )}

            {/* 변경 완료 버튼 */}
            {isVerified && (
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded hover:bg-primary/80 cursor-pointer"
              >
                변경 완료
              </button>
            )}
          </form>
        )}

        {step === "complete" && (
          <div className="text-center space-y-6">
            <p className="text-base text-gray-700 font-medium">
              비밀번호가 성공적으로 변경되었습니다.
            </p>
            <button
              onClick={() => (window.location.href = "/company/login")}
              className="w-full bg-primary text-white py-3 rounded hover:bg-primary/80 cursor-pointer"
            >
              로그인 페이지로 이동
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
