"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Check } from "lucide-react";
import {
  findUserEmailSchema,
  FindUserEmailFormValues,
} from "@/features/auth-user/model/validation/user-auth.schema";

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

  const [isVerified, setIsVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [step, setStep] = useState<"input" | "verified">("input");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const name = watch("name");

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
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-gray-50 pt-10 sm:pt-20 px-4">
      <div className="w-full max-w-[320px] sm:max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8 text-center">
        <h2 className="text-lg sm:text-xl font-semibold mb-6">
          {step === "verified" ? `${name} 님의 이메일` : "이메일 찾기"}
        </h2>

        {step === "input" && (
          <form onSubmit={handleSubmit(handleFindEmail)} className="space-y-6">
            <div className="mb-6 text-left">
              <label className="block mb-2 text-sm font-medium">이름</label>
              <div className="flex gap-2">
                <div className="relative border-b border-gray-300 pb-1 flex-1">
                  <input
                    type="text"
                    className="w-full border-none outline-none px-1 bg-transparent text-sm sm:text-base"
                    placeholder="이름을 입력해주세요."
                    {...register("name")}
                  />
                </div>
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
            </div>

            <div className="mb-6 text-left">
              <label className="block mb-2 text-sm font-medium">전화번호</label>
              <div className="flex gap-2">
                <div className="relative border-b border-gray-300 pb-1 flex-1">
                  <input
                    type="tel"
                    className="w-full border-none outline-none px-1 bg-transparent text-sm sm:text-base"
                    placeholder="010-1234-5678"
                    {...register("phone")}
                  />
                </div>
                <button
                  type="button"
                  className="bg-primary text-white px-4 rounded hover:bg-green-700 cursor-pointer"
                >
                  인증
                </button>
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone.message}</p>}
            </div>

            <div className="mb-6 text-left">
              <label className="block mb-2 text-sm font-medium">인증번호</label>
              <div className="flex gap-2">
                <div className="relative border-b border-gray-300 pb-1 flex-1">
                  <input
                    type="text"
                    className="w-full border-none outline-none px-1 bg-transparent text-sm sm:text-base"
                    placeholder="인증번호 6자리를 입력해주세요."
                    {...register("code")}
                  />
                </div>
                <button
                  type="button"
                  className="bg-primary text-white px-4 rounded hover:bg-green-700 cursor-pointer"
                  onClick={handleVerifyCode}
                >
                  확인
                </button>
              </div>
              {errors.code && <p className="text-red-500 text-sm mt-2">{errors.code.message}</p>}
              {verificationMessage && (
                <p
                  className={`text-sm mt-2 ${
                    verificationMessage.type === "success" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {verificationMessage.text}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-green-700 text-white py-2 rounded cursor-pointer mt-4"
            >
              이메일 찾기
            </button>
          </form>
        )}

        {step === "verified" && (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <p className="text-gray-600">회원가입 시 등록한 이메일 주소입니다.</p>
              <div className="flex items-center justify-center gap-2 bg-gray-50 py-4 rounded-lg">
                <p className="text-lg font-semibold">{email || "user1234@naver.com"}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(email || "user1234@naver.com");
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
                onClick={() => (window.location.href = "/auth/user/login")}
                className="w-full bg-primary text-white py-3 rounded hover:bg-green-700 cursor-pointer mb-4"
              >
                로그인 페이지로 이동
              </button>
              <p className="text-sm text-gray-500">
                비밀번호를 잊으셨나요?{" "}
                <button
                  onClick={() => (window.location.href = "/auth/user/find-password")}
                  className="text-primary hover:underline cursor-pointer"
                >
                  비밀번호 찾기
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
