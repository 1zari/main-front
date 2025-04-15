"use client";

import JobsNav from "@/features/jobs/components/JobsNav";
import { usePathname } from "next/navigation";

export default function JobsNavWrapper() {
  const pathname = usePathname();
  const isDetailPage = pathname.includes("/jobs/detail");

  if (isDetailPage) return null;
  return <JobsNav />;
}
