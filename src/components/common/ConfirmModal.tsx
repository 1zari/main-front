"use client";
import { Fragment } from "react";
import { Transition, TransitionChild, Dialog, Description } from "@headlessui/react";
import { useModalStore } from "@/store/useModalStore";

export default function ConfirmModal() {
  const { isOpen, title, message, confirmText, onConfirm, closeModal } = useModalStore();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <TransitionChild
        as={Fragment}
        enter="ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-40"
        leave="duration-0"
      >
        <div className="fixed inset-0 bg-black opacity-40" />
      </TransitionChild>

      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClose={closeModal}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-0"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <Description className="text-base mb-4">{message}</Description>
            <button
              type="button"
              className="w-full h-12 bg-primary text-white font-medium rounded-sm hover:opacity-90 transition"
              onClick={() => {
                onConfirm?.();
                closeModal();
              }}
            >
              {confirmText}
            </button>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
