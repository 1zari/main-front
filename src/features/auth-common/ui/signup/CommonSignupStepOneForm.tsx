"use client";

import { useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { signupSchema, SignupFormValues } from "@/features/auth-common/model/validation";

type Props = {
  onNext: (data: SignupFormValues) => void;
  userType: "company" | "user";
};

export default function SignupStepOneForm({ onNext, userType }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    mode: "onSubmit",
    resolver: zodResolver(signupSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmitStep = (data: SignupFormValues) => {
    onNext(data);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleSubmitStep)}
      className="flex flex-col items-center space-y-8"
    >
      <h2 className="text-2xl font-semibold">
        {userType === "company" ? "기업 회원가입" : "회원가입"}
      </h2>

      <div className="w-full max-w-[700px] space-y-6">
        <EmailInputWithCheck register={register} error={errors.email?.message} />
        <PasswordInput
          label="비밀번호"
          register={register("password")}
          show={showPassword}
          onToggle={() => setShowPassword((prev) => !prev)}
          error={errors.password?.message}
        />
        <button
          type="submit"
          className="w-full h-[60px] bg-primary text-white font-semibold rounded hover:opacity-90 transition cursor-pointer"
        >
          다음 단계로
        </button>
      </div>
    </form>
  );
}

function EmailInputWithCheck({
  register,
  error,
}: {
  register: ReturnType<typeof useForm<SignupFormValues>>["register"];
  error?: string;
}) {
  return (
    <div className="w-full">
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">이메일</label>
      <div className="w-full space-y-3 sm:space-y-0 sm:flex sm:items-start sm:gap-3">
        <input
          type="text"
          placeholder="이메일 주소를 입력해주세요"
          className="w-full h-[60px] border border-gray-300 rounded px-4 bg-white placeholder:text-gray-400 focus:outline-none focus:border-2 focus:border-primary"
          {...register("email")}
        />
        <button
          type="button"
          className="w-full sm:w-auto h-[60px] px-4 border border-primary text-primary rounded hover:bg-primary hover:text-white transition whitespace-nowrap"
        >
          중복확인
        </button>
      </div>
      {error && <p className="text-red-500 mt-1 ml-2">{error}</p>}
    </div>
  );
}

function PasswordInput({
  label,
  register,
  show,
  onToggle,
  error,
}: {
  label: string;
  register: ReturnType<UseFormRegister<any>>;
  show: boolean;
  onToggle: () => void;
  error?: string;
}) {
  return (
    <div>
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder="영문 소문자, 숫자, 특수문자 포함 8~16자"
          className="w-full h-[60px] border border-gray-300 rounded px-4 pr-12 bg-white placeholder:text-gray-400 focus:outline-none focus:border-2 focus:border-primary"
          {...register}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
        >
          {show ? <Eye size={22} /> : <EyeOff size={22} />}
        </button>
      </div>
      {error && <p className="text-red-500 mt-1 ml-2">{error}</p>}
    </div>
  );
}
