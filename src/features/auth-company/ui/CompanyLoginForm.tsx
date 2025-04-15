"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/features/auth-user/model/validation";

export default function CompanyLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormValues) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      role: "employer",
    });

    if (result?.ok) {
      router.push("/");
    } else {
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-gray-50 pt-10 sm:pt-20 px-4">
      <div className="w-full max-w-[320px] sm:max-w-md bg-white rounded-lg shadow-md p-6 sm:p-8 text-center">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">기업회원 로그인</h2>

        <Image
          src="/images/logo.png"
          alt="로고"
          width={200}
          height={200}
          className="mx-auto mb-6"
        />

        <div className="mb-4 text-left">
          <label className="block mb-1 text-sm font-medium">이메일</label>
          <div className="relative border-b border-gray-300 pb-1">
            <input
              {...register("email")}
              type="email"
              placeholder="이메일을 입력해주세요."
              className="w-full border-none outline-none px-1 bg-transparent text-sm sm:text-base"
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4 text-left">
          <label className="block mb-1 text-sm font-medium">비밀번호</label>
          <div className="relative border-b border-gray-300 pb-1">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요."
              className="w-full border-none outline-none px-1 pr-8 bg-transparent text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              비밀번호는 8자 이상 16자 이하이며, 영어 소문자, 숫자, 특수문자를 각각 1개 이상
              포함해야 합니다.
            </p>
          )}
        </div>

        <div className="text-xs sm:text-sm text-gray-400 mb-4 text-right">
          <span className="cursor-pointer hover:text-gray-600">이메일 찾기</span>
          <span className="mx-2">|</span>
          <span className="cursor-pointer hover:text-gray-600">비밀번호 찾기</span>
        </div>

        <button
          onClick={handleSubmit(handleLogin)}
          className="w-full bg-primary text-white py-2 rounded hover:bg-green-700 cursor-pointer mb-2"
        >
          로그인
        </button>

        <div className="w-full border-t border-gray-300 my-4" />

        <div className="text-center">
          <button
            onClick={() => router.push("/auth/company/signup")}
            className="text-xs sm:text-sm text-gray-500 hover:underline cursor-pointer"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
