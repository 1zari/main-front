"use client";
import { Eye, EyeOff } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

type PasswordInputProps = {
  label: string;
  register: UseFormRegisterReturn;
  show: boolean;
  onToggle: () => void;
  error?: string;
};

export default function PasswordInput({
  label,
  register,
  show,
  onToggle,
  error,
}: PasswordInputProps) {
  return (
    <div>
      <label className="block mb-3 ml-2 text-base font-semibold sm:text-lg">{label}</label>
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
          className="absolute text-gray-500 -translate-y-1/2 cursor-pointer right-4 top-1/2"
        >
          {show ? <Eye size={22} /> : <EyeOff size={22} />}
        </button>
      </div>
      {error && <p className="mt-1 ml-2 text-red-500">{error}</p>}
    </div>
  );
}
