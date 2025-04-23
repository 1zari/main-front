"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  companyEditSchema,
  companyPasswordEditSchema,
  CompanyEditFormValues,
  CompanyPasswordEditFormValues,
} from "@/features/mypage/company/validation/company-edit.schema";
import { MOCK_COMPANY1 } from "@/features/auth-common/mock/auth.mock";
import FormInput from "@/features/auth-common/components/baseFields/FormInput";
import FormTextArea from "@/features/auth-common/components/baseFields/FormTextArea";
import FormDatePicker from "@/features/auth-common/components/baseFields/FormDatePicker";
import FormFileUpload from "@/features/auth-common/components/baseFields/FormFileUpload";
import PasswordChangeForm from "./PasswordChangeForm";

export default function CompanyInformationEdit({
  onSubmit = (data) => console.log("기업 정보 수정 요청", data),
  defaultValues = MOCK_COMPANY1,
}: {
  onSubmit?: (data: CompanyEditFormValues) => void;
  defaultValues?: typeof MOCK_COMPANY1;
}) {
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const methods = useForm<CompanyEditFormValues>({
    resolver: zodResolver(companyEditSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const passwordForm = useForm<CompanyPasswordEditFormValues>({
    resolver: zodResolver(companyPasswordEditSchema),
    mode: "onBlur",
  });

  const { handleSubmit } = methods;

  const handlePasswordSubmit = (data: CompanyPasswordEditFormValues) => {
    console.log("비밀번호 변경 요청", data);
    setShowPasswordChange(false);
  };

  return (
    <div className="flex justify-center items-center flex-1">
      <div className="bg-white rounded-lg shadow-md px-10 py-[100px] w-full max-w-[1000px]">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-8">
            <h2 className="text-3xl font-semibold">기업회원 정보수정</h2>
            <div className="w-full max-w-[700px] space-y-6">
              <FormInput label="기업명" name="companyName" disabled />
              {showPasswordChange ? (
                <FormProvider {...passwordForm}>
                  <div className="space-y-6">
                    <PasswordChangeForm onCancel={() => setShowPasswordChange(false)} />
                    <button
                      type="button"
                      onClick={() => passwordForm.handleSubmit(handlePasswordSubmit)()}
                      className="w-full h-[60px] bg-primary text-white font-semibold rounded hover:opacity-90 transition"
                    >
                      비밀번호 변경하기
                    </button>
                  </div>
                </FormProvider>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPasswordChange(true)}
                  className="w-full h-[60px] border border-primary text-primary font-medium rounded hover:bg-primary hover:text-white transition"
                >
                  비밀번호 변경하기
                </button>
              )}
              <FormDatePicker label="개업년월일" name="startDate" disabled />
              <FormInput label="대표자 성함" name="representativeName" disabled />
              <FormInput label="사업자등록번호" name="businessNumber" disabled />

              <FormInput
                label="사업자등록증"
                name="businessFile"
                value="사업자등록증_샘플.pdf"
                disabled
              />

              <FormFileUpload name="companyLogo" label="기업 로고 (수정 가능)" />

              <FormTextArea
                label="기업 소개"
                name="companyIntro"
                placeholder="기업의 주요 사업 내용과 특징을 입력해주세요"
              />
              <FormInput label="사업장 주소" name="companyAddress" placeholder="도로명 주소 입력" />
              <FormInput label="담당자 성함" name="managerName" placeholder="김오즈" />
              <FormInput label="담당자 전화번호" name="managerPhone" placeholder="010-1234-5678" />
              <FormInput
                label="담당자 이메일"
                name="managerEmail"
                placeholder="manager@company.com"
              />

              <div className="flex gap-4 mt-7">
                <button
                  type="button"
                  onClick={() => {
                    console.log("수정 취소");
                  }}
                  className="w-full h-[60px] bg-gray-200 text-gray-700 font-semibold rounded hover:bg-gray-300 transition"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="w-full h-[60px] bg-primary text-white font-semibold rounded hover:opacity-90 transition"
                >
                  정보 수정하기
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
