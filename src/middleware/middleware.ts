import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = request.nextUrl;

  // next-auth token이 없고, public page가 아니라면 로그인 페이지로
  if (!token && !pathname.startsWith("/auth") && !PUBLIC_FILE.test(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 기업회원 전용 페이지 접근 제한
  if (pathname.startsWith("/company") && token?.join_type !== "company") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"], // 원하는 경로 설정
};
