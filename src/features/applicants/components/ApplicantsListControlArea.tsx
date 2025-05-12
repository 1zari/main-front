interface Props {
  showUnreadOnly: boolean;
  setShowUnreadOnly: (value: boolean) => void;
  selectedJobTitle: string;
  setSelectedJobTitle: (value: string) => void;
  jobPostings: { job_posting_id: string; job_posting_title: string }[];
}

export default function ApplicantsListControlArea({
  showUnreadOnly,
  setShowUnreadOnly,
  selectedJobTitle,
  setSelectedJobTitle,
  jobPostings,
}: Props) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <div className="flex items-center gap-4">
          <select
            className="w-full border px-3 py-2 rounded-md"
            value={selectedJobTitle}
            onChange={(e) => setSelectedJobTitle(e.target.value)}
          >
            <option>채용공고 전체</option>
            {jobPostings.map((post) => (
              <option key={post.job_posting_id}>{post.job_posting_title}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-4">
          <div>
            <select className="border px-3 py-2 rounded-md">
              <option>최신순</option>
              <option>이름순</option>
              <option>지원일순</option>
            </select>
          </div>
          <div className="border px-3 py-2 rounded-md flex items-center h-[40px]">
            <label className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                className="accent-primary"
                onChange={(e) => setShowUnreadOnly(e.target.checked)}
                checked={showUnreadOnly}
              />
              안읽음만 보기
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
