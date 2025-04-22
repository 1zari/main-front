"use client";

import VoiceOverlay from "@/components/VoiceOverlay";
import { extractKeywords } from "@/utils/extractKeywords";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMicOutline } from "react-icons/io5";

export default function VoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const startListening = () => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setResult("");
      setKeywords([]);
    };

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setResult(transcript);
      setIsListening(false);

      const extracted = await extractKeywords(transcript);
      setKeywords(extracted);

      //   if (extracted.length > 0) {
      //     const query = extracted.join(",");
      //     router.push(`/jobs?keywords=${encodeURIComponent(query)}`);
      //   }
    };

    recognition.onerror = (event: any) => {
      console.error("음성 인식 에러:", event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="p-4 flex flex-col  items-end space-y-2">
      <button
        // onClick={startListening}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2  px-4 py-2 shadow-2xl rounded-3xl bg-blue-600 text-white"
      >
        <span className="text-2xl">
          <IoMicOutline />
        </span>
        말해서 검색하기
      </button>
      <VoiceOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
