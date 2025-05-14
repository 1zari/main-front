"use client";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import JobDetailContent from "../../../features/jobs/components/JobDetailContent";
import JobDetailNav from "../../../features/jobs/components/JobDetailNav";

export default function Page() {
  const params = useParams<{ id: string }>();
  const jobPostingId = params?.id;
  const { data: session } = useSession();
  const joinType = session?.user?.join_type ?? "";

  return (
    <>
      <div>
        <JobDetailNav join_type={joinType} />
        {jobPostingId && <JobDetailContent jobPostingId={jobPostingId} />}
      </div>
    </>
  );
}
