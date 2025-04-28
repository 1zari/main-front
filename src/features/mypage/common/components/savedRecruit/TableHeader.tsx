import { Heading } from "@/components/ui/Heading";
import { JOB_LIST_STYLES } from "@/features/mypage/common/constants/savedJobListStyles";

interface TableHeaderProps {
  isEditMode: boolean;
  hasSelectedAll: boolean;
  onSelectAll: () => void;
}

export default function TableHeader({ isEditMode, hasSelectedAll, onSelectAll }: TableHeaderProps) {
  return (
    <div className="hidden sm:grid sm:grid-cols-[10%_32%_15%_15%_13%_15%] sm:items-center p-4 bg-gray-50">
      <div
        className={`${JOB_LIST_STYLES.table.header.column.base} ${JOB_LIST_STYLES.table.header.column.action}`}
      >
        {isEditMode ? (
          <input
            type="checkbox"
            checked={hasSelectedAll}
            onChange={onSelectAll}
            className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary"
          />
        ) : (
          <Heading sizeOffset={1} className="font-semibold text-gray-600 whitespace-nowrap">
            <span className="hidden md:inline">스크랩</span>
            <span className="md:hidden">★</span>
          </Heading>
        )}
      </div>
      <div
        className={`${JOB_LIST_STYLES.table.header.column.base} ${JOB_LIST_STYLES.table.header.column.info}`}
      >
        <Heading sizeOffset={1} className="font-semibold text-gray-600 whitespace-nowrap">
          <span className="hidden md:inline">회사명/공고제목</span>
          <span className="md:hidden">공고</span>
        </Heading>
      </div>
      <div
        className={`${JOB_LIST_STYLES.table.header.column.base} ${JOB_LIST_STYLES.table.header.column.location}`}
      >
        <Heading sizeOffset={1} className="font-semibold text-gray-600">
          근무지
        </Heading>
      </div>
      <div
        className={`${JOB_LIST_STYLES.table.header.column.base} ${JOB_LIST_STYLES.table.header.column.salary}`}
      >
        <Heading sizeOffset={1} className="font-semibold text-gray-600">
          급여
        </Heading>
      </div>
      <div
        className={`${JOB_LIST_STYLES.table.header.column.base} ${JOB_LIST_STYLES.table.header.column.type}`}
      >
        <Heading sizeOffset={1} className="font-semibold text-gray-600 whitespace-nowrap">
          <span className="hidden md:inline">급여형태</span>
          <span className="md:hidden">형태</span>
        </Heading>
      </div>
      <div
        className={`${JOB_LIST_STYLES.table.header.column.base} ${JOB_LIST_STYLES.table.header.column.deadline}`}
      >
        <Heading sizeOffset={1} className="font-semibold text-gray-600">
          마감일
        </Heading>
      </div>
    </div>
  );
}
