import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import type { JoinType } from "@/types/commonUser";
import { authApi } from "@/api/auth";
import type { LoginResponseDto, CompanyLoginResponseDto } from "@/types/api/auth";

async function authorizeUserLogin({
  credentials,
  loginFn,
  getProfileFn,
}: {
  credentials: Record<"email" | "password" | "join_type", string>;
  loginFn: (
    email: string,
    password: string,
  ) => Promise<{ access_token: string; refresh_token: string }>;
  getProfileFn?: () => Promise<{
    common_user_id: string;
    email: string;
    name: string;
    join_type?: string;
    company_name?: string;
  }>;
}) {
  const { email, password } = credentials;

  if (!email || !password) {
    throw new Error("필수 정보가 누락되었습니다.");
  }

  const response = await loginFn(email, password);

  if (!("user" in response) || !response.user) {
    throw new Error("로그인 응답에 user 정보가 없습니다.");
  }
  const user = response.user as {
    common_user_id: string;
    email: string;
    name?: string;
    company_name?: string;
    join_type: string;
  };

  if (!user.common_user_id || !user.email || !user.join_type) {
    throw new Error("로그인 응답에 필수 정보가 없습니다.");
  }

  if (user.join_type !== credentials.join_type) {
    throw new Error("회원 유형이 일치하지 않습니다.");
  }

  const baseProfile = {
    common_user_id: user.common_user_id,
    email: user.email,
    name: user.name ?? user.company_name ?? "",
    join_type: user.join_type,
  };

  let profile = { ...baseProfile };
  if (getProfileFn) {
    const profileData = await getProfileFn();
    if (!profileData.common_user_id || !profileData.email || !profileData.join_type) {
      throw new Error("프로필 응답에 필수 정보가 없습니다.");
    }
    profile = {
      ...profile,
      common_user_id: profileData.common_user_id,
      email: profileData.email,
      name: profileData.name ?? profileData.company_name ?? profile.name,
      join_type: profileData.join_type,
    };
  }

  return {
    id: profile.common_user_id,
    sub: profile.common_user_id,
    email: profile.email,
    name: profile.name,
    join_type: profile.join_type as JoinType,
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
  };
}

type LoginFn = (
  email: string,
  password: string,
) => Promise<LoginResponseDto | CompanyLoginResponseDto>;

function createCredentialsProvider(id: string, name: string, loginFn: LoginFn) {
  return CredentialsProvider({
    id,
    name,
    credentials: {
      email: { label: "이메일", type: "email" },
      password: { label: "비밀번호", type: "password" },
      join_type: { label: "가입 유형", type: "text" },
    },
    async authorize(credentials) {
      return authorizeUserLogin({ credentials, loginFn });
    },
  });
}

export const authOptions: NextAuthOptions = {
  providers: [
    createCredentialsProvider("user-credentials", "User Credentials", authApi.user.login),
    createCredentialsProvider("company-credentials", "Company Credentials", authApi.company.login),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID ?? "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          redirect_uri: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}api/auth/callback/kakao`,
          response_type: "code",
        },
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID ?? "",
      clientSecret: process.env.NAVER_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          redirect_uri: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}api/auth/callback/naver`,
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // 기존 로그인(로그인 직후)인 경우
      if (user) {
        token.id = user.id;
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.join_type = user.join_type;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        return token;
      }

      // ✅ Kakao/Naver 로그인 후 code로 백엔드에 토큰 요청
      if (account?.provider === "kakao" || account?.provider === "naver") {
        const provider = account.provider;

        const url = `${process.env.NEXT_PUBLIC_API_URL}api/user/oauth/${provider}/login/`;
        const params = new URLSearchParams(account.params as Record<string, string>);
        const code = params.get("code");

        if (!code) {
          throw new Error(`${provider} 로그인 실패: code 없음`);
        }

        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        if (!res.ok) {
          throw new Error(`${provider} 로그인 실패`);
        }

        const data = await res.json();
        const userData = data.user;

        token.id = userData.common_user_id;
        token.sub = userData.common_user_id;
        token.name = userData.name;
        token.email = userData.email;
        token.join_type = userData.join_type;
        token.accessToken = data.access_token;
        token.refreshToken = data.refresh_token;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.join_type = token.join_type as JoinType;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
