import { JoinType } from "@/types/commonUser";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const role = token.join_type as JoinType;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/company") && role !== "company") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
