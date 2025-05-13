"use client";
import { authApi } from "@/api/auth";
import FormActionInput from "@/features/auth-common/components/baseFields/FormActionInput";
import FormAddressSearch from "@/features/auth-common/components/baseFields/FormAddressSearch";
import FormDatePicker from "@/features/auth-common/components/baseFields/FormDatePicker";
import FormFileUpload from "@/features/auth-common/components/baseFields/FormFileUpload";
import FormInput from "@/features/auth-common/components/baseFields/FormInput";
import FormTextArea from "@/features/auth-common/components/baseFields/FormTextArea";
import CompanyTermsAgreement from "@/features/auth-common/components/terms/CompanyTermsAgreement";
import {
  CompanyFormValues,
  companySignupSchema,
} from "@/features/auth-company/validation/company-auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, FormProvider, useForm } from "react-hook-form";

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
      detailAddress: "",
      managerName: "",
      managerPhone: "",
      managerEmail: "",
      businessFile: undefined,
      companyLogo: undefined,
      agreeTerms: false,
    },
  });

  const {
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    control,
  } = methods;

  const repName = watch("representativeName");
  const businessNumber = watch("businessNumber");
  const startDate = watch("startDate");

  const handleBusinessCheck = async () => {
    let hasError = false;
    if (!repName) {
      setError("representativeName", {
        type: "manual",
        message: "대표자 성함을 입력해주세요.",
      });
      hasError = true;
    }
    if (!businessNumber) {
      setError("businessNumber", {
        type: "manual",
        message: "사업자등록번호를 입력해주세요.",
      });
      hasError = true;
    }
    if (!startDate) {
      setError("startDate", {
        type: "manual",
        message: "개업년월일을 선택해주세요.",
      });
      hasError = true;
    }
    if (hasError) return;

    try {
      const d = new Date(startDate);
      if (isNaN(d.getTime())) throw new Error("Invalid date");
      const formatted = d.toISOString().split("T")[0];

      console.log("사업자 인증 요청 payload:", {
        b_no: businessNumber,
        p_nm: repName,
        start_dt: formatted,
      });

      const res = await authApi.verify.checkBusiness(businessNumber, repName, formatted);
      console.log("사업자등록 인증 응답:", res);

      alert(res.valid ? "유효한 사업자 등록 정보입니다." : "유효하지 않은 사업자 등록 정보입니다.");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("요청 URL:", err.config?.url);
        console.error("응답 status:", err.response?.status);
        console.error("응답 data:", err.response?.data);
      } else {
        console.error(err);
      }
      alert("사업자 인증 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-8"
        noValidate
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
            placeholder="달력에서 선택해 주세요."
          />

          <FormInput<CompanyFormValues>
            label="대표자 성함"
            name="representativeName"
            placeholder="박오즈"
          />

          <FormActionInput<CompanyFormValues>
            label="사업자등록번호"
            name="businessNumber"
            placeholder="숫자만 입력"
            buttonText="인증 확인"
            onButtonClick={handleBusinessCheck}
          />

          <FormFileUpload<CompanyFormValues> name="businessFile" label="사업자등록증 첨부" />

          <FormFileUpload<CompanyFormValues> name="companyLogo" label="기업 로고 (권장)" />

          <FormTextArea<CompanyFormValues>
            label="기업 소개"
            name="companyIntro"
            placeholder="기업 주요 사업 내용"
          />

          <FormAddressSearch<CompanyFormValues>
            label="사업장 주소"
            name="companyAddress"
            detailName="detailAddress"
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

          <div className="mb-10">
            <label className="block ml-2 mt-6 font-semibold text-base sm:text-lg">
              필수 약관에 동의해주세요
            </label>
            <Controller
              name="agreeTerms"
              control={control}
              render={({ field }) => <CompanyTermsAgreement onAllAgreedChange={field.onChange} />}
            />
            {errors.agreeTerms && (
              <p className="text-red-500 mt-1 ml-2">{errors.agreeTerms.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-[60px] bg-primary text-white font-semibold rounded hover:opacity-90 transition mt-7"
          >
            회원가입 완료
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
