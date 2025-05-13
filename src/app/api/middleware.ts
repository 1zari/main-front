import { UserRole } from "@/types/commonUser";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = JSON.parse(atob(token.split(".")[1]));
  const role = payload.role as UserRole;

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/company") && role !== "company") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // if (pathname.startsWith("/admin") && role !== "admin") {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}
