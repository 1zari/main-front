"use client";
import { create } from "zustand";

export interface ModalProps {
  title: string;
  message: string;
  confirmText?: string;
  onConfirm?: () => void;
}

interface ModalState extends ModalProps {
  isOpen: boolean;
  showModal: (props: ModalProps) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  title: "",
  message: "",
  confirmText: "확인",
  onConfirm: undefined,

  showModal: (props) =>
    set({
      isOpen: true,
      title: props.title,
      message: props.message,
      confirmText: props.confirmText ?? "확인",
      onConfirm: props.onConfirm,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      title: "",
      message: "",
      confirmText: "확인",
      onConfirm: undefined,
    }),
}));
