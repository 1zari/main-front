import { z } from "zod";

export const USER_VALIDATION = {
  verificationCode: {
    pattern: /^\d{6}$/,
    message: "인증번호는 6자리 숫자여야 합니다.",
  },
  phone: {
    pattern: /^\d{3}-\d{3,4}-\d{4}$/,
    message: "올바른 전화번호 형식이 아닙니다.",
  },
};

// 사용자 이메일 찾기 스키마
export const findUserEmailSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  phone: z.string().regex(USER_VALIDATION.phone.pattern, USER_VALIDATION.phone.message),
  code: z
    .string()
    .regex(USER_VALIDATION.verificationCode.pattern, USER_VALIDATION.verificationCode.message),
});

export type FindUserEmailFormValues = z.infer<typeof findUserEmailSchema>;

// 사용자 비밀번호 찾기 스키마
export const findUserPasswordSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  name: z.string().min(1, "이름을 입력해주세요."),
  phone: z.string().regex(USER_VALIDATION.phone.pattern, USER_VALIDATION.phone.message),
  code: z
    .string()
    .regex(USER_VALIDATION.verificationCode.pattern, USER_VALIDATION.verificationCode.message),
  newPassword: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(16, "비밀번호는 16자 이하여야 합니다.")
    .regex(
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "비밀번호는 영어 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
    ),
});

export type FindUserPasswordFormValues = z.infer<typeof findUserPasswordSchema>;
