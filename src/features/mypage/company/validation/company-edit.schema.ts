import { z } from "zod";
import { COMPANY_VALIDATION } from "@/features/auth-company/validation/company-auth.schema";

export const companyEditSchema = z.object({
  companyIntro: z
    .string()
    .min(
      COMPANY_VALIDATION.signup.companyIntro.min,
      COMPANY_VALIDATION.signup.companyIntro.required,
    )
    .max(
      COMPANY_VALIDATION.signup.companyIntro.max,
      COMPANY_VALIDATION.signup.companyIntro.tooLong,
    ),
  companyAddress: z
    .string()
    .min(1, COMPANY_VALIDATION.signup.address.required)
    .max(100, COMPANY_VALIDATION.signup.address.tooLong),
  managerName: z
    .string()
    .regex(
      COMPANY_VALIDATION.signup.managerName.pattern,
      COMPANY_VALIDATION.signup.managerName.message,
    ),
  managerPhone: z
    .string()
    .min(11, "전화번호는 필수입니다.")
    .regex(
      COMPANY_VALIDATION.signup.managerPhone.pattern,
      COMPANY_VALIDATION.signup.managerPhone.message,
    ),
  managerEmail: z.string().email(COMPANY_VALIDATION.signup.managerEmail.message),
  companyLogo: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file || file.length === 0 || COMPANY_VALIDATION.signup.file.types.includes(file[0]?.type),
      COMPANY_VALIDATION.signup.file.invalidType,
    )
    .refine(
      (file) =>
        !file || file.length === 0 || file[0]?.size <= COMPANY_VALIDATION.signup.file.maxSize,
      COMPANY_VALIDATION.signup.file.tooBig,
    ),
});

export type CompanyEditFormValues = z.infer<typeof companyEditSchema>;

export const companyPasswordEditSchema = z.object({
  currentPassword: z.string().min(8, "현재 비밀번호를 입력해주세요."),
  newPassword: z
    .string()
    .min(8, "새 비밀번호는 8자 이상이어야 합니다.")
    .max(16, "새 비밀번호는 16자 이하여야 합니다.")
    .regex(
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "영어 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
    ),
});

export type CompanyPasswordEditFormValues = z.infer<typeof companyPasswordEditSchema>;
