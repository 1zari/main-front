// hooks/useSpeechRecognition.ts
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: new () => WebkitSpeechRecognition;
  }

  interface WebkitSpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    start(): void;
    stop(): void;
    onresult: (event: WebkitSpeechRecognitionEvent) => void;
    onerror: (event: WebkitSpeechRecognitionErrorEvent) => void;
  }

  interface WebkitSpeechRecognitionEvent extends Event {
    results: WebkitSpeechRecognitionResultList;
  }

  interface WebkitSpeechRecognitionErrorEvent extends Event {
    error: string;
  }

  interface WebkitSpeechRecognitionResultList {
    [index: number]: WebkitSpeechRecognitionResult;
  }

  interface WebkitSpeechRecognitionResult {
    [index: number]: WebkitSpeechRecognitionAlternative;
  }

  interface WebkitSpeechRecognitionAlternative {
    transcript: string;
  }
}

export function useSpeechRecognition() {
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<WebkitSpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: WebkitSpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
    };

    recognition.onerror = (event: WebkitSpeechRecognitionErrorEvent) => {
      console.error("음성 인식 에러", event);
    };

    recognitionRef.current = recognition;
  }, []);

  const start = () => recognitionRef.current?.start();
  const stop = () => recognitionRef.current?.stop();

  return { transcript, start, stop };
}
