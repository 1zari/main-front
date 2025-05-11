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
      console.log("[user-credentials] authorize 입력값:", { email, password });

      const url = "https://senior-naeil.life/api/user/normal/login";
      console.log("[user-credentials] fetch 요청 URL:", url);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log("[user-credentials] fetch response:", response);

      const data = await response.json();
      console.log("[user-credentials] fetch data:", data);

      return {
        id: data.common_user_id,
        sub: data.common_user_id,
        email: data.email,
        name: data.name,
        join_type: data.join_type,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };
    } catch (error) {
      console.error("[user-credentials] authorize error:", error);
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
      console.log("[company-credentials] authorize 입력값:", credentials);

      const { email, password, join_type } = credentialsSchema.parse(credentials);

      const response = await authApi.company.login(email, password);
      console.log("[company-credentials] fetch response:", response);

      const { user, access_token, refresh_token } = loginResponseSchema.parse(response);
      console.log("[company-credentials] fetch data:", { user, access_token, refresh_token });

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
      console.error("[company-credentials] authorize error:", error);
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
