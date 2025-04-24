"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";

interface FindEmailFormValues {
  name: string;
  phone: string;
  email?: string;
  businessNumber?: string;
  code?: string;
}

interface FindEmailBaseFormProps {
  step: "input" | "complete";
  register: UseFormRegister<FindEmailFormValues>;
  errors: FieldErrors<FindEmailFormValues>;
  foundEmail?: string;
}

export function FindEmailBaseForm({ step, register, errors, foundEmail }: FindEmailBaseFormProps) {
  return (
    <div className="w-full max-w-[400px] mx-auto">
      <div className="mb-8">
        {step === "input" && (
          <div className="text-center">
            <p className="mb-2 text-lg font-medium sm:text-xl">이메일 찾기</p>
            <p className="text-gray-600">가입 시 등록한 정보로 이메일을 찾을 수 있습니다</p>
          </div>
        )}
        {step === "complete" && (
          <div className="text-center">
            <p className="mb-2 text-lg font-medium sm:text-xl">찾은 이메일 주소</p>
            <p className="text-gray-600">{foundEmail}</p>
          </div>
        )}
      </div>

      {step === "input" && (
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
              이름
            </label>
            <input
              id="name"
              type="text"
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                errors.name
                  ? "ring-red-500 focus:ring-red-500"
                  : "ring-gray-300 focus:ring-indigo-600"
              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
              {...register("name")}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">
              휴대폰 번호
            </label>
            <input
              id="phone"
              type="tel"
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                errors.phone
                  ? "ring-red-500 focus:ring-red-500"
                  : "ring-gray-300 focus:ring-indigo-600"
              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
              {...register("phone")}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          <div>
            <label
              htmlFor="businessNumber"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              사업자 등록번호
            </label>
            <input
              id="businessNumber"
              type="text"
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                errors.businessNumber
                  ? "ring-red-500 focus:ring-red-500"
                  : "ring-gray-300 focus:ring-indigo-600"
              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
              {...register("businessNumber")}
            />
            {errors.businessNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.businessNumber.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="code" className="block mb-1 text-sm font-medium text-gray-700">
              인증 코드
            </label>
            <input
              id="code"
              type="text"
              className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                errors.code
                  ? "ring-red-500 focus:ring-red-500"
                  : "ring-gray-300 focus:ring-indigo-600"
              } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
              {...register("code")}
            />
            {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
