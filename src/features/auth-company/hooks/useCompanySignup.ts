import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";
import { convertCompanySignupData, convertToCompanyFormData } from "@/utils/formDataConverters";
import type { CompanyStepTwoValues } from "../ui/signup/CompanySignupStepTwoForm";
import type { CompanySignupRequestDto } from "@/types/api/auth";

// 1단계 회원가입
export const useCompanySignupStep1 = () => {
  return useMutation({
    mutationFn: (data: CompanySignupRequestDto) => authApi.company.signup(data),
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
};

// 2단계 회원가입 완료
export const useCompanySignupStep2 = () => {
  return useMutation({
    mutationFn: async ({
      data,
      commonUserId,
    }: {
      data: CompanyStepTwoValues;
      commonUserId: string;
    }) => {
      const signupPayload = convertCompanySignupData(data, commonUserId);
      const formData = convertToCompanyFormData(signupPayload);
      for (const [key, val] of formData.entries()) {
        console.log("FormData:", key, val);
      }
      return authApi.company.completeSignup(formData);
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
