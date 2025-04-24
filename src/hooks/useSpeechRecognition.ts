// hooks/useSpeechRecognition.ts
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
  }

  interface SpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    start(): void;
    stop(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
  }
}

export function useSpeechRecognition() {
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("음성 인식 에러", event);
    };

    recognitionRef.current = recognition;
  }, []);

  const start = () => recognitionRef.current?.start();
  const stop = () => recognitionRef.current?.stop();

  return { transcript, start, stop };
}
