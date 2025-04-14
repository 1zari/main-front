'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type Props = {
  onNext: () => void;
};

export default function StepOneForm({ onNext }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-8">
      <h2 className="text-[26px] md:text-[30px] font-bold">기업 회원가입</h2>

      <div className="w-full max-w-[700px] space-y-6">
        <div>
          <label className="block mb-1 font-semibold text-[18px] md:text-[22px]">
            이메일
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              className="flex-1 h-[70px] text-[22px] border border-gray-300 rounded px-4 bg-white"
              placeholder="manager@senior.com"
            />
            <button
              type="button"
              className="h-[70px] px-4 text-[16px] md:text-[18px] border border-primary text-primary rounded cursor-pointer  hover:bg-primary hover:text-white transition"
            >
              중복확인
            </button>
          </div>
        </div>
        <div>
          <label className="block mb-1 font-semibold text-[18px] md:text-[22px]">
            비밀번호
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full h-[70px] text-[22px] border border-gray-300 rounded px-4 pr-12 bg-white"
              placeholder="비밀번호 입력"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              {showPassword ? <Eye size={25} /> : <EyeOff size={25} />}
            </button>
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full h-[70px] bg-primary text-white text-[20px] md:text-[22px] font-semibold rounded cursor-pointer hover:opacity-90 transition"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
