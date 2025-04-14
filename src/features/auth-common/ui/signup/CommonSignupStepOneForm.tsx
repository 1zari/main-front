'use client';

import { useState } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { signupSchema, SignupFormValues } from '@/features/auth-common/model/validation';

type Props = {
  onNext: (data: SignupFormValues) => void;
};

export default function SignupStepOneForm({ onNext }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    mode: 'onSubmit',
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
      <h2 className="text-xl sm:text-2xl font-bold">로그인 시 사용할 이메일과 비밀번호를 입력하세요.</h2>

      <div className="w-full max-w-[700px] space-y-6">
        <EmailInputWithCheck register={register} error={errors.email?.message} />
        <PasswordInput
          label="비밀번호"
          register={register('password')}
          show={showPassword}
          onToggle={() => setShowPassword((prev) => !prev)}
          error={errors.password?.message}
        />
        <button
          type="submit"
          className="w-full h-[60px] bg-primary text-white text-base sm:text-lg font-semibold rounded hover:opacity-90 transition cursor-pointer"
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
  register: ReturnType<typeof useForm<SignupFormValues>>['register'];
  error?: string;
}) {
  return (
    <div className="w-full">
      <label className="block mb-3 font-semibold text-base sm:text-lg">이메일</label>
      <div className="flex items-center gap-3 w-full">
        <input
          type="text"
          placeholder="이메일 주소를 입력해주세요"
          className="flex-1 h-[60px] text-base sm:text-lg border border-gray-300 rounded px-4 bg-white placeholder:text-gray-400"
          {...register('email')}
        />
        <button
          type="button"
          className="h-[60px] px-4 text-sm sm:text-base border border-primary text-primary rounded hover:bg-primary hover:text-white transition whitespace-nowrap cursor-pointer"
        >
          중복확인
        </button>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
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
      <label className="block mb-3 font-semibold text-base sm:text-lg">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          placeholder="영문 소문자, 숫자, 특수문자 포함 8~16자"
          className="w-full h-[60px] text-base sm:text-lg border border-gray-300 rounded px-4 pr-12 bg-white placeholder:text-gray-400"
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
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
