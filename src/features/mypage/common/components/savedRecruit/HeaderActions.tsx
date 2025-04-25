import { Pencil, Trash2, X } from "lucide-react";
import { SAVED_RECRUIT_TEXT } from "@/features/mypage/common/constants/savedRecruit";

interface HeaderActionsProps {
  isEditMode: boolean;
  selectedCount: number;
  onToggleEdit: () => void;
  onDelete: () => void;
}

export default function HeaderActions({
  isEditMode,
  selectedCount,
  onToggleEdit,
  onDelete,
}: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onToggleEdit}
        className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:text-gray-900 rounded-lg transition-colors border border-gray-200 hover:border-gray-400 bg-white"
      >
        {isEditMode ? (
          <>
            <X className="w-4 h-4" />
            {SAVED_RECRUIT_TEXT.EDIT.CANCEL}
          </>
        ) : (
          <>
            <Pencil className="w-4 h-4" />
            {SAVED_RECRUIT_TEXT.EDIT.BUTTON}
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
          {SAVED_RECRUIT_TEXT.EDIT.DELETE}{" "}
          {selectedCount > 0 && SAVED_RECRUIT_TEXT.EDIT.DELETE_COUNT(selectedCount)}
        </button>
      )}
    </div>
  );
}
