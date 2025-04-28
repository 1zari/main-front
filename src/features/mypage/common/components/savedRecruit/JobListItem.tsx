import { formatDate, formatSalary, isPrevious } from "@/utils/format";
import { Heading } from "@/components/ui/Heading";
import ScrapBtn from "@/components/ScrapBtn";
import {
  JOB_LIST_STYLES,
  SALARY_TYPE_STYLES,
} from "@/features/mypage/common/constants/savedJobListStyles";
import type { SavedRecruit } from "@/features/mypage/common/types/savedRecruit.types";

interface JobListItemProps {
  job: SavedRecruit;
  isEditMode: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onToggleSave: (id: string) => void;
  onClick: (id: string) => void;
}

export default function JobListItem({
  job,
  isEditMode,
  isSelected,
  onSelect,
  onToggleSave,
  onClick,
}: JobListItemProps) {
  return (
    <div
      onClick={() => !isEditMode && onClick(job.job_posting_id)}
      className="relative p-4 transition-colors cursor-pointer group hover:bg-gray-50"
    >
      <div className="relative grid grid-cols-1 sm:grid-cols-[10%_32%_15%_15%_13%_15%] sm:items-center">
        <div
          className={`${JOB_LIST_STYLES.table.row.column.base} ${JOB_LIST_STYLES.table.row.column.action} absolute sm:static right-0 top-0`}
          onClick={(e) => e.stopPropagation()}
        >
          {isEditMode ? (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(job.job_posting_id)}
              className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary"
            />
          ) : (
            <div
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(job.job_posting_id);
              }}
            >
              <ScrapBtn />
            </div>
          )}
        </div>

        <div
          className={`${JOB_LIST_STYLES.table.row.column.base} ${JOB_LIST_STYLES.table.row.column.info} col-span-full sm:col-span-1`}
        >
          <span className="block font-medium text-gray-900 break-words">{job.companyName}</span>
          <Heading
            sizeOffset={1}
            className="mt-0.5 font-medium text-gray-900 break-words group-hover:text-primary"
          >
            {job.job_posting_title}
          </Heading>
        </div>

        <div
          className={`${JOB_LIST_STYLES.table.row.column.base} ${JOB_LIST_STYLES.table.row.column.location} mt-3 sm:mt-0`}
        >
          <span className="mr-2 text-gray-500 sm:hidden">근무지</span>
          <span className="text-gray-900 break-words">{job.location}</span>
        </div>

        <div
          className={`${JOB_LIST_STYLES.table.row.column.base} ${JOB_LIST_STYLES.table.row.column.salary}`}
        >
          <span className="mr-2 text-gray-500 sm:hidden">급여</span>
          <span className="text-gray-900">{formatSalary(job.salary)}</span>
        </div>

        <div
          className={`${JOB_LIST_STYLES.table.row.column.base} ${JOB_LIST_STYLES.table.row.column.type}`}
        >
          <span className="mr-2 text-gray-500 sm:hidden">급여 형태</span>
          <span
            className={`${SALARY_TYPE_STYLES[job.salary_type]} border rounded-full px-1.5 py-0.5`}
          >
            {job.salary_type}
          </span>
        </div>

        <div
          className={`${JOB_LIST_STYLES.table.row.column.base} ${JOB_LIST_STYLES.table.row.column.deadline}`}
        >
          <span className="mr-2 text-gray-500 sm:hidden">마감일</span>
          <span className={isPrevious(job.deadline) ? "text-red-500" : "text-gray-900"}>
            {isPrevious(job.deadline) ? "마감" : formatDate(job.deadline)}
          </span>
        </div>
      </div>
    </div>
  );
}
