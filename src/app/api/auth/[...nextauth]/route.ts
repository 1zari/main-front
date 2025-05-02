import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import type { JoinType } from "@/types/commonUser";
import { authApi } from "@/api/auth";
import type { UserProfileResponseDto } from "@/types/api/user";
import type { CompanyProfileResponseDto } from "@/types/api/company";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "user-credentials",
      name: "User Credentials",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("필수 정보가 누락되었습니다.");
        }

        try {
          // 1. 로그인하여 토큰 받기
          const response = await authApi.user.login(credentials.email, credentials.password);

          // 2. 토큰을 저장
          authApi.setTokens(response.access_token, response.refresh_token);

          // 3. 사용자 정보 가져오기
          const userInfo = (await authApi.user.getProfile()) as UserProfileResponseDto;

          return {
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.name,
            join_type: userInfo.join_type,
            image: null,
          };
        } catch (error) {
          console.error("Login error:", error);
          throw new Error("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        }
      },
    }),
    CredentialsProvider({
      id: "company-credentials",
      name: "Company Credentials",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("필수 정보가 누락되었습니다.");
        }

        try {
          // 1. 로그인하여 토큰 받기
          const response = await authApi.company.login(credentials.email, credentials.password);

          // 2. 토큰을 저장
          authApi.setTokens(response.access_token, response.refresh_token);

          // 3. 기업 정보 가져오기
          const companyInfo = (await authApi.company.getProfile()) as CompanyProfileResponseDto;

          return {
            id: companyInfo.id,
            email: companyInfo.email,
            name: companyInfo.company_name,
            join_type: companyInfo.join_type,
            image: null,
          };
        } catch (error) {
          console.error("Login error:", error);
          throw new Error("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID ?? "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID ?? "",
      clientSecret: process.env.NAVER_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // 기업회원은 소셜 로그인 차단
      if (account?.provider !== "company-credentials" && user.join_type === "company") {
        return false;
      }

      // 소셜 로그인 시 추가 정보 입력이 필요한 경우
      if (account?.provider && "message" in user && user.message === "추가 정보 입력 필요") {
        // 추가 정보 입력 페이지로 리다이렉트
        return `/auth/social/complete?email=${user.email}&provider=${account.provider}`;
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.join_type = user.join_type;
        token.id = user.id;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.join_type = token.join_type as JoinType;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
