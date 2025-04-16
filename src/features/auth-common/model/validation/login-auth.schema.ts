import { z } from "zod";

export const AUTH_VALIDATION = {
  email: {
    message: "유효하지 않은 이메일 형식입니다.",
  },
  password: {
    min: 8,
    max: 16,
    pattern: /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
    messages: {
      format: "비밀번호는 영어 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
      min: "비밀번호는 8자 이상이어야 합니다.",
      max: "비밀번호는 16자 이하여야 합니다.",
    },
  },
};

// 로그인 스키마
export const loginSchema = z.object({
  email: z.string().email(AUTH_VALIDATION.email.message),
  password: z
    .string()
    .min(AUTH_VALIDATION.password.min, AUTH_VALIDATION.password.messages.min)
    .max(AUTH_VALIDATION.password.max, AUTH_VALIDATION.password.messages.max)
    .regex(AUTH_VALIDATION.password.pattern, AUTH_VALIDATION.password.messages.format),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
