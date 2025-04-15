import { z } from "zod";
import {
  passwordSchema,
  phoneSchema,
  verificationCodeSchema,
} from "@/features/auth-common/model/constants/validation";

// 사용자 이메일 찾기 스키마
export const findUserEmailSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  phone: phoneSchema,
  code: verificationCodeSchema,
});
export type FindUserEmailFormValues = z.infer<typeof findUserEmailSchema>;

// 사용자 비밀번호 찾기 스키마
export const findUserPasswordSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  name: z.string().min(1, "이름을 입력해주세요."),
  phone: phoneSchema,
  code: verificationCodeSchema,
  newPassword: passwordSchema,
});
export type FindUserPasswordFormValues = z.infer<typeof findUserPasswordSchema>;
