"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function JobsNav() {
  const pathname = usePathname();
  const selectedNavBtnClassName = "text-primary font-semibold";
  return (
    <>
      <nav className="bg-gray-z text-black p-4 sticky top-0 z-10">
        <ul className="flex flex-wrap justify-center gap-5">
          <li>
            <Link
              href="/jobs/recommended-jobs"
              className={pathname === "/jobs/recommended-jobs" || "/jobs" ? "font-bold" : ""}
            >
              추천 공고
            </Link>
          </li>
          <li>
            <Link
              href="/jobs/public-jobs"
              className={pathname === "/jobs/public-jobs" ? "font-bold" : ""}
            >
              공공일자리
            </Link>
          </li>
          <li>
            <Link
              href="/jobs/by-location"
              className={pathname === "/jobs/by-location" ? "font-bold" : ""}
            >
              지역별
            </Link>
          </li>
          <li>
            <Link
              href="/jobs/by-field"
              className={pathname === "/jobs/by-field" ? "font-bold" : ""}
            >
              직종별
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
