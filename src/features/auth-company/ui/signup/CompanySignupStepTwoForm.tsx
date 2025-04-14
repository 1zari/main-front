'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companySchema, CompanyFormValues } from '@/features/auth-company/model/validation';

export type CompanyStepTwoValues = CompanyFormValues;

type Props = {
  onSubmit: (data: CompanyStepTwoValues) => void;
};

export default function SignupStepTwoCompany({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-8">
      <h2 className="text-xl sm:text-2xl font-bold">기업 회원 정보</h2>

      <div className="w-full max-w-[700px] space-y-6">
        <Input label="기업명" name="companyName" placeholder="시니어내일" register={register} error={errors.companyName?.message} />

        <Input label="개업년월일" name="startDate" type="date" placeholder="YYYY-MM-DD" register={register} error={errors.startDate?.message} />

        <InputWithButton
          label="사업자등록번호"
          name="businessNumber"
          placeholder="- 없이 숫자만 입력"
          buttonText="중복확인"
          onButtonClick={() => alert('중복확인 로직 연결 예정')}
          register={register}
          error={errors.businessNumber?.message}
        />

        <FileUpload
          register={register}
          error={typeof errors.companyLogo?.message === 'string' ? errors.companyLogo.message : undefined}
        />

        <TextArea
          label="기업 소개"
          name="companyIntro"
          placeholder="기업의 주요 사업 내용과 특징을 입력해주세요"
          register={register}
          error={errors.companyIntro?.message}
        />

        <Input label="담당자 성함" name="managerName" placeholder="김오즈" register={register} error={errors.managerName?.message} />
        <Input label="담당자 전화번호" name="managerPhone" placeholder="010-1234-5678" register={register} error={errors.managerPhone?.message} />
        <Input label="담당자 이메일" name="managerEmail" placeholder="manager@company.com" register={register} error={errors.managerEmail?.message} />

        <button
          type="submit"
          className="w-full h-[60px] bg-primary text-white text-base sm:text-lg font-semibold rounded hover:opacity-90 transition"
        >
          회원가입 완료
        </button>
      </div>
    </form>
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
      <label className="block mb-3 font-semibold text-base sm:text-lg">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-[60px] text-base sm:text-lg border border-gray-300 rounded px-4 bg-white placeholder:text-gray-400"
        {...register(name)}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
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

function InputWithButton({
  label,
  name,
  placeholder,
  buttonText,
  onButtonClick,
  register,
  error,
}: InputWithButtonProps) {
  return (
    <div>
      <label className="block mb-3 font-semibold text-base sm:text-lg">{label}</label>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 h-[60px] text-base sm:text-lg border border-gray-300 rounded px-4 bg-white placeholder:text-gray-400"
          {...register(name)}
        />
        <button
          type="button"
          onClick={onButtonClick}
          className="h-[60px] px-4 text-sm sm:text-base border border-primary text-primary rounded hover:bg-primary hover:text-white transition whitespace-nowrap"
        >
          {buttonText}
        </button>
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function FileUpload({
  register,
  error,
}: {
  register: ReturnType<typeof useForm<CompanyFormValues>>['register'];
  error?: string;
}) {
  return (
    <div>
      <label className="block mb-3 font-semibold text-base sm:text-lg">기업 로고 (권장)</label>
      <div className="flex items-center gap-3 w-full">
        <label
          htmlFor="companyLogo"
          className="h-[60px] px-4 text-sm sm:text-base border border-primary text-primary rounded hover:bg-primary hover:text-white transition flex items-center justify-center cursor-pointer"
        >
          파일 선택
        </label>
        <input
          id="companyLogo"
          type="file"
          accept="image/*"
          className="hidden"
          {...register('companyLogo')}
          onChange={(e) => {
            const file = e.target.files?.[0];
            const input = document.getElementById('companyLogoText') as HTMLInputElement;
            if (file && input) input.value = file.name;
          }}
        />
        <input
          id="companyLogoText"
          type="text"
          readOnly
          value=""
          placeholder="파일을 첨부해주세요"
          className="flex-1 h-[60px] text-base sm:text-lg border border-gray-300 rounded px-4 bg-gray-50 placeholder:text-gray-400"
        />
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function TextArea({
  label,
  name,
  placeholder,
  register,
  error,
}: {
  label: string;
  name: keyof CompanyFormValues;
  placeholder?: string;
  register: ReturnType<typeof useForm<CompanyFormValues>>['register'];
  error?: string;
}) {
  return (
    <div>
      <label className="block mb-3 font-semibold text-base sm:text-lg">{label}</label>
      <textarea
        placeholder={placeholder || `${label}을 입력해주세요`}
        className="w-full h-[140px] text-base sm:text-lg pt-4 border border-gray-300 rounded px-4 bg-white resize-none placeholder:text-gray-400"
        {...register(name)}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
