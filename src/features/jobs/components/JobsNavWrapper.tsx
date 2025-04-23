"use client";

import JobsNav from "@/features/jobs/components/JobsNav";
import { usePathname } from "next/navigation";

export default function JobsNavWrapper() {
  const pathname = usePathname();
  const isDetailPage =
    pathname.startsWith("/jobs/") &&
    ![
      "/jobs/by-field",
      "/jobs/by-location",
      "/jobs/public-jobs",
      "/jobs/recommended-jobs",
    ].includes(pathname);

  if (isDetailPage) return null;
  return <JobsNav />;
}
