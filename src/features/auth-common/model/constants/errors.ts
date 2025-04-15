export const AUTH_ERRORS = {
  LOGIN_FAILED: "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.",
  INVALID_EMAIL: "유효하지 않은 이메일 형식입니다.",
  INVALID_PASSWORD:
    "비밀번호는 8자 이상 16자 이하이며, 영어 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
  NETWORK_ERROR: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
} as const;

export type AuthErrorKey = keyof typeof AUTH_ERRORS;
