"use client";
import { useEffect } from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal = ({ isOpen, onClose, onDelete }: DeleteModalProps) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <p className="text-lg font-bold text-gray-900 mb-2">삭제된 공고는 복수할 수 없습니다.</p>
        <p className="text-sm text-gray-600 mb-6">정말로 삭제하시겠습니까?</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            닫기
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
