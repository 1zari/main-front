"use client";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SIGNUP_CONSTANTS } from "@/constants/signup";
import { useBusinessVerification } from "@/hooks/useBusinessVerification";
import {
  companySignupSchema,
  CompanyFormValues,
} from "@/features/auth-company/validation/company-auth.schema";
import FormInput from "@/features/auth-common/components/baseFields/FormInput";
import FormDatePicker from "@/features/auth-common/components/baseFields/FormDatePicker";
import FormActionInput from "@/features/auth-common/components/baseFields/FormActionInput";
import FormFileUpload from "@/features/auth-common/components/baseFields/FormFileUpload";
import FormTextArea from "@/features/auth-common/components/baseFields/FormTextArea";
import FormAddressSearch from "@/features/auth-common/components/baseFields/FormAddressSearch";
import CompanyTermsAgreement from "@/features/auth-common/components/terms/CompanyTermsAgreement";

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

  const businessVerification = useBusinessVerification({
    setError,
    representativeNameField: "representativeName",
    businessNumberField: "businessNumber",
    startDateField: "startDate",
  });

  const handleBusinessCheck = async () => {
    await businessVerification.verifyBusiness(repName, businessNumber, startDate);
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
            placeholder={SIGNUP_CONSTANTS.PLACEHOLDERS.COMPANY_NAME}
          />

          <FormDatePicker<CompanyFormValues>
            label="개업년월일"
            name="startDate"
            placeholder={SIGNUP_CONSTANTS.PLACEHOLDERS.COMPANY_START_DATE}
          />

          <FormInput<CompanyFormValues>
            label="대표자 성함"
            name="representativeName"
            placeholder={SIGNUP_CONSTANTS.PLACEHOLDERS.COMPANY_REPRESENTATIVE}
          />

          <FormActionInput<CompanyFormValues>
            label="사업자등록번호"
            name="businessNumber"
            placeholder={SIGNUP_CONSTANTS.PLACEHOLDERS.COMPANY_BUSINESS_NUMBER}
            buttonText={SIGNUP_CONSTANTS.BUTTON_TEXT.VERIFY_BUSINESS}
            onButtonClick={handleBusinessCheck}
          />

          <FormFileUpload<CompanyFormValues> name="businessFile" label="사업자등록증 첨부" />

          <FormFileUpload<CompanyFormValues> name="companyLogo" label="기업 로고 (권장)" />

          <FormTextArea<CompanyFormValues>
            label="기업 소개"
            name="companyIntro"
            placeholder={SIGNUP_CONSTANTS.PLACEHOLDERS.COMPANY_INTRO}
          />

          <FormAddressSearch<CompanyFormValues>
            label="사업장 주소"
            name="companyAddress"
            detailName="detailAddress"
          />

          <FormInput<CompanyFormValues>
            label="담당자 성함"
            name="managerName"
            placeholder={SIGNUP_CONSTANTS.PLACEHOLDERS.COMPANY_MANAGER_NAME}
          />

          <FormInput<CompanyFormValues>
            label="담당자 전화번호"
            name="managerPhone"
            placeholder={SIGNUP_CONSTANTS.PLACEHOLDERS.COMPANY_MANAGER_PHONE}
          />

          <FormInput<CompanyFormValues>
            label="담당자 이메일"
            name="managerEmail"
            placeholder={SIGNUP_CONSTANTS.PLACEHOLDERS.COMPANY_MANAGER_EMAIL}
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
            {SIGNUP_CONSTANTS.BUTTON_TEXT.COMPLETE_SIGNUP}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
