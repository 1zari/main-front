"use client";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import JobDetailContent from "../../../features/jobs/components/JobDetailContent";
import JobDetailNav from "../../../features/jobs/components/JobDetailNav";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { data: session } = useSession();
  const jobPostingId = params?.id;

  // 2025.06.08) JobDetailNav에 필요한 join_type prop 추가
  const join_type = session?.user?.join_type || "normal";

  return (
    <>
      <div>
        <JobDetailNav join_type={join_type} />
        {jobPostingId && <JobDetailContent jobPostingId={jobPostingId} />}
      </div>
    </>
  );
}
