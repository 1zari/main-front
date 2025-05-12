import { Pencil, Trash2, X } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { JOB_LIST_STYLES } from "@/features/mypage/common/constants/savedJobListStyles";

interface JobListHeaderProps {
  isEditMode: boolean;
  selectedCount: number;
  onToggleEditMode: () => void;
  onDelete: () => void;
}

export default function JobListHeader({
  isEditMode,
  selectedCount,
  onToggleEditMode,
  onDelete,
}: JobListHeaderProps) {
  return (
    <div className={JOB_LIST_STYLES.header.wrapper}>
      <div className={JOB_LIST_STYLES.header.titleWrapper}>
        <Heading sizeOffset={3} className={JOB_LIST_STYLES.header.title}>
          저장한 공고 목록
        </Heading>
      </div>
      <div className={JOB_LIST_STYLES.header.buttonWrapper}>
        <button
          onClick={onToggleEditMode}
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
            onClick={onDelete}
            disabled={selectedCount === 0}
            className={`flex items-center gap-1 px-3 py-1.5 text-white rounded-lg transition-colors ${
              selectedCount === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            선택 삭제 {selectedCount > 0 && `(${selectedCount}개)`}
          </button>
        )}
      </div>
    </div>
  );
}
