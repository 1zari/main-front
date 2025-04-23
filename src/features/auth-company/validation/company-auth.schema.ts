import { z } from "zod";

export const COMPANY_VALIDATION = {
  businessRegistrationNumber: {
    pattern: /^\d{10}$/,
    message: "사업자등록번호는 10자리 숫자입니다.",
  },
  phone: {
    pattern: /^\d{3}-\d{3,4}-\d{4}$/,
    message: "올바른 전화번호 형식이 아닙니다.",
  },
  verificationCode: {
    pattern: /^\d{6}$/,
    message: "인증번호는 6자리 숫자입니다.",
  },
  signup: {
    companyName: {
      min: 2,
      max: 50,
      required: "기업명은 필수입니다. 최소 2자 이상 입력해주세요.",
      tooLong: "기업명은 50자 이하여야 합니다.",
    },
    startDate: {
      pattern: /^\d{4}-\d{2}-\d{2}$/,
      required: "개업년월일은 필수입니다.",
      format: "입력란을 클릭하여 달력에서 개업년월일을 선택해 주세요.",
    },
    representativeName: {
      pattern: /^[가-힣]{2,15}$/,
      message: "한글만 입력해주세요. 2자 이상 15자 이하로 입력 가능합니다.",
    },
    companyIntro: {
      min: 10,
      max: 500,
      required: "기업 소개는 필수입니다. 최소 10자 이상 입력해주세요.",
      tooLong: "기업 소개는 500자 이하여야 합니다.",
    },
    address: {
      required: "사업장 주소 입력은 필수입니다.",
      tooLong: "주소는 100자 이하여야 합니다.",
    },
    managerName: {
      pattern: /^[가-힣]{2,15}$/,
      message: "한글만 입력해주세요. 2자 이상 15자 이하로 입력 가능합니다.",
    },
    managerPhone: {
      pattern: /^010-\d{4}-\d{4}$/,
      message: "형식에 맞게 입력해주세요. 예 : 010-1234-5678",
    },
    managerEmail: {
      message: "올바른 이메일을 입력해주세요. 예 : user@naver.com",
    },
    file: {
      types: ["image/png", "image/jpeg", "image/svg+xml"],
      maxSize: 1 * 1024 * 1024,
      invalidType: "PNG, JPG, SVG 형식의 이미지 파일만 업로드 가능합니다.",
      tooBig: "파일 크기는 1MB 이하여야 합니다.",
    },
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

// 기업 회원가입
export const companySignupSchema = z.object({
  companyName: z
    .string()
    .min(COMPANY_VALIDATION.signup.companyName.min, COMPANY_VALIDATION.signup.companyName.required)
    .max(COMPANY_VALIDATION.signup.companyName.max, COMPANY_VALIDATION.signup.companyName.tooLong),
  startDate: z
    .string()
    .nonempty(COMPANY_VALIDATION.signup.startDate.required)
    .refine((val) => COMPANY_VALIDATION.signup.startDate.pattern.test(val), {
      message: COMPANY_VALIDATION.signup.startDate.format,
    }),
  representativeName: z
    .string()
    .regex(
      COMPANY_VALIDATION.signup.representativeName.pattern,
      COMPANY_VALIDATION.signup.representativeName.message,
    ),
  businessNumber: z
    .string()
    .min(10, "사업자등록번호 인증은 필수입니다. 인증을 먼저 진행해주세요.")
    .regex(
      COMPANY_VALIDATION.businessRegistrationNumber.pattern,
      COMPANY_VALIDATION.businessRegistrationNumber.message,
    ),
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
  businessFile: z
    .any()
    .refine((file) => !!file && file.length > 0, "사업자등록증 파일은 필수입니다.")
    .refine(
      (file) => file && file[0] && COMPANY_VALIDATION.signup.file.types.includes(file[0].type),
      COMPANY_VALIDATION.signup.file.invalidType,
    )
    .refine(
      (file) => file && file[0] && file[0].size <= COMPANY_VALIDATION.signup.file.maxSize,
      COMPANY_VALIDATION.signup.file.tooBig,
    ),
});
export type CompanyFormValues = z.infer<typeof companySignupSchema>;
