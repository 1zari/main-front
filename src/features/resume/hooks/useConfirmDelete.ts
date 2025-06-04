import { useCallback } from "react";
import { useModalStore } from "@/store/useModalStore";

interface UseConfirmDeleteOptions {
  title: string;
  message: string;
  confirmText?: string;
}

export function useConfirmDelete() {
  const { showModal } = useModalStore();

  const confirmDelete = useCallback(
    (onConfirm: () => void, options: UseConfirmDeleteOptions) => {
      showModal({
        title: options.title,
        message: options.message,
        confirmText: options.confirmText || "삭제",
        onConfirm,
      });
    },
    [showModal],
  );

  return { confirmDelete };
}
