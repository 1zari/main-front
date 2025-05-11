import { z } from "zod";

// 자격 증명 스키마
export const credentialsSchema = z.object({
  email: z.string().email("유효한 이메일이 아닙니다"),
  password: z.string().min(1, "비밀번호는 필수입니다"),
  join_type: z.string(),
});

// 사용자 프로필 스키마
export const userProfileSchema = z.object({
  common_user_id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  company_name: z.string().optional(),
  join_type: z.string(),
});

// 로그인 응답 스키마
export const loginResponseSchema = z.object({
  message: z.string().optional(),
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string().optional(),
  user: userProfileSchema,
});

// 프로필 데이터 스키마
export const profileDataSchema = z.object({
  common_user_id: z.string(),
  email: z.string().email(),
  name: z.string(),
  join_type: z.string().optional(),
  company_name: z.string().optional(),
});
