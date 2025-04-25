import { Star } from "lucide-react";
import { JOB_LIST_STYLES } from "@/features/mypage/common/constants/savedJobListStyles";
import { SAVED_RECRUIT_TEXT } from "@/features/mypage/common/constants/savedRecruit";
import type { SavedRecruit } from "@/features/mypage/common/types/savedRecruit.types";
import { formatDate } from "@/utils/format";

interface TableViewProps {
  isEditMode: boolean;
  savedRecruits: SavedRecruit[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleScrap: (id: string) => void;
}

export default function TableView({
  isEditMode,
  savedRecruits,
  selectedIds,
  onToggleSelect,
  onToggleScrap,
}: TableViewProps) {
  return (
    <div className={JOB_LIST_STYLES.table.wrapper}>
      <div className={JOB_LIST_STYLES.table.container}>
        <div className={JOB_LIST_STYLES.table.header.wrapper}>
          {isEditMode ? (
            <div className={JOB_LIST_STYLES.table.header.column.action} />
          ) : (
            <div className={JOB_LIST_STYLES.table.header.column.action}>
              <span className="hidden md:inline">{SAVED_RECRUIT_TEXT.COLUMN.DESKTOP.SCRAP}</span>
              <span className="md:hidden">★</span>
            </div>
          )}
          <div className={JOB_LIST_STYLES.table.header.column.info}>
            <span className="hidden md:inline">{SAVED_RECRUIT_TEXT.COLUMN.DESKTOP.INFO}</span>
            <span className="md:hidden">{SAVED_RECRUIT_TEXT.COLUMN.TABLET.INFO}</span>
          </div>
          <div className={JOB_LIST_STYLES.table.header.column.location}>
            {SAVED_RECRUIT_TEXT.COLUMN.DESKTOP.LOCATION}
          </div>
          <div className={JOB_LIST_STYLES.table.header.column.salary}>
            {SAVED_RECRUIT_TEXT.COLUMN.DESKTOP.SALARY}
          </div>
          <div className={JOB_LIST_STYLES.table.header.column.type}>
            <span className="hidden md:inline">{SAVED_RECRUIT_TEXT.COLUMN.DESKTOP.TYPE}</span>
            <span className="md:hidden">{SAVED_RECRUIT_TEXT.COLUMN.TABLET.TYPE}</span>
          </div>
          <div className={JOB_LIST_STYLES.table.header.column.deadline}>
            {SAVED_RECRUIT_TEXT.COLUMN.DESKTOP.DEADLINE}
          </div>
        </div>
        {savedRecruits.map((recruit) => (
          <div key={recruit.job_posting_id} className={JOB_LIST_STYLES.table.row.wrapper}>
            {isEditMode ? (
              <div className={JOB_LIST_STYLES.table.row.column.action}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(recruit.job_posting_id)}
                  onChange={() => onToggleSelect(recruit.job_posting_id)}
                  className="w-4 h-4 border-gray-300 rounded"
                />
              </div>
            ) : (
              <div className={JOB_LIST_STYLES.table.row.column.action}>
                <button
                  onClick={() => onToggleScrap(recruit.job_posting_id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Star className="w-5 h-5" fill={recruit.isSaved ? "currentColor" : "none"} />
                </button>
              </div>
            )}
            <div className={JOB_LIST_STYLES.table.row.column.info}>
              <div className="font-medium text-gray-900">{recruit.companyName}</div>
              <div className="text-gray-600">{recruit.job_posting_title}</div>
            </div>
            <div className={JOB_LIST_STYLES.table.row.column.location}>{recruit.location}</div>
            <div className={JOB_LIST_STYLES.table.row.column.salary}>
              {`${recruit.salary.toLocaleString()}원 (${recruit.salary_type})`}
            </div>
            <div className={JOB_LIST_STYLES.table.row.column.type}>
              <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                {recruit.salary_type}
              </span>
            </div>
            <div className={JOB_LIST_STYLES.table.row.column.deadline}>
              {formatDate(recruit.deadline)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
