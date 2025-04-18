"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import { companySignupSchema, CompanyFormValues } from "@/features/auth-company/validation/company-auth.schema";
import FormInput from "@/features/auth-common/components/baseFields/FormInput"
import FormActionInput from "@/features/auth-common/components/baseFields/FormActionInput"
import FormTextArea from "@/features/auth-common/components/baseFields/FormTextArea";
import FormDatePicker from "@/features/auth-common/components/baseFields/FormDatePicker"
import "react-datepicker/dist/react-datepicker.css";

export type CompanyStepTwoValues = CompanyFormValues;

type Props = {
  onSubmit: (data: CompanyStepTwoValues) => void;
};

export default function SignupStepTwoCompany({ onSubmit }: Props) {
  const methods = useForm<CompanyFormValues>({
    resolver: zodResolver(companySignupSchema),
    mode: "onBlur",
    defaultValues: {
      companyName: "",
      startDate: "",
      representativeName: "",
      businessNumber: "",
      companyIntro: "",
      companyAddress: "",
      managerName: "",
      managerPhone: "",
      managerEmail: "",
      businessFile: undefined,
      companyLogo: undefined,
    },
  });

  const repName = methods.watch("representativeName");
  const businessNumber = methods.watch("businessNumber");

  const handleBusinessCheck = () => {
    if (!repName) {
      methods.setError("representativeName", {
        type: "manual",
        message: "대표자 성함을 입력해주세요.",
      });
    }
    if (!businessNumber) {
      methods.setError("businessNumber", {
        type: "manual",
        message: "사업자등록번호를 입력해주세요.",
      });
    }

    if (repName && businessNumber) {
      console.log("중복확인 요청", { repName, businessNumber });
    }
  };

  function handleAddressSearch() {
    console.log("주소 검색");
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-8"
      >
        <h2 className="text-3xl font-semibold">기업 회원 정보</h2>
        <div className="w-full max-w-[700px] space-y-6">
          <FormInput
            label="기업명"
            name="companyName"
            placeholder="시니어내일"
          />
          <FormDatePicker
            label="개업년월일"
            name="startDate"
          />
          <FormInput
            label="대표자 성함"
            name="representativeName"
            placeholder="박오즈"
          />
          <FormActionInput
            label="사업자등록번호"
            name="businessNumber"
            placeholder="- 없이 숫자만 입력"
            buttonText="인증 확인"
            onButtonClick={handleBusinessCheck}
          />
          <FileUpload
            name="businessFile"
            label="사업자등록증 첨부"
            error={methods.formState.errors.businessFile?.message as string}
          />
          <FileUpload
            name="companyLogo"
            label="기업 로고 (권장)"
            error={methods.formState.errors.companyLogo?.message as string}
          />
          <FormTextArea
            label="기업 소개"
            name="companyIntro"
            placeholder="기업의 주요 사업 내용과 특징을 입력해주세요"
          />
          <FormActionInput
            label="사업장 주소"
            name="companyAddress"
            placeholder="도로명 주소 검색"
            buttonText="주소 찾기"
            onButtonClick={handleAddressSearch}
          />
          <FormInput
            label="담당자 성함"
            name="managerName"
            placeholder="김오즈"
          />
          <FormInput
            label="담당자 전화번호"
            name="managerPhone"
            placeholder="010-1234-5678"
          />
          <FormInput
            label="담당자 이메일"
            name="managerEmail"
            placeholder="manager@company.com"
          />

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

type FileUploadProps = {
  name: keyof CompanyFormValues;
  label: string;
  error?: string;
};

function FileUpload({ name, label, error }: FileUploadProps) {
  const { register, setError, clearErrors } = useFormContext<CompanyFormValues>();
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileName("");
      setError(name, {
        type: "manual",
        message: "파일을 첨부해주세요.",
      });
      return;
    }

    setFileName(file.name);

    const hasValidExtension = /\.[^/.]+$/.test(file.name);
    const validTypes = ["image/png", "image/jpeg", "image/svg+xml"];

    if (!hasValidExtension) {
      setError(name, {
        type: "manual",
        message: "파일 이름에 확장자가 포함되어야 합니다.",
      });
    } else if (!validTypes.includes(file.type)) {
      setError(name, {
        type: "manual",
        message: "PNG, JPG, SVG 형식만 가능합니다.",
      });
    } else if (file.size > 1 * 1024 * 1024) {
      setError(name, {
        type: "manual",
        message: "파일 크기는 1MB 이하여야 합니다.",
      });
    } else {
      clearErrors(name);
    }
  };

  return (
    <div>
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg whitespace-normal break-keep">
        {label}
      </label>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
        <label
          htmlFor={name}
          className="w-full sm:w-auto h-[60px] px-4 border border-primary text-primary rounded hover:bg-primary hover:text-white transition flex items-center justify-center cursor-pointer text-center whitespace-nowrap"
        >
          파일 선택
        </label>
        <input
          id={name}
          type="file"
          accept="image/png,image/jpeg,image/svg+xml"
          className="hidden"
          {...register(name)}
          onChange={handleFileChange}
        />
        <input
          type="text"
          readOnly
          value={fileName}
          placeholder="파일을 첨부해주세요"
          className="w-full h-[60px] border border-gray-300 rounded px-4 bg-gray-50 text-gray-400 placeholder:text-gray-400 focus:outline-none focus:border-2 focus:border-primary"
        />
      </div>
      {error && <p className="text-red-500 mt-1 ml-2">{error}</p>}
    </div>
  );
}

