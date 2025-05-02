import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { UserBase } from "@/types/commonUser";
import type { UserRole } from "@/types/commonUser";

// 목업 데이터
const MOCK_USERS = [
  {
    id: "user1",
    email: "user@example.com",
    password: "test1111@",
    role: "user" as UserRole,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "company1",
    email: "company@example.com",
    password: "test2222@",
    role: "company" as UserRole,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "user-credentials",
      name: "User Credentials",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("Attempting user login with:", {
          email: credentials?.email,
          providerId: req?.body?.providerId,
          type: "user",
        });

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          throw new Error("필수 정보가 누락되었습니다.");
        }

        // 목업 데이터에서 사용자 찾기
        const user = MOCK_USERS.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password &&
            u.role === "user",
        );

        console.log("Found user:", user ? "yes" : "no");
        console.log("Password match:", user?.password === credentials.password ? "yes" : "no");

        if (!user) {
          throw new Error("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          accessToken: "mock_access_token",
          refreshToken: "mock_refresh_token",
          created_at: user.created_at,
          updated_at: user.updated_at,
        };
      },
    }),
    CredentialsProvider({
      id: "company-credentials",
      name: "Company Credentials",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("Attempting company login with:", {
          email: credentials?.email,
          providerId: req?.body?.providerId,
          type: "company",
        });

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          throw new Error("필수 정보가 누락되었습니다.");
        }

        // 목업 데이터에서 기업 사용자 찾기
        const user = MOCK_USERS.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password &&
            u.role === "company",
        );

        console.log("Found company:", user ? "yes" : "no");
        console.log("Password match:", user?.password === credentials.password ? "yes" : "no");

        if (!user) {
          throw new Error("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          accessToken: "mock_access_token",
          refreshToken: "mock_refresh_token",
          created_at: user.created_at,
          updated_at: user.updated_at,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as UserBase;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as UserBase;
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
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
