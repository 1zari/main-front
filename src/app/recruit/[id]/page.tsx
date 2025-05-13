import JobDetailContent from "@/features/jobs/components/JobDetailContent";
import { use } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const RecruitEditPage = ({ params }: Props) => {
  const { id: jobPostingId } = use(params);

  if (!jobPostingId) return <p>잘못된 접근입니다.</p>;

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto">
      <h1 className="text-2xl font-bold text-[#0F8C3B] mb-6">채용공고</h1>
      <JobDetailContent jobPostingId={jobPostingId} />
    </div>
  );
};

export default RecruitEditPage;
