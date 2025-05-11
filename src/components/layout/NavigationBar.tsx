"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFontSize } from "@/hooks/useFontSize";
import { useAuth } from "@/hooks/useAuth";
import { JoinType } from "@/types/commonUser";

export default function NavigationBar() {
  const pathname = usePathname();
  const { fontSize, increase, decrease } = useFontSize();
  const { user, isUserLoggedIn, logout, hasRole } = useAuth();

  // user 객체에서 필요한 속성 구조분해
  const { id, join_type } = user || { id: "", join_type: undefined as JoinType | undefined };

  // 네비게이션 링크 생성 헬퍼 함수
  const NavLink = ({
    href,
    isActive,
    children,
  }: {
    href: string;
    isActive: boolean;
    children: React.ReactNode;
  }) => (
    <Link href={href} className={`${isActive ? "text-primary font-semibold" : ""} hover:font-bold`}>
      {children}
    </Link>
  );

  // 폰트 크기 조절 버튼 그룹
  const FontSizeButtons = () => (
    <>
      <button
        onClick={decrease}
        className="px-2 py-1 text-sm transition-colors duration-200 border rounded hover:bg-gray-100"
      >
        가-
      </button>
      <button
        onClick={increase}
        className="px-2 py-1 text-sm transition-colors duration-200 border rounded hover:bg-gray-100"
      >
        가+
      </button>
    </>
  );

  // 기업 사용자용 메뉴 아이템
  const CompanyMenuItems = () => (
    <>
      <li>
        <NavLink href="/recruit" isActive={pathname.startsWith("/recruit")}>
          공고관리
        </NavLink>
      </li>
      <li>
        <NavLink href="/applicants" isActive={pathname.startsWith("/applicants")}>
          지원자조회
        </NavLink>
      </li>
    </>
  );

  // 인증된 사용자용 메뉴 아이템
  const AuthenticatedMenuItems = () => (
    <>
      <li>
        <NavLink
          href={join_type ? `/${join_type}/mypage/${id}` : "/mypage"}
          isActive={pathname.startsWith("/mypage")}
        >
          마이페이지
        </NavLink>
      </li>
      <li>
        <button onClick={logout} className="hover:font-bold text-gray-700">
          로그아웃
        </button>
      </li>
    </>
  );

  // 비인증 사용자용 메뉴 아이템
  const UnauthenticatedMenuItems = () => (
    <>
      <li>
        <NavLink href="/auth/login" isActive={pathname === "/auth/login"}>
          로그인
        </NavLink>
      </li>
      <li>
        <NavLink href="/auth/signup" isActive={pathname === "/auth/signup"}>
          회원가입
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="relative p-4 text-black bg-white">
      <div
        className={`flex flex-col md:flex-row justify-center items-center md:items-center max-w-7xl mx-auto gap-3 md:gap-0 ${fontSize}`}
      >
        {/* 로고 및 모바일 폰트 크기 조절 */}
        <div className="flex justify-between w-full text-xl">
          <Link href="/">
            <Image src="/images/logo.png" alt="시니어내일 로고" width={120} height={40} />
          </Link>
          <div className="flex items-center justify-end gap-2 md:hidden lg:hidden">
            <FontSizeButtons />
          </div>
        </div>

        {/* 네비게이션 메뉴 */}
        <div className="flex flex-col flex-wrap items-center justify-end w-full h-full max-w-full gap-2 overflow-x-auto md:flex-nowrap md:flex-row md:gap-4 md:ml-auto whitespace-nowrap">
          <ul className="flex items-center w-full h-full gap-4 justify-evenly">
            {/* 기본 메뉴 항목 */}
            <li>
              <NavLink href="/" isActive={pathname === "/"}>
                홈
              </NavLink>
            </li>
            <li>
              <NavLink href="/jobs" isActive={pathname.startsWith("/jobs")}>
                채용공고
              </NavLink>
            </li>

            {/* 기업 사용자용 메뉴 */}
            {isUserLoggedIn && hasRole("company") && <CompanyMenuItems />}

            {/* 인증 상태에 따른 메뉴 */}
            {isUserLoggedIn ? <AuthenticatedMenuItems /> : <UnauthenticatedMenuItems />}
          </ul>
        </div>

        {/* 데스크톱 폰트 크기 조절 (기업 사용자가 아닌 경우만) */}
        {(!isUserLoggedIn || !hasRole("company")) && (
          <div className="items-center justify-end hidden w-full gap-2 md:flex">
            <FontSizeButtons />
          </div>
        )}
      </div>
    </nav>
  );
}
