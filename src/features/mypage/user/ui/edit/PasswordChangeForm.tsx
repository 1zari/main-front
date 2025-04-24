"use client";
import Link from "next/link";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import {
  userPasswordEditSchema,
  UserPasswordEditFormValues,
} from "@/features/mypage/user/validation/user-edit.schema";

type Props = {
  onCancel: () => void;
  onSuccess: () => void;
};

export default function PasswordChangeForm({ onCancel, onSuccess }: Props) {
  const methods = useForm<UserPasswordEditFormValues>({
    resolver: zodResolver(userPasswordEditSchema),
    mode: "onBlur",
  });

  const {
    register,
    trigger,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = methods;

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const resetPasswordFields = () => {
    setValue("currentPassword", "");
    setValue("newPassword", "");
    clearErrors(["currentPassword", "newPassword"]);
  };
  const handlePasswordSubmit = async () => {
    const isValid = await trigger(["currentPassword", "newPassword"]);
    if (isValid) {
      const values = getValues();
      console.log("비밀번호 변경 요청", values);
      onSuccess();
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <div>
          <label className="block mb-2 ml-2 font-semibold text-base">현재 비밀번호</label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              {...register("currentPassword")}
              placeholder="현재 비밀번호 입력"
              className="w-full h-[60px] border border-gray-300 rounded px-4 pr-12 bg-white placeholder:text-gray-400 focus:outline-none focus:border-2 focus:border-primary"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showCurrentPassword ? <Eye size={24} /> : <EyeOff size={24} />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-red-500 mt-1 ml-2 text-sm">{errors.currentPassword.message}</p>
          )}
        </div>

        <Link
          href="/auth/user/find-password"
          className="block text-blue-700 mt-2 ml-2 hover:underline"
        >
          💁🏻 비밀번호가 기억나지 않으세요?
        </Link>

        <div>
          <label className="block mb-2 ml-2 font-semibold text-base">새 비밀번호</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              {...register("newPassword")}
              placeholder="새 비밀번호 입력"
              className="w-full h-[60px] border border-gray-300 rounded px-4 pr-12 bg-white placeholder:text-gray-400 focus:outline-none focus:border-2 focus:border-primary"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showNewPassword ? <Eye size={24} /> : <EyeOff size={24} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 mt-1 ml-2 text-sm">{errors.newPassword.message}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            resetPasswordFields();
            onCancel();
          }}
          className="w-full h-[60px] bg-gray-200 text-gray-700 font-semibold rounded hover:bg-gray-300 transition"
        >
          취소
        </button>

        <button
          type="button"
          onClick={handlePasswordSubmit}
          className="w-full h-[60px] bg-primary text-white font-semibold rounded hover:opacity-90 transition"
        >
          비밀번호 변경하기
        </button>
      </div>
    </FormProvider>
  );
}
