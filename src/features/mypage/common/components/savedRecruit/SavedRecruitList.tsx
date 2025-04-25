import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatDate, formatSalary, isDeadlinePassed } from "@/utils/format";
import { BookmarkPlus, ArrowRight, Trash2, Pencil, X } from "lucide-react";
import ScrapBtn from "@/components/ScrapBtn";
import { Heading } from "@/components/ui/Heading";
import type { SavedRecruitListProps } from "@/features/mypage/common/types/savedRecruit.types";
import { ITEMS_PER_PAGE } from "@/features/mypage/common/constants/myPageTab";
import {
  JOB_LIST_STYLES,
  SALARY_TYPE_STYLES,
} from "@/features/mypage/common/constants/savedJobListStyles";

const EmptyState = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center px-12 py-24 mt-6 bg-white border border-gray-100 rounded-xl">
      <BookmarkPlus className="w-16 h-16 mb-6 text-gray-300" strokeWidth={1.5} />
      <Heading sizeOffset={2} className="mb-2 font-semibold text-gray-900">
        저장한 공고가 없습니다
      </Heading>
      <p className="mb-6 text-gray-500">관심있는 공고를 저장하고 모아보세요!</p>
      <button
        onClick={() => router.push("/jobs")}
        className="px-6 py-2.5 text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-1"
      >
        채용공고 보러가기
        <ArrowRight className="w-5 h-5" strokeWidth={2} />
      </button>
    </div>
  );
};

