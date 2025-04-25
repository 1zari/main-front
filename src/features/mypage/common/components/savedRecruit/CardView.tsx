import { Star } from "lucide-react";
import type { SavedRecruit } from "@/features/mypage/common/types/savedRecruit.types";
import { formatDate } from "@/utils/format";
import { Heading } from "@/components/ui/Heading";

interface CardViewProps {
  isEditMode: boolean;
  savedRecruits: SavedRecruit[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleScrap: (id: string) => void;
}

export default function CardView({
  isEditMode,
  savedRecruits,
  selectedIds,
  onToggleSelect,
  onToggleScrap,
}: CardViewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {savedRecruits.map((recruit) => (
        <div
          key={recruit.job_posting_id}
          className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            {isEditMode ? (
              <input
                type="checkbox"
                checked={selectedIds.includes(recruit.job_posting_id)}
                onChange={() => onToggleSelect(recruit.job_posting_id)}
                className="w-4 h-4 border-gray-300 rounded"
              />
            ) : (
              <button
                onClick={() => onToggleScrap(recruit.job_posting_id)}
                className="text-red-500 hover:text-red-600"
              >
                <Star className="w-5 h-5" fill={recruit.isSaved ? "currentColor" : "none"} />
              </button>
            )}
            <div className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
              {recruit.salary_type}
            </div>
          </div>
          <Heading sizeOffset={4} className="font-medium text-gray-900">
            {recruit.companyName}
          </Heading>
          <div className="mb-4 text-gray-600">{recruit.job_posting_title}</div>
          <div className="space-y-2 text-sm text-gray-500">
            <div>{recruit.location}</div>
            <div>{`${recruit.salary.toLocaleString()}원 (${recruit.salary_type})`}</div>
            <div>{formatDate(recruit.deadline)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
