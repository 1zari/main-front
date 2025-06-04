"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SignupStepOneForm from "@/features/auth-common/ui/signup/CommonSignupStepOneForm";
import { SignupFormValues } from "@/features/auth-common/validation/signup-auth.schema";
import SignupStepTwoCompany, { CompanyStepTwoValues } from "./CompanySignupStepTwoForm";
import { authApi } from "@/api/auth";
import { useModalStore } from "@/store/useModalStore";
import {
  handleSignupError,
  handleFileValidationError,
  showSignupSuccessModal,
} from "@/utils/errorHandlers";
import {
  convertCompanySignupData,
  convertToCompanyFormData,
  validateDate,
} from "@/utils/formDataConverters";

export default function SignupFormCompany() {
  const router = useRouter();
  const showModal = useModalStore((s) => s.showModal);
  const [step, setStep] = useState<1 | 2>(1);
  const [stepOneData, setStepOneData] = useState<SignupFormValues | null>(null);
  const [commonUserId, setCommonUserId] = useState<string | null>(null);

  return (
    <div className="flex justify-center items-center flex-1">
      <div className="bg-white rounded-lg shadow-md px-10 py-[100px] w-full max-w-[1000px]">
        {step === 1 ? (
          <SignupStepOneForm
            userType="company"
            onNext={async (data) => {
              try {
                const res = await authApi.company.signup({
                  email: data.email,
                  password: data.password,
                  join_type: "company",
                  company_name: "-",
                  business_number: "-",
                  representative_name: "-",
                  phone_number: "-",
                });
                console.log("1단계 회원가입 성공:", res);

                setStepOneData(data);
                setCommonUserId(res.common_user_id);
                setStep(2);
              } catch (err) {
                handleSignupError(err, showModal, router);
              }
            }}
          />
        ) : (
          <SignupStepTwoCompany
            onSubmit={async (data: CompanyStepTwoValues) => {
              if (!stepOneData || !commonUserId) return;

              const businessFile = data.businessFile?.[0];
              if (!businessFile) {
                handleFileValidationError("business", showModal, router);
                return;
              }

              if (!validateDate(data.startDate)) {
                handleFileValidationError("birth", showModal, router);
                return;
              }

              try {
                const signupPayload = convertCompanySignupData(data, commonUserId);
                const formData = convertToCompanyFormData(signupPayload);

                for (const [key, val] of formData.entries()) {
                  console.log("FormData:", key, val);
                }

                await authApi.company.completeSignup(formData);
                console.log("기업회원 가입 최종 완료");
                showSignupSuccessModal(data.companyName, showModal, router);
              } catch (err) {
                handleSignupError(err, showModal, router);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
