export const AUTH_MESSAGES = {
  verification: {
    success: "인증번호가 확인되었습니다.",
    error: "인증번호가 올바르지 않습니다.",
  },
  findEmail: {
    notFound: "입력하신 정보로 등록된 이메일이 없습니다.",
    guide: "회원가입 시 등록한 이메일 주소입니다.",
  },
  findPassword: {
    success: "비밀번호가 성공적으로 변경되었습니다.",
    error: "입력하신 정보가 정확하지 않습니다.",
  },
} as const;
