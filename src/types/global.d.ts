export {};

declare global {
  interface Window {
    Kakao: unknown;
  }
  interface SpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives?: number;
    start(): void;
    stop(): void;
    onresult: (event: Event) => void;
    onerror: (event: Event) => void;
  }
}
