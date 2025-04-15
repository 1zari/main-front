import { z } from "zod";

// 비밀번호 유효성 검사 규칙
export const PASSWORD_VALIDATION = {
  min: 8,
  max: 16,
  regex: /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
  message: {
    format: "비밀번호는 영어 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
    min: "비밀번호는 8자 이상이어야 합니다.",
    max: "비밀번호는 16자 이하여야 합니다.",
  },
};

// 인증코드 유효성 검사 규칙
export const VERIFICATION_CODE_VALIDATION = {
  regex: /^\d{6}$/,
  message: "인증번호는 6자리 숫자여야 합니다.",
};

// 전화번호 유효성 검사 규칙
export const PHONE_VALIDATION = {
  regex: /^\d{3}-\d{3,4}-\d{4}$/,
  message: "올바른 전화번호 형식이 아닙니다.",
};

// 사업자등록번호 유효성 검사 규칙
export const BUSINESS_NUMBER_VALIDATION = {
  regex: /^\d{3}-\d{2}-\d{5}$/,
  message: "올바른 사업자등록번호 형식이 아닙니다.",
};

// 공통 zod 스키마
export const passwordSchema = z
  .string()
  .min(8, "비밀번호는 8자 이상이어야 합니다.")
  .max(16, "비밀번호는 16자 이하여야 합니다.")
  .regex(
    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
    "비밀번호는 영어 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
  );

export const verificationCodeSchema = z
  .string()
  .regex(/^\d{6}$/, "인증번호는 6자리 숫자여야 합니다.");

export const phoneSchema = z
  .string()
  .regex(/^\d{3}-\d{3,4}-\d{4}$/, "올바른 전화번호 형식이 아닙니다.");

export const businessRegistrationNumberSchema = z
  .string()
  .regex(/^\d{3}-\d{2}-\d{5}$/, "올바른 사업자등록번호 형식이 아닙니다.");
