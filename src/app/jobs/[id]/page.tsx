"use client";
import { useParams } from "next/navigation";
import JobDetailContent from "../../../features/jobs/components/JobDetailContent";
import JobDetailNav from "../../../features/jobs/components/JobDetailNav";

export default function Page() {
  const params = useParams<{ id: string }>();
  const jobPostingId = params?.id;

  return (
    <>
      <div>
        <JobDetailNav />
        {jobPostingId && <JobDetailContent jobPostingId={jobPostingId} />}
      </div>
    </>
  );
}
