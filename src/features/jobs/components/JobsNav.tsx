"use client";
import SearchPage from "@/components/SearchPage";
import { JOBS_LABELS, JOBS_ROUTES } from "@/features/jobs/model/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function JobsNav() {
  const pathname = usePathname();
  const selectedNavBtnClassName = "text-primary font-semibold";
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="bg-gray-z text-black p-4 sticky top-0 z-10 ">
        <ul className="flex flex-wrap justify-center gap-5">
          <li className="flex items-center">
            <Link
              href={JOBS_ROUTES.recommended}
              className={
                pathname === JOBS_ROUTES.recommended || pathname === JOBS_ROUTES.root
                  ? selectedNavBtnClassName
                  : ""
              }
            >
              {JOBS_LABELS.recommended}
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              href={JOBS_ROUTES.public}
              className={pathname === JOBS_ROUTES.public ? selectedNavBtnClassName : ""}
            >
              {JOBS_LABELS.public}
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              href={JOBS_ROUTES.byLocation}
              className={pathname === JOBS_ROUTES.byLocation ? selectedNavBtnClassName : ""}
            >
              {JOBS_LABELS.byLocation}
            </Link>
          </li>
          <li className="flex items-center">
            <Link
              href={JOBS_ROUTES.byField}
              className={pathname === JOBS_ROUTES.byField ? selectedNavBtnClassName : ""}
            >
              {JOBS_LABELS.byField}
            </Link>
          </li>
          <li className="flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-white p-2 rounded-full shadow-sm flex items-center justify-center w-8 h-8"
            >
              <FiSearch size={18} />
            </button>
          </li>
        </ul>
      </nav>
      {isOpen && (
        <div className="fixed inset-0 z-9999 flex justify-center items-end bg-black/40 backdrop-blur-sm">
          <div className="w-full h-full  bg-white rounded-t-2xl p-4 animate-slide-up shadow-lg">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-sm text-gray-400 mb-4 float-right"
            >
              닫기 ✕
            </button>
            <SearchPage setIsOpen={setIsOpen} />
          </div>
        </div>
      )}
    </>
  );
}
