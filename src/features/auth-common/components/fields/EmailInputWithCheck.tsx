"use client";
import { useFormContext, type UseFormRegister } from "react-hook-form";
import { fetcher } from "@/lib/fetcher";
import { API_ENDPOINTS } from "@/constants/apiEndPoints";
import type { SignupFormValues } from "@/features/auth-common/validation/signup-auth.schema";

type Props = {
  register: UseFormRegister<SignupFormValues>;
  error?: string;
  onCheckSuccess: () => void;
  onEmailChange: () => void;
};

export default function EmailInputWithCheck({
  register,
  error,
  onCheckSuccess,
  onEmailChange,
}: Props) {
  const { getValues, setError, clearErrors } = useFormContext<SignupFormValues>();

  const handleCheckEmail = async () => {
    const email = getValues("email");
    if (!email) {
      setError("email", {
        type: "manual",
        message: "이메일을 입력해주세요.",
      });
      return;
    }

    try {
      console.log("이메일 중복확인 요청", email);
      const res = await fetcher.get<{ message: string }>(
        `${API_ENDPOINTS.AUTH.EMAIL_CHECK}?email=${encodeURIComponent(email)}`,
        {},
      );
      console.log("이메일 중복확인 응답", res);

      if (res.message === "Email is available.") {
        clearErrors("email");
        onCheckSuccess();
        alert("사용 가능한 이메일입니다.");
      } else {
        setError("email", {
          type: "manual",
          message: res.message,
        });
      }
    } catch (err) {
      console.error("이메일 중복확인 실패", err);
      setError("email", {
        type: "manual",
        message: "이메일 확인 중 오류가 발생했습니다.",
      });
    }
  };

  const { onChange: originalOnChange, onBlur, name, ref, ...rest } = register("email");

  return (
    <div className="w-full">
      <label className="block mb-3 ml-2 text-base font-semibold sm:text-lg">이메일</label>
      <div className="w-full space-y-3 sm:space-y-0 sm:flex sm:items-start sm:gap-3">
        <input
          type="text"
          placeholder="이메일 주소를 입력해주세요"
          className="w-full h-[60px] border border-gray-300 rounded px-4 bg-white placeholder:text-gray-400 focus:outline-none focus:border-2 focus:border-primary"
          name={name}
          ref={ref}
          onBlur={onBlur}
          onChange={(e) => {
            originalOnChange(e);
            onEmailChange();
            clearErrors("email");
          }}
          {...rest}
        />
        <button
          type="button"
          onClick={handleCheckEmail}
          className="w-full sm:w-auto h-[60px] px-4 border border-primary text-primary rounded hover:bg-primary hover:text-white transition whitespace-nowrap"
        >
          중복확인
        </button>
      </div>
      {error && <p className="mt-1 ml-2 text-red-500">{error}</p>}
    </div>
  );
}
