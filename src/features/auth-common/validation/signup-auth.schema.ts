import { z } from "zod";

export const AUTH_VALIDATION = {
  email: {
    required: "이메일을 입력해주세요.",
    format: "유효한 이메일 주소를 입력해주세요.",
  },
  password: {
    min: 8,
    max: 16,
    pattern: /^(?=.*[a-z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,16}$/, // 영문소문자 + 숫자 + 특문
    messages: {
      format: "비밀번호는 영어 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
      min: "비밀번호는 8자 이상이어야 합니다.",
      max: "비밀번호는 16자 이하여야 합니다.",
    },
  },
};

export const signupSchema = z.object({
  email: z.string().min(1, AUTH_VALIDATION.email.required).email(AUTH_VALIDATION.email.format),
  password: z
    .string()
    .min(AUTH_VALIDATION.password.min, AUTH_VALIDATION.password.messages.min)
    .max(AUTH_VALIDATION.password.max, AUTH_VALIDATION.password.messages.max)
    .regex(AUTH_VALIDATION.password.pattern, AUTH_VALIDATION.password.messages.format),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
