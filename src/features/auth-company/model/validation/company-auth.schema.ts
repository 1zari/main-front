import { z } from "zod";
import {
  businessRegistrationNumberSchema,
  passwordSchema,
  phoneSchema,
  verificationCodeSchema,
} from "@/features/auth-common/model/constants/validation";

// 기업 이메일 찾기 스키마
export const findCompanyEmailSchema = z.object({
  businessName: z.string().min(1, "기업명을 입력해주세요."),
  businessRegistrationNumber: businessRegistrationNumberSchema,
  phone: phoneSchema,
  code: verificationCodeSchema,
});
export type FindCompanyEmailFormValues = z.infer<typeof findCompanyEmailSchema>;

// 기업 비밀번호 찾기 스키마
export const findCompanyPasswordSchema = z.object({
  businessName: z.string().min(1, "기업명을 입력해주세요."),
  businessRegistrationNumber: businessRegistrationNumberSchema,
  newPassword: passwordSchema,
});
export type FindCompanyPasswordFormValues = z.infer<typeof findCompanyPasswordSchema>;
