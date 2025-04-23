"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import {
  companySignupSchema,
  CompanyFormValues,
} from "@/features/auth-company/validation/company-auth.schema";
import FormInput from "@/features/auth-common/components/baseFields/FormInput";
import FormActionInput from "@/features/auth-common/components/baseFields/FormActionInput";
import FormTextArea from "@/features/auth-common/components/baseFields/FormTextArea";
import FormDatePicker from "@/features/auth-common/components/baseFields/FormDatePicker";
import FormFileUpload from "@/features/auth-common/components/baseFields/FormFileUpload";
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
        <h2 className="text-3xl font-semibold">기업 회원정보</h2>
        <div className="w-full max-w-[700px] space-y-6">
          <FormInput<CompanyFormValues>
            label="기업명"
            name="companyName"
            placeholder="시니어내일"
          />
          <FormDatePicker<CompanyFormValues>
            label="개업년월일"
            name="startDate"
            placeholder="입력란을 클릭하여 달력에서 개업년월일을 선택해 주세요."
          />
          <FormInput<CompanyFormValues>
            label="대표자 성함"
            name="representativeName"
            placeholder="박오즈"
          />
          <FormActionInput<CompanyFormValues>
            label="사업자등록번호"
            name="businessNumber"
            placeholder="- 없이 숫자만 입력"
            buttonText="인증 확인"
            onButtonClick={handleBusinessCheck}
          />
          <FormFileUpload<CompanyFormValues> name="businessFile" label="사업자등록증 첨부" />
          <FormFileUpload<CompanyFormValues> name="companyLogo" label="기업 로고 (권장)" />
          <FormTextArea<CompanyFormValues>
            label="기업 소개"
            name="companyIntro"
            placeholder="기업의 주요 사업 내용과 특징을 입력해주세요"
          />
          <FormActionInput<CompanyFormValues>
            label="사업장 주소"
            name="companyAddress"
            placeholder="도로명 주소 검색"
            buttonText="주소 찾기"
            onButtonClick={handleAddressSearch}
          />
          <FormInput<CompanyFormValues>
            label="담당자 성함"
            name="managerName"
            placeholder="김오즈"
          />
          <FormInput<CompanyFormValues>
            label="담당자 전화번호"
            name="managerPhone"
            placeholder="010-1234-5678"
          />
          <FormInput<CompanyFormValues>
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
