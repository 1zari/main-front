export const EMAIL_DOMAINS = [
  { value: "직접입력", label: "직접입력" },
  { value: "naver.com", label: "@naver.com" },
  { value: "gmail.com", label: "@gmail.com" },
  { value: "daum.net", label: "@daum.net" },
  { value: "nate.com", label: "@nate.com" },
] as const;

export type EmailDomain = (typeof EMAIL_DOMAINS)[number]["value"];
