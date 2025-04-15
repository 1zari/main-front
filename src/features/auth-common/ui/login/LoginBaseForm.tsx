import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/features/auth-common/model/validation/auth.schema";
import { EMAIL_DOMAINS, type EmailDomain } from "@/features/auth-user/model/constants/email";

interface LoginBaseFormProps {
  role: "user" | "employer";
  onEmailFind: () => void;
  onPasswordFind: () => void;
  onSignup: () => void;
  showSocialLogin?: boolean;
  showEmailDomainSelect?: boolean;
  key?: string;
}

export default function LoginBaseForm({
  role,
  onEmailFind,
  onPasswordFind,
  onSignup,
  showSocialLogin = true,
  showEmailDomainSelect = true,
  key,
}: LoginBaseFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [domainOption, setDomainOption] = useState<EmailDomain>("직접입력");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      role: role === "user" ? "user" : "employer",
    });

    if (result?.ok) {
      router.push("/");
    } else {
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    }
  };

  return (
    <form className="p-6 sm:p-8" onSubmit={handleSubmit(handleLogin)}>
      <Image src="/images/logo.png" alt="로고" width={200} height={200} className="mx-auto mb-6" />

      <div className="mb-6 text-left">
        <label htmlFor="email" className="block mb-3 ml-2 font-semibold text-base sm:text-lg">
          이메일
        </label>
        {role === "user" && showEmailDomainSelect ? (
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-end">
            <div className="w-full sm:flex-1 border-b border-gray-300 pb-1">
              <input
                {...register("email")}
                id="email"
                name="email"
                type="text"
                placeholder="이메일을 입력해주세요."
                className="w-full border-none outline-none px-2 py-3 bg-transparent leading-tight min-h-[2.75rem]"
              />
            </div>
            <div className="relative w-full sm:w-[140px] border border-gray-300 rounded px-3 py-2">
              <select
                className="w-full bg-white text-gray-700 focus:outline-none appearance-none cursor-pointer text-base"
                value={domainOption}
                onChange={handleDomainChange}
              >
                {EMAIL_DOMAINS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                ▼
              </div>
            </div>
          </div>
        ) : (
          <div className="relative border-b border-gray-300 pb-1">
            <input
              {...register("email")}
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              className="w-full border-none outline-none px-2 py-3 bg-transparent leading-tight min-h-[2.75rem]"
            />
          </div>
        )}
        {errors.email && (
          <p className="text-red-500 mt-1 text-sm sm:text-base">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-6 text-left">
        <label htmlFor="password" className="block mb-3 ml-2 font-semibold text-base sm:text-lg">
          비밀번호
        </label>
        <div className="relative border-b border-gray-300 pb-1">
          <input
            {...register("password")}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요."
            className="w-full border-none outline-none px-2 py-3 pr-8 bg-transparent leading-tight min-h-[2.75rem]"
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
          <p className="text-red-500 mt-1 text-sm sm:text-base">
            비밀번호는 8자 이상 16자 이하이며, 영어 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야
            합니다.
          </p>
        )}
      </div>

      <div className="text-gray-400 mb-6 text-right">
        <span onClick={onEmailFind} className="cursor-pointer hover:text-gray-600">
          이메일 찾기
        </span>
        <span className="mx-2">|</span>
        <span onClick={onPasswordFind} className="cursor-pointer hover:text-gray-600">
          비밀번호 찾기
        </span>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded hover:bg-green-700 cursor-pointer mb-2"
      >
        로그인
      </button>

      <div className="w-full border-t border-gray-300 my-6" />

      {showSocialLogin && (
        <div className="mb-6">
          <button
            onClick={() => signIn("kakao")}
            className="w-full bg-[#FEE500] text-black py-3 rounded hover:bg-[#FFDC00] mb-3 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>카카오로 로그인</span>
          </button>
          <button
            onClick={() => signIn("naver")}
            className="w-full bg-[#03C75A] text-white py-3 rounded hover:bg-[#02B152] cursor-pointer"
          >
            네이버로 로그인
          </button>
        </div>
      )}

      <div className="text-center">
        <button onClick={onSignup} className="text-gray-500 hover:underline cursor-pointer">
          회원가입
        </button>
      </div>
    </form>
  );
}
