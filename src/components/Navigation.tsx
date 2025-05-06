"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useFontSize } from "../hooks/useFontSize";
import { useSession, signOut } from "next-auth/react";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { fontSize, increase, decrease } = useFontSize();
  const { data: session, status } = useSession();

  const selectedNavBtnClassName = "text-primary font-semibold";
  const hoverClassName = "hover:font-bold";

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <nav className="relative p-4 text-black bg-white">
      <div
        className={`flex flex-col md:flex-row justify-center items-center md:items-center max-w-7xl mx-auto gap-3 md:gap-0 ${fontSize}`}
      >
        <div className="flex justify-between w-full text-xl">
          <Link href="/">
            <Image src="/images/logo.png" alt="시니어내일 로고" width={120} height={40} />
          </Link>
          <div className="flex items-center justify-end gap-2 md:hidden lg:hidden">
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
          </div>
        </div>
        <div className="flex flex-col flex-wrap items-center justify-end w-full h-full max-w-full gap-2 overflow-x-auto md:flex-nowrap md:flex-row md:gap-4 md:ml-auto whitespace-nowrap">
          <ul className="flex items-center w-full h-full gap-4 justify-evenly">
            <li>
              <Link
                href="/"
                className={`${pathname === "/" ? selectedNavBtnClassName : ""}  ${hoverClassName}`}
              >
                홈
              </Link>
            </li>
            <li>
              <Link
                href="/jobs"
                className={`${pathname.startsWith("/jobs") ? selectedNavBtnClassName : ""}  ${hoverClassName}`}
              >
                채용공고
              </Link>
            </li>
            {status === "authenticated" && session ? (
              <>
                <li>
                  <Link
                    href={`/${session.user.join_type}/mypage/${session.user.id}`}
                    className={`${pathname.startsWith("/mypage") ? selectedNavBtnClassName : ""}  ${hoverClassName}`}
                  >
                    마이페이지
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className={`${hoverClassName} text-gray-700`}
                  >
                    로그아웃
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/auth/login"
                    className={`${pathname === "/auth/login" ? selectedNavBtnClassName : ""}  ${hoverClassName}`}
                  >
                    로그인
                  </Link>
                </li>
                <li>
                  <Link
                    href="/auth/signup"
                    className={`${pathname === "/auth/signup" ? selectedNavBtnClassName : ""}  ${hoverClassName}`}
                  >
                    회원가입
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="items-center justify-end hidden w-full gap-2 md:flex">
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
        </div>
      </div>
    </nav>
  );
}
