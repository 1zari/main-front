"use client";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { UserPasswordEditFormValues } from "@/features/mypage/user/validation/user-edit.schema";
import FormInput from "@/features/auth-common/components/baseFields/FormInput";

type Props = {
  onCancel: () => void;
};

export default function PasswordChangeForm({ onCancel }: Props) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <div className="space-y-6">
      <div className="relative w-full">
        <FormInput<UserPasswordEditFormValues>
          label="현재 비밀번호"
          name="currentPassword"
          type={showCurrentPassword ? "text" : "password"}
          placeholder="현재 비밀번호 입력"
        />
        <button
          type="button"
          onClick={() => setShowCurrentPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showCurrentPassword ? <EyeOff size={22} /> : <Eye size={22} />}
        </button>
      </div>
      <Link
        href="/auth/user/find-password"
        className="block text-sm text-blue-600 mt-2 ml-2 hover:underline"
      >
        비밀번호가 기억나지 않으세요?
      </Link>
      <div className="relative w-full">
        <FormInput<UserPasswordEditFormValues>
          label="새 비밀번호"
          name="newPassword"
          type={showNewPassword ? "text" : "password"}
          placeholder="새 비밀번호 입력"
        />
        <button
          type="button"
          onClick={() => setShowNewPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showNewPassword ? <EyeOff size={22} /> : <Eye size={22} />}
        </button>
      </div>

      <button
        type="button"
        onClick={onCancel}
        className="w-full h-[60px] px-4 py-2 border border-red-500 text-red-500 font-medium rounded hover:bg-red-500 hover:text-white transition"
      >
        비밀번호 변경 취소
      </button>
    </div>
  );
}
