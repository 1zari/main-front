import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import { authApi } from "@/api/auth";
import { credentialsSchema, loginResponseSchema } from "./validators";
import { ZodError } from "zod";
import type { JoinType } from "@/types/commonUser";

const userCredentialsProvider = CredentialsProvider({
  id: "user-credentials",
  name: "User Credentials",
  credentials: {
    email: { label: "이메일", type: "email" },
    password: { label: "비밀번호", type: "password" },
    join_type: { label: "가입 유형", type: "text", value: "normal" },
  },
  async authorize(credentials) {
    try {
      const { email, password } = credentials;

      const response = await fetch("https://senior-naeil.life/api/user/normal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log("response", response);

      const data = await response.json();

      return data;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("검증 오류:", error.errors);
        throw new Error(error.errors[0]?.message || "유효성 검증 실패");
      }
      throw error;
    }
  },
});

// 기업 사용자 인증 공급자
const companyCredentialsProvider = CredentialsProvider({
  id: "company-credentials",
  name: "Company Credentials",
  credentials: {
    email: { label: "이메일", type: "email" },
    password: { label: "비밀번호", type: "password" },
    join_type: { label: "가입 유형", type: "text", value: "company" },
  },
  async authorize(credentials) {
    try {
      if (!credentials) return null;

      const { email, password, join_type } = credentialsSchema.parse(credentials);

      const response = await authApi.company.login(email, password);

      const { user, access_token, refresh_token } = loginResponseSchema.parse(response);

      if (user.join_type !== join_type) {
        throw new Error("회원 유형이 일치하지 않습니다.");
      }

      return {
        id: user.common_user_id,
        sub: user.common_user_id,
        email: user.email,
        name: user.company_name ?? "",
        join_type: user.join_type as JoinType,
        accessToken: access_token,
        refreshToken: refresh_token,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("검증 오류:", error.errors);
        throw new Error(error.errors[0]?.message || "유효성 검증 실패");
      }
      throw error;
    }
  },
});

export const providers = [
  userCredentialsProvider,
  companyCredentialsProvider,
  KakaoProvider({
    clientId: process.env.KAKAO_CLIENT_ID ?? "",
    clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "",
  }),
  NaverProvider({
    clientId: process.env.NAVER_CLIENT_ID ?? "",
    clientSecret: process.env.NAVER_CLIENT_SECRET ?? "",
  }),
];
