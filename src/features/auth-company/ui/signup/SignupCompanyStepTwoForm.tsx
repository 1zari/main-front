'use client';

import { useForm, UseFormRegister } from 'react-hook-form';

export type CompanyStepTwoValues = {
  companyName: string;
  startDate: string;
  businessNumber: string;
  companyIntro: string;
  managerName: string;
  managerPhone: string;
  managerEmail: string;
  companyLogo?: FileList;
};

type Props = {
  onSubmit: (data: CompanyStepTwoValues) => void;
};

export default function SignupStepTwoCompany({ onSubmit }: Props) {
  const { register, handleSubmit } = useForm<CompanyStepTwoValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-8">
      <h2 className="text-[26px] md:text-[30px] font-bold">기업 회원 정보</h2>
      <div className="w-full max-w-[700px] space-y-6">
        <Input label="기업명" name="companyName" placeholder="시니어내일" register={register} />
        <Input label="개업년월일" name="startDate" type="date" placeholder="YYYY-MM-DD" register={register} />
        <Input label="사업자등록번호" name="businessNumber" placeholder="- 없이 숫자만 입력" register={register} />
        <div>
          <label className="block mb-5 font-semibold text-[18px] md:text-[22px]">기업 로고 업로드</label>
          <div className="flex items-center gap-3 w-full">
            <label
              htmlFor="companyLogo"
              className="h-[70px] px-4 text-[16px] md:text-[18px] border border-primary text-primary rounded hover:bg-primary hover:text-white transition flex items-center justify-center cursor-pointer"
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
              className="flex-1 h-[70px] text-[18px] border border-gray-300 rounded px-4 bg-gray-50 placeholder:text-gray-500"
            />
          </div>
        </div>

        <TextArea
          label="기업 소개"
          name="companyIntro"
          placeholder="기업의 주요 사업 내용과 특징을 입력해주세요"
          register={register}
        />
        <Input label="담당자 성함" name="managerName" placeholder="김오즈" register={register} />
        <Input label="담당자 전화번호" name="managerPhone" placeholder="010-1234-5678" register={register} />
        <Input label="담당자 이메일" name="managerEmail" placeholder="manager@company.com" register={register} />
        <button
          type="submit"
          className="w-full h-[70px] bg-primary text-white text-[20px] md:text-[22px] font-semibold rounded hover:opacity-90 transition"
        >
          회원가입 완료
        </button>
      </div>
    </form>
  );
}

type InputProps = {
  label: string;
  name: keyof CompanyStepTwoValues;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<CompanyStepTwoValues>;
};

function Input({ label, name, type = 'text', placeholder, register }: InputProps) {
  return (
    <div>
      <label className="block mb-5 font-semibold text-[18px] md:text-[22px]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-[70px] text-[22px] border border-gray-300 rounded px-4 bg-white placeholder:text-gray-500"
        {...register(name)}
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  placeholder,
  register,
}: {
  label: string;
  name: keyof CompanyStepTwoValues;
  placeholder?: string;
  register: UseFormRegister<CompanyStepTwoValues>;
}) {
  return (
    <div>
      <label className="block mb-5 font-semibold text-[18px] md:text-[22px]">{label}</label>
      <textarea
        placeholder={placeholder || `${label}을 입력해주세요`}
        className="w-full h-[140px] text-[22px] pt-4 border border-gray-300 rounded px-4 bg-white resize-none placeholder:text-gray-500"
        {...register(name)}
      />
    </div>
  );
}
