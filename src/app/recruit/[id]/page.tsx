import JobDetailContent from "@/features/jobs/components/JobDetailContent";

const RecruitEditPage = async ({ params }: { params: { id: string } }) => {
  const jobPostingId = params.id;

  if (!jobPostingId) return <p>잘못된 접근입니다.</p>;

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto">
      <h1 className="text-2xl font-bold text-[#0F8C3B] mb-6">채용공고</h1>
      <JobDetailContent jobPostingId={jobPostingId} />
    </div>
  );
};

export default RecruitEditPage;
