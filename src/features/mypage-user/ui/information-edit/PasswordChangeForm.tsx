"use client"
import { UserPasswordEditFormValues } from "@/features/auth-user/validation/user-auth.schema"
import FormInput from "@/features/auth-common/components/baseFields/FormInput"

type Props = {
  onCancel: () => void
}

export default function PasswordChangeForm({ onCancel }: Props) {
  return (
    <div className="space-y-6">
      <FormInput<UserPasswordEditFormValues>
        label="현재 비밀번호"
        name="currentPassword"
        type="password"
        placeholder="현재 비밀번호 입력"
      />
      <FormInput<UserPasswordEditFormValues>
        label="새 비밀번호"
        name="newPassword"
        type="password"
        placeholder="새 비밀번호 입력"
      />
      <button
        type="button"
        onClick={onCancel}
        className="w-full h-[60px] px-4 py-2 border border-red-500 text-red-500 font-medium rounded hover:bg-red-500 hover:text-white transition"
      >
        비밀번호 변경 취소
      </button>
    </div>
  )
}
