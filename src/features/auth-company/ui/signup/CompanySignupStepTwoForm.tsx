"use client";

import { useForm, useFormContext, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySchema, CompanyFormValues } from "@/features/auth-company/model/validation";
import { useState } from "react";

export type CompanyStepTwoValues = CompanyFormValues;

type Props = {
  onSubmit: (data: CompanyStepTwoValues) => void;
};

export default function SignupStepTwoCompany({ onSubmit }: Props) {
  const methods = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    mode: "onSubmit",
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col items-center space-y-8">
        <h2 className="text-2xl font-semibold">기업 회원 정보</h2>

        <div className="w-full max-w-[700px] space-y-6">
          <Input label="기업명" name="companyName" placeholder="시니어내일" register={methods.register} error={methods.formState.errors.companyName?.message} />
          <Input label="개업년월일" name="startDate" type="date" placeholder="YYYY-MM-DD" register={methods.register} error={methods.formState.errors.startDate?.message} />
          <InputWithButton
            label="사업자등록번호"
            name="businessNumber"
            placeholder="- 없이 숫자만 입력"
            buttonText="중복확인"
            onButtonClick={() => {
              const value = methods.getValues("businessNumber");
              if (!value) {
                methods.setError("businessNumber", {
                  type: "manual",
                  message: "사업자등록번호는 필수입니다. 중복 확인 후 입력해주세요.",
                });
                return;
              }
              // 중복확인 로직 연결 예정
            }}
            register={methods.register}
            error={methods.formState.errors.businessNumber?.message}
          />
          <FileUpload error={methods.formState.errors.companyLogo?.message as string} />
          <TextArea
            label="기업 소개"
            name="companyIntro"
            placeholder="기업의 주요 사업 내용과 특징을 입력해주세요"
            register={methods.register}
            error={methods.formState.errors.companyIntro?.message}
          />
          <Input label="담당자 성함" name="managerName" placeholder="김오즈" register={methods.register} error={methods.formState.errors.managerName?.message} />
          <Input label="담당자 전화번호" name="managerPhone" placeholder="010-1234-5678" register={methods.register} error={methods.formState.errors.managerPhone?.message} />
          <Input label="담당자 이메일" name="managerEmail" placeholder="manager@company.com" register={methods.register} error={methods.formState.errors.managerEmail?.message} />

          <button
            type="submit"
            className="w-full h-[60px] bg-primary text-white font-semibold rounded hover:opacity-90 transition mt-7 cursor-pointer"
          >
            회원가입 완료
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

type InputProps = {
  label: string;
  name: keyof CompanyFormValues;
  type?: string;
  placeholder?: string;
  register: ReturnType<typeof useForm<CompanyFormValues>>['register'];
  error?: string;
};

function Input({ label, name, type = 'text', placeholder, register, error }: InputProps) {
  return (
    <div>
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-[60px] border border-gray-300 rounded px-4 bg-white placeholder:text-gray-400 focus:outline-none focus:border-2 focus:border-primary"
        {...register(name)}
      />
      {error && <p className="text-red-500 mt-1 ml-2">{error}</p>}
    </div>
  );
}

type InputWithButtonProps = {
  label: string;
  name: keyof CompanyFormValues;
  placeholder?: string;
  buttonText: string;
  onButtonClick: () => void;
  register: ReturnType<typeof useForm<CompanyFormValues>>['register'];
  error?: string;
};

function InputWithButton({ label, name, placeholder, buttonText, onButtonClick, register, error }: InputWithButtonProps) {
  return (
    <div>
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">{label}</label>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 h-[60px] border border-gray-300 rounded px-4 bg-white placeholder:text-gray-400 focus:outline-none focus:border-2 focus:border-primary"
          {...register(name)}
        />
        <button
          type="button"
          onClick={onButtonClick}
          className="h-[60px] px-4 border border-primary text-primary rounded hover:bg-primary hover:text-white transition whitespace-nowrap cursor-pointer"
        >
          {buttonText}
        </button>
      </div>
      {error && <p className="text-red-500 mt-1 ml-2">{error}</p>}
    </div>
  );
}

function FileUpload({ error }: { error?: string }) {
  const { register, setError, clearErrors } = useFormContext<CompanyFormValues>();
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setError("companyLogo", {
        type: "manual",
        message: "PNG, JPG, SVG 형식만 가능합니다.",
      });
    } else if (file.size > 2 * 1024 * 1024) {
      setError("companyLogo", {
        type: "manual",
        message: "파일 크기는 2MB 이하여야 합니다.",
      });
    } else {
      clearErrors("companyLogo");
    }
  };

  return (
    <div>
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">기업 로고 (권장)</label>
      <div className="flex items-center gap-3 w-full">
        <label
          htmlFor="companyLogo"
          className="h-[60px] px-4 border border-primary text-primary rounded hover:bg-primary hover:text-white transition flex items-center justify-center cursor-pointer"
        >
          파일 선택
        </label>
        <input
          id="companyLogo"
          type="file"
          accept="image/png,image/jpeg,image/svg+xml"
          className="hidden"
          {...register('companyLogo')}
          onChange={handleFileChange}
        />
        <input
          type="text"
          readOnly
          value={fileName}
          placeholder="파일을 첨부해주세요"
          className="flex-1 h-[60px] border border-gray-300 rounded px-4 bg-gray-50 text-gray-400 placeholder:text-gray-400 focus:outline-none focus:border-2 focus:border-primary"
        />
      </div>
      {error && <p className="text-red-500 mt-1 ml-2">{error}</p>}
    </div>
  );
}

function TextArea({ label, name, placeholder, register, error }: {
  label: string;
  name: keyof CompanyFormValues;
  placeholder?: string;
  register: ReturnType<typeof useForm<CompanyFormValues>>['register'];
  error?: string;
}) {
  return (
    <div>
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">{label}</label>
      <textarea
        placeholder={placeholder || `${label}을 입력해주세요`}
        className="w-full h-[140px] pt-4 border border-gray-300 rounded px-4 bg-white resize-none placeholder:text-gray-400 focus:outline-none focus:border-2 focus:border-primary"
        {...register(name)}
      />
      {error && <p className="text-red-500 mt-1 ml-2">{error}</p>}
    </div>
  );
}