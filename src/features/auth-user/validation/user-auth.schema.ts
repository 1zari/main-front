import { z } from "zod";

export const USER_VALIDATION = {
  verificationCode: {
    pattern: /^\d{6}$/,
    message: "인증번호는 6자리 숫자입니다.",
  },
  phone: {
    pattern: /^\d{3}-\d{3,4}-\d{4}$/,
    message: "올바른 전화번호 형식이 아닙니다.",
  },
  email: {
    required: "이메일은 필수입니다.",
    format: "올바른 이메일을 입력해주세요. 예 : user@naver.com",
  },
  password: {
    min: 8,
    max: 16,
    pattern: /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/,
    messages: {
      format: "비밀번호는 8자 이상 16자 이하이며, 영어 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
      min: "비밀번호는 8자 이상이어야 합니다.",
      max: "비밀번호는 16자 이하여야 합니다.",
    },
  },
  name: {
    required: "이름은 필수입니다.",
    max: "최대 15자까지 입력 가능합니다.",
  },
  birth: {
    required: "생년월일은 필수입니다.",
    pattern: /^\d{4}-\d{2}-\d{2}$/,
    message: "입력란을 클릭하여 달력에서 생년월일을 선택해 주세요.",
  },
  preferredLocation: {
    required: "희망 근무지를 입력해주세요.",
    onlyCommaAndText: "쉼표(,) 외 특수문자는 입력할 수 없습니다.",
    commaRequired: "쉼표(,)로 구분하여 입력해주세요. 예: 서울, 경기, 인천",
  },
  purposes: {
    required: "가입 목적을 1개 이상 선택해주세요.",
  },
  channels: {
    required: "유입 경로를 1개 이상 선택해주세요.",
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
  phone: z.string().regex(/^010-\d{4}-\d{4}$/, "올바른 전화번호 형식이 아닙니다."),
  code: z.string().length(6, "인증번호는 6자리 숫자입니다."),
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

// 사용자 회원가입 
export const userSignupSchema = z.object({
  name: z
    .string()
    .min(1, USER_VALIDATION.name.required)
    .max(15, USER_VALIDATION.name.max),
  phone: z
    .string()
    .min(1, "전화번호 인증은 필수입니다.")
    .regex(USER_VALIDATION.phone.pattern, USER_VALIDATION.phone.message),
  verifyCode: z
    .string()
    .min(1, "인증번호는 필수입니다.")
    .length(6, USER_VALIDATION.verificationCode.message)
    .regex(/^\d+$/, "숫자만 입력해주세요."),
  birth: z
    .string()
    .nonempty(USER_VALIDATION.birth.required)
    .refine((val) => USER_VALIDATION.birth.pattern.test(val), {
      message: USER_VALIDATION.birth.message,
    }),
  gender: z.enum(["male", "female"], {
    required_error: "성별을 선택해주세요.",
  }),
  preferredLocation: z
    .string()
    .min(1, USER_VALIDATION.preferredLocation.required)
    .refine((val) => /^[가-힣a-zA-Z\s,]+$/.test(val), {
      message: USER_VALIDATION.preferredLocation.onlyCommaAndText,
    })
    .refine((val) => val.split(",").every((region) => region.trim().length > 0), {
      message: USER_VALIDATION.preferredLocation.commaRequired,
    }),
  interests: z.array(z.string()).optional(),
  purposes: z.array(z.string()).min(1, USER_VALIDATION.purposes.required),
  channels: z.array(z.string()).min(1, USER_VALIDATION.channels.required),
});

export type UserFormValues = z.infer<typeof userSignupSchema>

// 사용자 정보 수정
export const userPasswordEditSchema = z
  .object({
    currentPassword: z.string().min(1, "현재 비밀번호를 입력해주세요."),
    newPassword: z
      .string()
      .min(USER_VALIDATION.password.min, USER_VALIDATION.password.messages.min)
      .max(USER_VALIDATION.password.max, USER_VALIDATION.password.messages.max)
      .regex(USER_VALIDATION.password.pattern, USER_VALIDATION.password.messages.format),
  })

export type UserPasswordEditFormValues = z.infer<typeof userPasswordEditSchema>