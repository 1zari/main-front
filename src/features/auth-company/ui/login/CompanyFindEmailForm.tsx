"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Check } from "lucide-react";
import {
  findCompanyEmailSchema,
  FindCompanyEmailFormValues,
} from "@/features/auth-company/model/validation/company-auth.schema";

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
  const [copied, setCopied] = useState(false);

  const handleFindEmail = (data: FindCompanyEmailFormValues) => {
    if (
      data.companyName === "시니어내일" &&
      data.businessNumber === "123-45-67890" &&
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
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-gray-50 pt-10 sm:pt-20 px-4">
      <div className="w-full max-w-[320px] sm:max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8 text-center">
        <h2 className="text-lg sm:text-xl font-semibold mb-6">
          {step === "verified" ? `${watch("companyName")} 기업 등록 이메일` : "이메일 찾기"}
        </h2>

        {step === "input" && (
          <form onSubmit={handleSubmit(handleFindEmail)} className="space-y-6">
            <div className="text-left">
              <label className="block mb-2 text-sm font-medium">기업명</label>
              <input
                {...register("companyName")}
                placeholder="기업명을 입력해주세요."
                className="w-full border px-3 py-2 rounded"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
              )}
            </div>

            <div className="text-left">
              <label className="block mb-2 text-sm font-medium">사업자등록번호</label>
              <input
                {...register("businessNumber")}
                placeholder="123-45-67890"
                className="w-full border px-3 py-2 rounded"
              />
              {errors.businessNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.businessNumber.message}</p>
              )}
            </div>

            <div className="text-left">
              <label className="block mb-2 text-sm font-medium">담당자 전화번호</label>
              <div className="flex gap-2">
                <input
                  {...register("phone")}
                  placeholder="010-1234-5678"
                  className="flex-1 border px-3 py-2 rounded"
                />
                <button
                  type="button"
                  className="bg-primary text-white px-4 rounded hover:bg-primary/80"
                >
                  인증
                </button>
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div className="text-left">
              <label className="block mb-2 text-sm font-medium">인증번호</label>
              <div className="flex gap-2">
                <input
                  {...register("code")}
                  placeholder="인증번호 6자리를 입력해주세요."
                  className="flex-1 border px-3 py-2 rounded"
                />
                <button
                  type="button"
                  className="bg-primary text-white px-4 rounded hover:bg-primary/80"
                  onClick={handleVerifyCode}
                >
                  확인
                </button>
              </div>
              {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>}
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
              className={`w-full ${
                isVerified ? "bg-primary hover:bg-primary/80" : "bg-gray-300 cursor-not-allowed"
              } text-white py-2 rounded`}
              disabled={!isVerified}
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
                onClick={() => (window.location.href = "/auth/company/login")}
                className="w-full bg-primary text-white py-3 rounded hover:bg-primary/80 cursor-pointer mb-4"
              >
                로그인페이지로 이동
              </button>
              <p className="text-sm text-gray-500">
                비밀번호를 잊으셨나요?{" "}
                <button
                  onClick={() => (window.location.href = "/auth/company/find-password")}
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
