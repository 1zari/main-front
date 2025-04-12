"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFontSize } from "../hooks/useFontSize";

export default function Navigation() {
  const pathname = usePathname();
  const { fontSize, increase, decrease } = useFontSize();

  const selectedNavBtnClassName = "text-primary font-semibold";
  const hoverClassName = "hover:font-bold";

  return (
    <>
      <nav className="bg-white text-black p-4 relative">
        <div
          className={`flex flex-col md:flex-row justify-center items-center md:items-center max-w-7xl mx-auto gap-3 md:gap-0 ${fontSize}`}
        >
          <div className="w-full flex justify-between text-xl">
            <Link href="/">
              <Image src="/images/logo.png" alt="시니어내일 로고" width={120} height={40} />
            </Link>
            <div className="flex justify-end gap-2 items-center md:hidden lg:hidden">
              <button
                onClick={decrease}
                className="px-2 py-1 border rounded text-sm hover:bg-gray-100 transition-colors duration-200"
              >
                가-
              </button>
              <button
                onClick={increase}
                className="px-2 py-1 border rounded text-sm hover:bg-gray-100 transition-colors duration-200"
              >
                가+
              </button>
            </div>
          </div>
          <div className="w-full justify-end flex flex-wrap md:flex-nowrap flex-col md:flex-row items-center gap-2 md:gap-4 md:ml-auto whitespace-nowrap overflow-x-auto max-w-full h-full">
            <ul className="w-full flex gap-4 justify-evenly items-center h-full">
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
                  href="/auth/login"
                  className={`${pathname === "/auth/login" ? selectedNavBtnClassName : ""}  ${hoverClassName}`}
                >
                  기업로그인
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full justify-end gap-2 items-center hidden md:flex">
            <button
              onClick={decrease}
              className="px-2 py-1 border rounded text-sm hover:bg-gray-100 transition-colors duration-200"
            >
              가-
            </button>
            <button
              onClick={increase}
              className="px-2 py-1 border rounded text-sm hover:bg-gray-100 transition-colors duration-200"
            >
              가+
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