export default function SavedJobList({
  jobs = [],
  currentPage = 1,
  onPageChange,
  onToggleSave,
}: Partial<SavedRecruitListProps>) {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState<Set<string>>(new Set());
  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const currentJobs = jobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSelectAll = () => {
    if (selectedJobs.size === currentJobs.length) {
      setSelectedJobs(new Set());
    } else {
      setSelectedJobs(new Set(currentJobs.map((job) => job.job_posting_id)));
    }
  };

  const handleSelect = (jobId: string) => {
    const newSelected = new Set(selectedJobs);
    if (newSelected.has(jobId)) {
      newSelected.delete(jobId);
    } else {
      newSelected.add(jobId);
    }
    setSelectedJobs(newSelected);
  };

  const handleDelete = () => {
    // TODO: 선택된 공고 삭제 로직 구현
    console.log("Delete jobs:", Array.from(selectedJobs));
    setSelectedJobs(new Set());
    setIsEditMode(false);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedJobs(new Set());
  };

  if (jobs.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={JOB_LIST_STYLES.container}>
      <div className={JOB_LIST_STYLES.header.wrapper}>
        <div className={JOB_LIST_STYLES.header.titleWrapper}>
          <Heading sizeOffset={3} className={JOB_LIST_STYLES.header.title}>
            저장한 공고 목록
          </Heading>
        </div>
        <div className={JOB_LIST_STYLES.header.buttonWrapper}>
          <button
            onClick={toggleEditMode}
            className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:text-gray-900 rounded-lg transition-colors border border-gray-200 hover:border-gray-400 bg-white"
          >
            {isEditMode ? (
              <>
                <X className="w-4 h-4" />
                편집 취소
              </>
            ) : (
              <>
                <Pencil className="w-4 h-4" />
                편집
              </>
            )}
          </button>
          {isEditMode && (
            <button
              onClick={handleDelete}
              disabled={selectedJobs.size === 0}
              className={`flex items-center gap-1 px-3 py-1.5 text-white rounded-lg transition-colors ${
                selectedJobs.size === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              선택 삭제 {selectedJobs.size > 0 && `(${selectedJobs.size}개)`}
            </button>
          )}
        </div>
      </div>

      {/* 웹, 태블릿 뷰 */}
      <div className={JOB_LIST_STYLES.table.wrapper}>
        <div className={JOB_LIST_STYLES.table.container}>
          <div className={JOB_LIST_STYLES.table.header.wrapper}>
            <div
              className={`${JOB_LIST_STYLES.table.header.column.base} ${JOB_LIST_STYLES.table.header.column.action}`}
            >
              {isEditMode ? (
                <input
                  type="checkbox"
                  checked={selectedJobs.size === currentJobs.length && currentJobs.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary"
                />
              ) : (
                <Heading sizeOffset={2} className="font-semibold text-gray-600 whitespace-nowrap">
                  <span className="hidden md:inline">스크랩</span>
                  <span className="md:hidden">★</span>
                </Heading>
              )}
            </div>
            <div
              className={`${JOB_LIST_STYLES.table.header.column.base} ${JOB_LIST_STYLES.table.header.column.info}`}
            >
              <Heading sizeOffset={2} className="font-semibold text-gray-600 whitespace-nowrap">
                <span className="hidden md:inline">회사명/공고제목</span>
                <span className="md:hidden">공고</span>
              </Heading>
            </div>
            <div
              className={`${JOB_LIST_STYLES.table.header.column.base} ${JOB_LIST_STYLES.table.header.column.location}`}
            >
              <Heading sizeOffset={2} className="font-semibold text-gray-600">
                근무지
              </Heading>
            </div>
            <div
              className={`${JOB_LIST_STYLES.table.header.column.base} ${JOB_LIST_STYLES.table.header.column.salary}`}
            >
              <Heading sizeOffset={2} className="font-semibold text-gray-600">
                급여
              </Heading>
            </div>
            <div
              className={`${JOB_LIST_STYLES.table.header.column.base} ${JOB_LIST_STYLES.table.header.column.type}`}
            >
              <Heading sizeOffset={2} className="font-semibold text-gray-600 whitespace-nowrap">
                <span className="hidden md:inline">급여형태</span>
                <span className="md:hidden">형태</span>
              </Heading>
            </div>
            <div
              className={`${JOB_LIST_STYLES.table.header.column.base} ${JOB_LIST_STYLES.table.header.column.deadline}`}
            >
              <Heading sizeOffset={2} className="font-semibold text-gray-600">
                마감일
              </Heading>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {currentJobs.map((job) => (
              <div
                key={job.job_posting_id}
                onClick={() => !isEditMode && router.push(`/jobs/${job.job_posting_id}`)}
                className={JOB_LIST_STYLES.table.row.wrapper}
              >
                <div
                  className={`${JOB_LIST_STYLES.table.row.column.base} ${JOB_LIST_STYLES.table.row.column.action}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {isEditMode ? (
                    <input
                      type="checkbox"
                      checked={selectedJobs.has(job.job_posting_id)}
                      onChange={() => handleSelect(job.job_posting_id)}
                      className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary"
                    />
                  ) : (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave?.(job.job_posting_id);
                      }}
                    >
                      <ScrapBtn />
                    </div>
                  )}
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
            <div key={job.job_posting_id} className={JOB_LIST_STYLES.card.container}>
              {isEditMode ? (
                <div className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    checked={selectedJobs.has(job.job_posting_id)}
                    onChange={() => handleSelect(job.job_posting_id)}
                    className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary"
                  />
                </div>
              ) : null}
              <div
                className="flex items-center gap-3"
                onClick={() => !isEditMode && router.push(`/jobs/${job.job_posting_id}`)}
              >
                {!isEditMode && (
                  <div
                    className={JOB_LIST_STYLES.card.header.scrap}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave?.(job.job_posting_id);
                    }}
                  >
                    <ScrapBtn />
                  </div>
                )}
                <div className="flex-1">
                  <div className={JOB_LIST_STYLES.card.header.wrapper}>
                    <div className={JOB_LIST_STYLES.card.header.content}>
                      <span className={JOB_LIST_STYLES.card.header.company}>{job.companyName}</span>
                      <Heading sizeOffset={1} className={JOB_LIST_STYLES.card.header.title}>
                        {job.job_posting_title}
                      </Heading>
                    </div>
                  </div>

                  <div className={JOB_LIST_STYLES.card.tags.wrapper}>
                    <span className={JOB_LIST_STYLES.card.tags.tag}>{job.location}</span>
                    <span className={JOB_LIST_STYLES.card.tags.tag}>
                      {formatSalary(job.salary)}
                    </span>
                    <span
                      className={`${SALARY_TYPE_STYLES[job.salary_type]} border rounded-full px-1.5 py-0.5`}
                    >
                      {job.salary_type}
                    </span>
                  </div>

                  <div className={JOB_LIST_STYLES.card.deadline.wrapper}>
                    <div
                      className={`${JOB_LIST_STYLES.card.deadline} ${
                        isDeadlinePassed(job.deadline) ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      {isDeadlinePassed(job.deadline) ? "마감" : formatDate(job.deadline)}
                    </div>
                  </div>
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
