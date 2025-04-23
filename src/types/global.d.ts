export {};

declare global {
  interface Window {
    Kakao: any;
  }
  interface SpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives?: number;
    start(): void;
    stop(): void;
    onresult: (event: any) => void;
    onerror: (event: any) => void;
  }
}
