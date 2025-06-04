export const SIGNUP_CONSTANTS = {
  // SMS 인증 관련
  SMS_VERIFICATION: {
    TIMEOUT_SECONDS: 120,
    CODE_LENGTH: 6,
    RETRY_DELAY: 100,
    TIMER_FORMAT: {
      MINUTES_PADDING: 2,
      SECONDS_PADDING: 2,
    },
  },

  // 플레이스홀더 텍스트
  PLACEHOLDERS: {
    // 공통
    EMAIL: "user@naver.com",

    // 개인회원
    USER_NAME: "김오즈",
    USER_PHONE: "010-1234-5678",
    USER_BIRTH: "입력란을 클릭하여 생년월일을 선택해 주세요.",
    VERIFICATION_CODE: "숫자 6자리",

    // 기업회원
    COMPANY_NAME: "시니어내일",
    COMPANY_REPRESENTATIVE: "박오즈",
    COMPANY_BUSINESS_NUMBER: "숫자만 입력",
    COMPANY_START_DATE: "달력에서 선택해 주세요.",
    COMPANY_INTRO: "기업 주요 사업 내용",
    COMPANY_MANAGER_NAME: "김오즈",
    COMPANY_MANAGER_PHONE: "010-1234-5678",
    COMPANY_MANAGER_EMAIL: "manager@company.com",
  },

  // 버튼 텍스트
  BUTTON_TEXT: {
    REQUEST_VERIFICATION: "인증 요청",
    VERIFY_CODE: "인증 확인",
    VERIFY_BUSINESS: "인증 확인",
    NEXT_STEP: "다음 단계로",
    COMPLETE_SIGNUP: "회원가입 완료",
  },

  // 파일 업로드 제한
  FILE_UPLOAD: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ["image/jpeg", "image/png", "application/pdf"],
  },

  // 폼 검증 제한값
  VALIDATION_LIMITS: {
    PASSWORD_MIN: 8,
    PASSWORD_MAX: 16,
    COMPANY_NAME_MIN: 2,
    COMPANY_NAME_MAX: 50,
    COMPANY_INTRO_MIN: 10,
    COMPANY_INTRO_MAX: 500,
    USER_NAME_MAX: 15,
    ADDRESS_MAX: 100,
  },

  // 메시지 텍스트
  MESSAGES: {
    SUCCESS: {
      SMS_SENT: "인증번호가 발송되었습니다.",
      SMS_VERIFIED: "문자인증 성공",
      SIGNUP_COMPLETE: "회원가입 완료",
    },
    ERROR: {
      SMS_FAILED: "인증 요청 중 오류가 발생했습니다. 다시 시도해주세요.",
      SMS_DUPLICATE: "이미 등록된 번호입니다. 다른번호를 입력해주세요",
      SMS_INVALID_CODE: "인증번호가 일치하지 않습니다.",
      SMS_TIMEOUT: "인증 시간이 만료되었습니다. 다시 요청해주세요.",
      SIGNUP_FAILED: "회원가입 실패",
      BUSINESS_VERIFICATION_FAILED: "사업자 인증 요청 중 오류가 발생했습니다.",
    },
    INFO: {
      SMS_GUIDE: "휴대폰 문자를 확인 후 \n 인증번호를 입력해주세요.",
      SMS_COMPLETE_GUIDE: "인증이 완료되었습니다. \n 나머지 정보를 입력해주세요.",
      BUSINESS_VALID: "유효한 사업자 등록 정보입니다.",
      BUSINESS_INVALID: "유효하지 않은 사업자 등록 정보입니다.",
      SIGNUP_WELCOME: "시니어내일에 오신 것을 환영합니다!",
      SIGNUP_BUSINESS_SUPPORT: "님의 비즈니스 여정을 응원합니다 🤗🎉",
      SIGNUP_ERROR_RETRY: "회원정보 입력 중 오류가 발생했습니다. \n 잠시 후 다시 시도해주세요.",
    },
  },

  // 모달 버튼 텍스트
  MODAL_BUTTONS: {
    CONFIRM: "확인",
    GO_TO_LOGIN: "로그인 하러가기",
  },

  // 타이머 관련
  TIMER: {
    INITIAL_VALUE: 0,
    SECONDS_PER_MINUTE: 60,
  },
};
