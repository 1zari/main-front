"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFontSize } from "../hooks/useFontSize";

export default function Navigation() {
  const pathname = usePathname();
  const { fontSize, increase, decrease } = useFontSize();

  return (
    <>
      <nav className="bg-white text-black p-4 relative">
        <div
          className={`flex flex-col md:flex-row justify-between items-start md:items-center max-w-7xl mx-auto gap-3 md:gap-0 ${fontSize}`}
        >
          <div className="w-full flex justify-between text-xl font-bold">
            <Link href="/">
              <Image src="/images/logo.png" alt="시니어내일 로고" width={120} height={40} />
            </Link>
            <div className="flex justify-end gap-2 items-center">
              <button onClick={decrease} className="px-2 py-1 border rounded text-sm hover:bg-gray-100 transition-colors duration-200">
                가-
              </button>
              <button onClick={increase} className="px-2 py-1 border rounded text-sm hover:bg-gray-100 transition-colors duration-200">
                가+
              </button>
            </div>
          </div>
          <div className="w-full justify-end flex flex-wrap md:flex-nowrap flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 md:ml-auto whitespace-nowrap">
            <ul className="flex gap-4">
              <li>
                <Link href="/" className={pathname === "/" ? "text-primary font-semibold" : ""}>
                  홈
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className={pathname.startsWith("/jobs") ? "text-primary font-semibold" : ""}
                >
                  채용공고
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className={pathname === "/auth/login" ? "text-primary font-semibold" : ""}
                >
                  로그인
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className={pathname === "/auth/login" ? "text-primary font-semibold" : ""}
                >
                  기업로그인
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
