"use client";
import { JOBS_LABELS, JOBS_ROUTES } from "@/features/jobs/model/constants/routes";
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
          <li>
            <Link
              href={JOBS_ROUTES.public}
              className={pathname === JOBS_ROUTES.public ? selectedNavBtnClassName : ""}
            >
              {JOBS_LABELS.public}
            </Link>
          </li>
          <li>
            <Link
              href={JOBS_ROUTES.byLocation}
              className={pathname === JOBS_ROUTES.byLocation ? selectedNavBtnClassName : ""}
            >
              {JOBS_LABELS.byLocation}
            </Link>
          </li>
          <li>
            <Link
              href={JOBS_ROUTES.byField}
              className={pathname === JOBS_ROUTES.byField ? selectedNavBtnClassName : ""}
            >
              {JOBS_LABELS.byField}
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
