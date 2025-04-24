import { useRouter } from "next/navigation";
import { formatDate, formatSalary, isDeadlinePassed } from "@/utils/format";
import ScrapBtn from "@/components/ScrapBtn";
import { Heading } from "@/components/ui/Heading";
import type { SavedJobListProps } from "@/features/mypage/common/types/savedJob.types";
import { ITEMS_PER_PAGE } from "@/features/mypage/common/constants/myPageTab";
import {
  JOB_LIST_STYLES,
  SALARY_TYPE_STYLES,
} from "@/features/mypage/common/constants/savedJobListStyles";

export default function SavedJobList({
  jobs = [],
  currentPage = 1,
  onPageChange,
  onToggleSave,
}: Partial<SavedJobListProps>) {
  const router = useRouter();
  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const currentJobs = jobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className={JOB_LIST_STYLES.container}>
      <div className={JOB_LIST_STYLES.header.wrapper}>
        <Heading sizeOffset={3} className={JOB_LIST_STYLES.header.title}>
          저장한 공고 목록
        </Heading>
      </div>

      {/* 웹, 태블릿 뷰 */}
      <div className={JOB_LIST_STYLES.table.wrapper}>
        <div className={JOB_LIST_STYLES.table.container}>
          <div className={JOB_LIST_STYLES.table.header.wrapper}>
            <div
              className={`${JOB_LIST_STYLES.table.header.column.base} ${JOB_LIST_STYLES.table.header.column.scrap}`}
            >
              스크랩
            </div>
            <div
              className={`${JOB_LIST_STYLES.table.header.column.base} ${JOB_LIST_STYLES.table.header.column.info}`}
            >
              회사명/공고제목
            </div>
            <div
              className={`${JOB_LIST_STYLES.table.header.column.base} ${JOB_LIST_STYLES.table.header.column.location}`}
            >
              근무지
            </div>
            <div
              className={`${JOB_LIST_STYLES.table.header.column.base} ${JOB_LIST_STYLES.table.header.column.salary}`}
            >
              급여
            </div>
            <div
              className={`${JOB_LIST_STYLES.table.header.column.base} ${JOB_LIST_STYLES.table.header.column.type}`}
            >
              급여형태
            </div>
            <div
              className={`${JOB_LIST_STYLES.table.header.column.base} ${JOB_LIST_STYLES.table.header.column.deadline}`}
            >
              마감일
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {currentJobs.map((job) => (
              <div
                key={job.job_posting_id}
                onClick={() => router.push(`/jobs/${job.job_posting_id}`)}
                className={JOB_LIST_STYLES.table.row.wrapper}
              >
                <div
                  className={`${JOB_LIST_STYLES.table.row.column.base} ${JOB_LIST_STYLES.table.row.column.scrap}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave?.(job.job_posting_id);
                  }}
                >
                  <ScrapBtn />
                </div>
                <div
                  className={`${JOB_LIST_STYLES.table.row.column.base} ${JOB_LIST_STYLES.table.row.column.info}`}
                >
                  <span className="font-medium text-gray-900 break-words">{job.companyName}</span>
                  <Heading
                    sizeOffset={1}
                    className="mt-0.5 font-medium text-gray-900 break-words group-hover:text-primary"
                  >
                    {job.job_posting_title}
                  </Heading>
                </div>
                <div
                  className={`${JOB_LIST_STYLES.table.row.column.base} ${JOB_LIST_STYLES.table.row.column.location}`}
                >
                  <span className="text-center break-words">{job.location}</span>
                </div>
                <div
                  className={`${JOB_LIST_STYLES.table.row.column.base} ${JOB_LIST_STYLES.table.row.column.salary}`}
                >
                  <div className="text-center break-words">{formatSalary(job.salary)}</div>
                </div>
                <div
                  className={`${JOB_LIST_STYLES.table.row.column.base} ${JOB_LIST_STYLES.table.row.column.type}`}
                >
                  <span
                    className={`${SALARY_TYPE_STYLES[job.salary_type]} border rounded-full px-1.5 py-0.5`}
                  >
                    {job.salary_type}
                  </span>
                </div>
                <div
                  className={`${JOB_LIST_STYLES.table.row.column.base} ${JOB_LIST_STYLES.table.row.column.deadline}`}
                >
                  <div
                    className={isDeadlinePassed(job.deadline) ? "text-red-500" : "text-gray-600"}
                  >
                    {isDeadlinePassed(job.deadline) ? "마감" : formatDate(job.deadline)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 모바일 뷰 */}
      <div className={JOB_LIST_STYLES.card.wrapper}>
        <div className="space-y-4">
          {currentJobs.map((job) => (
            <div
              key={job.job_posting_id}
              onClick={() => router.push(`/jobs/${job.job_posting_id}`)}
              className={JOB_LIST_STYLES.card.container}
            >
              <div className={JOB_LIST_STYLES.card.header.wrapper}>
                <div className={JOB_LIST_STYLES.card.header.content}>
                  <span className={JOB_LIST_STYLES.card.header.company}>{job.companyName}</span>
                  <Heading sizeOffset={1} className={JOB_LIST_STYLES.card.header.title}>
                    {job.job_posting_title}
                  </Heading>
                </div>
                <div
                  className={JOB_LIST_STYLES.card.header.scrap}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave?.(job.job_posting_id);
                  }}
                >
                  <ScrapBtn />
                </div>
              </div>

              <div className={JOB_LIST_STYLES.card.tags.wrapper}>
                <span className={JOB_LIST_STYLES.card.tags.tag}>{job.location}</span>
                <span className={JOB_LIST_STYLES.card.tags.tag}>{formatSalary(job.salary)}</span>
                <span
                  className={`${SALARY_TYPE_STYLES[job.salary_type]} border rounded-full px-1.5 py-0.5`}
                >
                  {job.salary_type}
                </span>
              </div>

              <div className={JOB_LIST_STYLES.card.deadline.wrapper}>
                <div
                  className={`${JOB_LIST_STYLES.card.deadline.text} ${
                    isDeadlinePassed(job.deadline) ? "text-red-500" : "text-gray-600"
                  }`}
                >
                  {isDeadlinePassed(job.deadline) ? "마감" : formatDate(job.deadline)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange?.(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
