// 이력서 폼 검증 상수
export const RESUME_VALIDATION_LIMITS = {
  // 길이 제한
  COMPANY_NAME_MAX: 50,
  POSITION_MAX: 50,
  CERTIFICATION_NAME_MAX: 100,
  CERTIFICATION_ISSUER_MAX: 100,
  JOB_CATEGORY_MAX: 20,
  TITLE_MAX: 20,
  SCHOOL_NAME_MAX: 50,
  INTRODUCTION_MAX: 500,

  // 최소 길이
  MIN_LENGTH: 1,
} as const;

// 날짜 검증 관련
export const DATE_VALIDATION = {
  FORMAT_REGEX: /^\d{4}-\d{2}-\d{2}$/,
  TIME_RESET: {
    START_OF_DAY: [0, 0, 0, 0] as const,
    END_OF_DAY: [23, 59, 59, 999] as const,
  },
} as const;

// 메시지 상수
export const RESUME_VALIDATION_MESSAGES = {
  COMPANY_NAME: {
    REQUIRED: "회사명을 입력해주세요.",
    MAX_LENGTH: `회사명은 ${RESUME_VALIDATION_LIMITS.COMPANY_NAME_MAX}자 이하로 입력해주세요.`,
  },
  POSITION: {
    REQUIRED: "직무를 입력해주세요.",
    MAX_LENGTH: `직무는 ${RESUME_VALIDATION_LIMITS.POSITION_MAX}자 이하로 입력해주세요.`,
  },
  DATE: {
    REQUIRED_START: "근무 시작일을 입력해주세요.",
    REQUIRED_CERT: "취득일자를 입력해주세요.",
    INVALID_FORMAT: "올바른 날짜 형식(YYYY-MM-DD)으로 입력해주세요.",
    FUTURE_NOT_ALLOWED: "미래 날짜는 입력할 수 없습니다.",
    INVALID_RANGE:
      "날짜를 올바르게 입력해주세요. (현재 근무 중이 아닌 경우 종료일 필수, 시작일 < 종료일, 미래 날짜 불가)",
  },
  CERTIFICATION: {
    NAME_REQUIRED: "자격증명을 입력해주세요.",
    NAME_MAX_LENGTH: `자격증명은 ${RESUME_VALIDATION_LIMITS.CERTIFICATION_NAME_MAX}자 이하로 입력해주세요.`,
    ISSUER_REQUIRED: "발급기관을 입력해주세요.",
    ISSUER_MAX_LENGTH: `발급기관은 ${RESUME_VALIDATION_LIMITS.CERTIFICATION_ISSUER_MAX}자 이하로 입력해주세요.`,
  },
  JOB_CATEGORY: {
    REQUIRED: "직종을 입력해주세요. ex) IT, 디자인, 마케팅",
    MAX_LENGTH: `직종은 ${RESUME_VALIDATION_LIMITS.JOB_CATEGORY_MAX}자 이하로 입력해주세요.`,
  },
  TITLE: {
    REQUIRED: "이력서 제목을 입력해주세요.",
    MAX_LENGTH: `이력서 제목은 ${RESUME_VALIDATION_LIMITS.TITLE_MAX}자 이하로 입력해주세요.`,
  },
  SCHOOL: {
    TYPE_REQUIRED: "학교 구분을 선택해주세요.",
    TYPE_INVALID: "올바른 학교 구분을 선택해주세요.",
    NAME_REQUIRED: "학교명을 입력해주세요.",
    NAME_MAX_LENGTH: `학교명은 ${RESUME_VALIDATION_LIMITS.SCHOOL_NAME_MAX}자 이하로 입력해주세요.`,
    STATUS_REQUIRED: "졸업 상태를 선택해주세요.",
    STATUS_INVALID: "올바른 졸업 상태를 선택해주세요.",
  },
  INTRODUCTION: {
    MAX_LENGTH: `자기소개는 최대 ${RESUME_VALIDATION_LIMITS.INTRODUCTION_MAX}자까지 작성할 수 있습니다.`,
  },
} as const;
