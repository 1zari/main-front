import { z } from "zod";

export const COMPANY_VALIDATION = {
  businessRegistrationNumber: {
    pattern: /^\d{3}-\d{2}-\d{5}$/,
    message: "올바른 사업자등록번호 형식이 아닙니다.",
  },
  phone: {
    pattern: /^\d{3}-\d{3,4}-\d{4}$/,
    message: "올바른 전화번호 형식이 아닙니다.",
  },
  verificationCode: {
    pattern: /^\d{6}$/,
    message: "인증번호는 6자리 숫자여야 합니다.",
  },
};

// 기업 이메일 찾기 스키마
export const findCompanyEmailSchema = z.object({
  companyName: z.string().min(1, "기업명을 입력해주세요."),
  businessNumber: z
    .string()
    .regex(
      COMPANY_VALIDATION.businessRegistrationNumber.pattern,
      COMPANY_VALIDATION.businessRegistrationNumber.message,
    ),
  phone: z.string().regex(COMPANY_VALIDATION.phone.pattern, COMPANY_VALIDATION.phone.message),
  code: z
    .string()
    .regex(
      COMPANY_VALIDATION.verificationCode.pattern,
      COMPANY_VALIDATION.verificationCode.message,
    ),
});

export type FindCompanyEmailFormValues = z.infer<typeof findCompanyEmailSchema>;

// 기업 비밀번호 찾기 스키마
export const findCompanyPasswordSchema = z.object({
  email: z.string().email("유효하지 않은 이메일 형식입니다."),
  businessNumber: z
    .string()
    .regex(
      COMPANY_VALIDATION.businessRegistrationNumber.pattern,
      COMPANY_VALIDATION.businessRegistrationNumber.message,
    ),
  phone: z.string().regex(COMPANY_VALIDATION.phone.pattern, COMPANY_VALIDATION.phone.message),
  code: z
    .string()
    .regex(
      COMPANY_VALIDATION.verificationCode.pattern,
      COMPANY_VALIDATION.verificationCode.message,
    ),
  newPassword: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(16, "비밀번호는 16자 이하여야 합니다.")
    .regex(
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "비밀번호는 영어 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
    ),
});

export type FindCompanyPasswordFormValues = z.infer<typeof findCompanyPasswordSchema>;
