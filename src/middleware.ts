import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname;
    const token = req.nextauth?.token;

    // 사용자 역할에 따른 접근 제어
    if (path.startsWith("/employer") && token?.role !== "employer") {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (path.startsWith("/user") && token?.role !== "user") {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

// 보호가 필요한 경로 설정
export const config = {
  matcher: [
    // 인증이 필요한 일반 페이지
    "/dashboard/:path*",
    "/profile/:path*",
    // 고용주 전용 페이지
    "/employer/:path*",
    // 일반 사용자 전용 페이지
    "/user/:path*",
    // 추가 보호가 필요한 페이지들
    "/jobs/post/:path*", // 채용공고 작성
    "/jobs/edit/:path*", // 채용공고 수정
    "/applications/:path*", // 지원 내역
  ],
};
