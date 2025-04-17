"use client";

import { extractKeywords } from "@/utils/extractKeywords";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

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
    <div className="p-4 space-y-2">
      <button onClick={startListening} className="px-4 py-2 bg-blue-600 text-white rounded">
        🎤 말해서 검색하기
      </button>

      {isListening && <p>🎙️ 듣고 있어요...</p>}
      {result && <p>📝 인식된 문장: {result}</p>}

      {keywords.length > 0 && (
        <div>
          <p>🔑 추출된 키워드:</p>
          <ul className="list-disc list-inside">
            {keywords.map((kw, i) => (
              <li key={i}>{kw}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
