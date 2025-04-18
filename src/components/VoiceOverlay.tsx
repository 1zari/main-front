"use client";

import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoMicOutline } from "react-icons/io5";

interface VoiceOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function VoiceOverlay({ isOpen, onClose, children }: VoiceOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const { transcript, start, stop } = useSpeechRecognition();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      start();
    } else {
      stop();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!mounted) return;

    const originalOverflow = document.body.style.overflow;

    const preventTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", preventTouchMove, { passive: false });
    } else {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("touchmove", preventTouchMove);
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("touchmove", preventTouchMove);
    };
  }, [isOpen, mounted]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/30 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-3xl h-80 flex items-center justify-center m-5 px-6 py-3 rounded-xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children ?? (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full bg-blue-200 animate-ping-slow" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl shadow-xl animate-heartbeat">
                <IoMicOutline />
              </div>
            </div>
            <p className="text-center py-10 text text-lg font-medium">
              {transcript ? `들린 말: ${transcript}` : "어떤 일자리를 찾고 계신지 알려주세요 🙂"}
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
