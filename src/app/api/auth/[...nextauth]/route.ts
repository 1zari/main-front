import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import type { JoinType } from "@/types/commonUser";
import { authApi } from "@/api/auth";
import type { UserProfileResponseDto } from "@/types/api/user";
import type { CompanyProfileResponseDto } from "@/types/api/company";
import { API_ENDPOINTS } from "@/constants/apiEndPoints";
import { fetcher } from "@/lib/fetcher";

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "user-credentials",
      name: "User Credentials",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
        join_type: { label: "가입 유형", type: "text" }
      },
      async authorize(credentials) {
        // 환경 변수 로깅
        console.log("Environment configuration:", {
          apiUrl: process.env.NEXT_PUBLIC_API_URL,
          nextAuthUrl: process.env.NEXTAUTH_URL,
          nodeEnv: process.env.NODE_ENV
        });

        if (!credentials?.email || !credentials?.password || !credentials?.join_type) {
          console.error("Missing credentials:", { 
            email: !!credentials?.email, 
            password: !!credentials?.password, 
            join_type: credentials?.join_type 
          });
          throw new Error("이메일과 비밀번호를 모두 입력해주세요.");
        }

        try {
          console.log("Attempting login with endpoint:", API_ENDPOINTS.AUTH.USER.LOGIN);
          
          const loginData = {
            email: credentials.email,
            password: credentials.password,
            join_type: credentials.join_type
          };
          console.log("Login request data:", loginData);

          // fetcher 사용 (타입 지정)
          const data = await fetcher.post<LoginResponse>(API_ENDPOINTS.AUTH.USER.LOGIN, loginData);
          
          console.log("Login success response:", {
            hasAccessToken: !!data.access_token,
            hasRefreshToken: !!data.refresh_token
          });

          if (!data.access_token || !data.refresh_token) {
            console.error("Missing tokens in response:", data);
            throw new Error("인증 토큰이 없습니다.");
          }

          // 사용자 정보 가져오기
          console.log("Fetching user profile from:", API_ENDPOINTS.USER.PROFILE);

          const userInfo = await fetcher.get<UserProfileResponseDto>(API_ENDPOINTS.USER.PROFILE, {
            headers: {
              "Authorization": `Bearer ${data.access_token}`
            }
          });

          console.log("Profile data received:", {
            hasId: !!userInfo.id,
            hasEmail: !!userInfo.email,
            hasName: !!userInfo.name
          });

          return {
            id: userInfo.id,
            email: userInfo.email,
            name: userInfo.name,
            join_type: credentials.join_type as JoinType,
            accessToken: data.access_token,
            refreshToken: data.refresh_token
          };
        } catch (error) {
          console.error("Authorization error:", {
            name: error.name,
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
          });
          
          if (error.response?.status === 401) {
            throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
          }
          
          throw new Error("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
      }
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
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.join_type = user.join_type;
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.join_type = token.join_type as JoinType;
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development"
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
