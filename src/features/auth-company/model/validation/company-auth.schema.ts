import { z } from "zod";
import {
  businessRegistrationNumberSchema,
  passwordSchema,
  phoneSchema,
  verificationCodeSchema,
} from "@/features/auth-common/model/constants/validation";

// 기업 이메일 찾기 스키마
export const findCompanyEmailSchema = z.object({
  companyName: z.string().min(1, "기업명을 입력해주세요."),
  businessNumber: z.string().regex(/^\d{3}-\d{2}-\d{5}$/, "올바른 사업자등록번호 형식이 아닙니다."),
  phone: phoneSchema,
  code: verificationCodeSchema,
});
export type FindCompanyEmailFormValues = z.infer<typeof findCompanyEmailSchema>;

// 기업 비밀번호 찾기 스키마
export const findCompanyPasswordSchema = z.object({
  email: z.string().email("유효하지 않은 이메일 형식입니다."),
  businessNumber: z.string().regex(/^\d{3}-\d{2}-\d{5}$/, "올바른 사업자등록번호 형식이 아닙니다."),
  phone: phoneSchema,
  code: verificationCodeSchema,
  newPassword: passwordSchema,
});
export type FindCompanyPasswordFormValues = z.infer<typeof findCompanyPasswordSchema>;
