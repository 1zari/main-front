import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";
import { convertUserSignupData } from "@/utils/formDataConverters";
import type { UserStepTwoValues } from "../ui/signup/UserSignupStepTwoForm";
import type { SignupRequestDto } from "@/types/api/auth";

// 1단계 회원가입
export const useUserSignupStep1 = () => {
  return useMutation({
    mutationFn: (data: SignupRequestDto) => authApi.user.signup(data),
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });
};

// 2단계 회원가입 완료
export const useUserSignupStep2 = () => {
  return useMutation({
    mutationFn: async ({
      data,
      commonUserId,
    }: {
      data: UserStepTwoValues;
      commonUserId: string;
    }) => {
      const signupPayload = convertUserSignupData(data, commonUserId);
      console.log("일반 회원가입 요청 데이터:", signupPayload);
      return authApi.user.completeSignup(signupPayload);
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
