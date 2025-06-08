"use client";
import { useModalStore } from "@/store/useModalStore";
import { useEffect } from "react";

export default function ConfirmModal() {
  const { isOpen, title, message, confirmText, onConfirm, closeModal, hideCancelButton } =
    useModalStore();

  const handleConfirm = () => {
    onConfirm?.();
    closeModal();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" onClick={closeModal} />
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-2 text-center text-primary">{title}</h2>
        <p className="text-base mb-7 mt-3 whitespace-pre-line text-center">{message}</p>
        <div className={hideCancelButton ? "flex" : "flex gap-3"}>
          {!hideCancelButton && (
            <button
              type="button"
              className="flex-1 h-12 bg-gray-200 text-gray-700 font-medium rounded-sm hover:bg-gray-300 transition-colors"
              onClick={closeModal}
            >
              취소
            </button>
          )}
          <button
            type="button"
            className={`h-12 bg-primary text-white font-medium rounded-sm hover:opacity-90 transition-opacity ${
              hideCancelButton ? "w-full" : "flex-1"
            }`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
