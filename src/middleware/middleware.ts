import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JoinType } from "@/types/commonUser";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const pathname = request.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const payload = JSON.parse(atob(token.value.split(".")[1]));
  const join_type = payload.join_type as JoinType;

  // 기업 회원 전용 페이지 접근 제한
  if (pathname.startsWith("/company") && join_type !== "company") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
