import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/features/auth-common/validation/login-auth.schema";
import { EMAIL_DOMAINS, type EmailDomain } from "@/features/auth-user/constants/email";
import KakaoLogo from "@/assets/images/social/KakaoLogo.png";
import NaverLogo from "@/assets/images/social/NaverLogo.png";
import { JoinType } from "@/types/commonUser";

interface LoginBaseFormProps {
  join_type: JoinType;
  onEmailFind: () => void;
  onPasswordFind: () => void;
  showSocialLogin?: boolean;
  showEmailDomainSelect?: boolean;
}

export default function LoginBaseForm({
  join_type,
  onEmailFind,
  onPasswordFind,
  showSocialLogin = join_type === "normal",
  showEmailDomainSelect = true,
}: LoginBaseFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [domainOption, setDomainOption] = useState<EmailDomain>("직접입력");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const emailInput = watch("email");

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as EmailDomain;
    setDomainOption(selected);
    const id = emailInput?.split("@")[0] ?? "";
    const newEmail = selected === EMAIL_DOMAINS[0].value ? id : `${id}@${selected}`;
    setValue("email", newEmail);
  };

  const handleLogin = async (data: LoginFormValues) => {
    const providerId = join_type === "normal" ? "user-credentials" : "company-credentials";
    try {
      const result = await signIn(providerId, {
        email: data.email,
        password: data.password,
        join_type,
        redirect: true,
        callbackUrl: "/",
      });

      if (result?.error) {
        setError("root", {
          message:
            result.error === "CredentialsSignin"
              ? "이메일과 비밀번호를 확인해주세요."
              : result.error === "ServerError"
                ? "서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요."
                : "로그인에 실패했습니다. 잠시 후 다시 시도해주세요.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("root", {
        message: "로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    }
  };

  return (
    <form className="p-6 sm:p-8" onSubmit={handleSubmit(handleLogin)}>
      <Image
        src="/images/logo.png"
        alt="로고"
        width={200}
        height={50}
        className="w-auto h-auto mx-auto mb-6"
      />

      <div className="mb-6 text-left">
        <label htmlFor="email" className="block mb-3 ml-2 text-base font-semibold sm:text-lg">
          이메일
        </label>
        {join_type === "normal" && showEmailDomainSelect ? (
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-end">
            <div className="w-full pb-1 border-b border-gray-300 sm:flex-1">
              <input
                {...register("email")}
                id="email"
                name="email"
                type="text"
                autoComplete="username"
                placeholder="이메일을 입력해주세요."
                className="min-h-[2.75rem] w-full border-none bg-transparent px-2 py-3 leading-tight outline-none"
              />
            </div>
            <div className="relative w-full rounded border border-gray-300 px-3 py-2 sm:w-[140px]">
              <select
                className="w-full text-base text-gray-700 bg-white appearance-none cursor-pointer focus:outline-none"
                value={domainOption}
                onChange={handleDomainChange}
              >
                {EMAIL_DOMAINS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="absolute text-sm text-gray-500 transform -translate-y-1/2 pointer-events-none top-1/2 right-2">
                ▼
              </div>
            </div>
          </div>
        ) : (
          <div className="relative pb-1 border-b border-gray-300">
            <input
              {...register("email")}
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              placeholder="이메일을 입력해주세요."
              className="min-h-[2.75rem] w-full border-none bg-transparent px-2 py-3 leading-tight outline-none"
            />
          </div>
        )}
        {errors.email && (
          <p className="mt-1 text-sm text-red-500 sm:text-base">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-6 text-left">
        <label htmlFor="password" className="block mb-3 ml-2 text-base font-semibold sm:text-lg">
          비밀번호
        </label>
        <div className="relative pb-1 border-b border-gray-300">
          <input
            {...register("password")}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="비밀번호를 입력해주세요."
            className="min-h-[2.75rem] w-full border-none bg-transparent px-2 py-3 pr-8 leading-tight outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-0 text-gray-500 -translate-y-1/2 cursor-pointer top-1/2"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500 sm:text-base">
            비밀번호는 8자 이상 16자 이하이며, 영어 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야
            합니다.
          </p>
        )}
      </div>

      <div className="mb-6 text-right text-gray-400">
        <span onClick={onEmailFind} className="cursor-pointer hover:text-gray-600">
          이메일 찾기
        </span>
        <span className="mx-2">|</span>
        <span onClick={onPasswordFind} className="cursor-pointer hover:text-gray-600">
          비밀번호 찾기
        </span>
      </div>

      {errors.root && (
        <div className="p-3 mb-4 text-sm text-red-500 rounded-md bg-red-50">
          {errors.root.message}
        </div>
      )}

      <button
        type="submit"
        className="w-full py-3 mb-2 text-white rounded cursor-pointer bg-primary hover:bg-green-700"
      >
        로그인
      </button>

      <div className="w-full my-6 border-t border-gray-300" />

      {join_type === "normal" && showSocialLogin && (
        <div className="mb-6">
          <button
            type="button"
            onClick={() => signIn("kakao", { callbackUrl: "/" })}
            className="mb-3 flex w-full cursor-pointer items-center justify-center space-x-2 rounded bg-[#FEE500] py-3 text-black hover:bg-[#FFDC00]"
          >
            <Image src={KakaoLogo} alt="카카오 로고" width={22} height={22} className="mr-2" />
            <span>카카오로 로그인</span>
          </button>
          <button
            type="button"
            onClick={() => signIn("naver", { callbackUrl: "/" })}
            className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded bg-[#03C75A] py-3 text-white hover:bg-[#02B152]"
          >
            <Image src={NaverLogo} alt="네이버 로고" width={22} height={22} className="mr-2" />
            <span>네이버로 로그인</span>
          </button>
        </div>
      )}

      <div className="text-center">
        <button
          type="button"
          onClick={() => router.push(`/auth/signup`)}
          className="text-gray-500 cursor-pointer hover:underline"
        >
          회원가입
        </button>
      </div>
    </form>
  );
}
