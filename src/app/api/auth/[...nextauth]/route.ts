import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

interface User {
  id: string;
  email: string;
  role: string;
}

interface CustomToken extends JWT {
  user: User;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
            role: credentials?.role,
          }),
        });

        const user = await res.json();

        if (!res.ok || !user) return null;

        // 역할이 일치하는지 확인
        if (user.role !== credentials?.role) {
          throw new Error("해당 회원 유형으로 로그인할 수 없습니다.");
        }

        return user as User;
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user, account }): Promise<CustomToken> {
      if (user) {
        // 소셜 로그인의 경우 자동으로 "user" 역할 부여
        if (account?.provider === "kakao" || account?.provider === "naver") {
          (token as CustomToken).user = {
            id: user.id,
            email: user.email,
            role: "user", // 소셜 로그인은 항상 "user" 역할
          };
        } else {
          // 일반 로그인의 경우
          (token as CustomToken).user = {
            id: user.id,
            email: user.email,
            role: user.role,
          };
        }
      }
      return token as CustomToken;
    },
    async session({ session, token }) {
      const customToken = token as CustomToken;
      session.user = {
        id: customToken.user.id,
        email: customToken.user.email,
        role: customToken.user.role,
      };
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "kakao" || account?.provider === "naver") {
        try {
          // 소셜 로그인 사용자 정보 저장 또는 업데이트
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/social/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              provider: account.provider,
              role: "user", // 소셜 로그인은 항상 "user" 역할
            }),
          });

          if (!response.ok) {
            throw new Error("소셜 로그인 처리 중 오류가 발생했습니다.");
          }

          return true;
        } catch (error) {
          console.error("Social login error:", error);
          return false;
        }
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30일
    updateAge: 24 * 60 * 60, // 24시간
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
