'use client';

import { useState } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

export type SignupFormValues = {
  emailId: string;
  emailDomain: string;
  customEmailDomain?: string;
  password: string;
};

type Props = {
  onNext: (data: SignupFormValues) => void;
};

export default function SignupStepOneForm({ onNext }: Props) {
  const {
    register,
    handleSubmit,
    watch,
  } = useForm<SignupFormValues>({ mode: 'onChange' });

  const handleSubmitStep = (data: SignupFormValues) => {
    onNext(data);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(handleSubmitStep)} className="flex flex-col items-center space-y-8">
      <h2 className="text-[26px] md:text-[30px] font-bold">회원가입</h2>
      <div className="w-full max-w-[700px] space-y-6">
        <EmailSplitInput register={register} watch={watch} />
        <PasswordInput
          label="비밀번호"
          register={register('password')}
          show={showPassword}
          onToggle={() => setShowPassword((prev) => !prev)}
        />
        <button
          type="submit"
          className="w-full h-[70px] bg-primary text-white text-[20px] md:text-[22px] font-semibold rounded hover:opacity-90 transition cursor-pointer"
        >
          회원가입
        </button>
      </div>
    </form>
  );
}

function EmailSplitInput({
  register,
  watch,
}: {
  register: ReturnType<typeof useForm<SignupFormValues>>['register'];
  watch: ReturnType<typeof useForm<SignupFormValues>>['watch'];
}) {
  const selected = watch('emailDomain');

  return (
    <div className="w-full">
      <label className="block mb-5 font-semibold text-[18px] md:text-[22px]">이메일</label>
      <div className="grid grid-cols-[1fr_auto_1fr_auto] gap-2 items-center w-full">
        <input
          type="text"
          className="h-[70px] text-[22px] border border-gray-300 rounded px-4 bg-white w-full min-w-0 placeholder:text-gray-300"
          placeholder="user1234"
          {...register('emailId')}
        />
        <span className="text-[22px]">@</span>
        <select
          className="h-[70px] text-[20px] border border-gray-300 rounded px-3 bg-white w-full min-w-0"
          {...register('emailDomain')}
          defaultValue="naver.com"
        >
          <option value="naver.com">naver.com</option>
          <option value="gmail.com">gmail.com</option>
          <option value="hanmail.net">hanmail.net</option>
          <option value="daum.net">daum.net</option>
          <option value="custom">직접입력</option>
        </select>
        <button
          type="button"
          className="h-[70px] px-4 text-[16px] md:text-[18px] border border-primary text-primary rounded hover:bg-primary hover:text-white transition whitespace-nowrap cursor-pointer"
        >
          중복확인
        </button>
      </div>

      {selected === 'custom' && (
        <div className="mt-3">
          <input
            type="text"
            placeholder="직접 입력 (예: example.com)"
            className="w-full h-[70px] text-[20px] border border-gray-300 rounded px-4 bg-white placeholder:text-gray-300"
            {...register('customEmailDomain')}
          />
        </div>
      )}
    </div>
  );
}

function PasswordInput({
  label,
  register,
  show,
  onToggle,
}: {
  label: string;
  register: ReturnType<UseFormRegister<any>>;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <label className="block mb-5 font-semibold text-[18px] md:text-[22px]">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          placeholder="영문 소문자, 숫자, 특수문자 포함 8~16자"
          className="w-full h-[70px] text-[22px] border border-gray-300 rounded px-4 pr-12 bg-white placeholder:text-gray-500"
          {...register}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
        >
          {show ? <Eye size={25} /> : <EyeOff size={25} />}
        </button>
      </div>
    </div>
  );
}
