"use client";

import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

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
      <div className="bg-white px-6 py-3 rounded-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
        {children ?? (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full bg-blue-200 animate-ping-slow" />
              <div className="relative w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 1v11m0 0a4 4 0 004-4V5a4 4 0 10-8 0v3a4 4 0 004 4zm0 0v6m-4 0h8"
                  />
                </svg>
              </div>
            </div>
            <p className="text-center text text-lg font-medium">
              {transcript ? `들린 말: ${transcript}` : "음성을 듣고 있어요...\n(말씀해 보세요!)"}
            </p>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
