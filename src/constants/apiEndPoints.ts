export const API_ENDPOINTS = {
  AUTH: {
    LOGOUT: "/user/logout/",
    REFRESH_TOKEN: "/user/token/refresh/",
    DELETE_ACCOUNT: "/user/delete/",
    SEND_VERIFICATION: "/user/verification/send/",
    EMAIL_CHECK: "/user/email/check/",
    VERIFY_CODE: "/user/verification/verify/",
    USER: {
      SIGNUP: "/user/common/signup/",
      LOGIN: "/user/normal/login/",
      COMPLETE_SIGNUP: "/user/normal/signup/",
      SOCIAL: {
        KAKAO: {
          LOGIN: "/user/oauth/kakao/login/",
          CALLBACK: "/user/kakao/callback/",
        },
        NAVER: {
          LOGIN: "/user/oauth/naver/login/",
          CALLBACK: "/user/naver/callback/",
        },
      },
    },
    COMPANY: {
      SIGNUP: "/user/common/signup/",
      COMPLETE_SIGNUP: "/user/company/signup/",
      LOGIN: "/user/company/login/",
    },
    VERIFY: {
      SEND_CODE: "/user/verify/send-code/",
      VERIFY_CODE: "/user/verify/code/",
      CHECK_BUSINESS: "/user/verify/business/",
    },
  },

  CSRF: "/csrf",

  USER: {
    PROFILE: "/user/normal/info/",
    UPDATE_PROFILE: "/user/normal/info/update/",
    FIND_EMAIL: "/user/normal/find/email/",
    RESET_PASSWORD: "/user/normal/reset/password/",
    REQUEST_PHONE_CODE: "/user/verify/send-code/",
    VERIFY_PHONE_CODE: "/user/verify/code/",
  },
  COMPANY: {
    PROFILE: "/user/company/info/",
    UPDATE_PROFILE: "/user/company/info/update/",
    FIND_EMAIL: "/user/find/company/email/",
    RESET_PASSWORD: "/user/reset/company/password/",
  },
  JOB_POST: {
    LIST: "/job-postings/job-postings/",
    DETAIL: (id: string) => `/job-postings/job-postings/${id}/`,
    CREATE: "/job-postings/job-postings/",
    UPDATE: (id: string) => `/job-postings/job-postings/${id}/`,
    DELETE: (id: string) => `/job-postings/job-postings/${id}/`,
  },
  JOB_FILTER: {
    LOCATION: "/search/region/",
    CATEGORY: "/search/job/",
  },
  RESUME: {
    LIST: "/resume/",
    DETAIL: (id: string) => `/resume/${id}/`,
    UPDATE: (id: string) => `/resume/${id}/`,
    DELETE: (id: string) => `/resume/${id}/`,
  },
} as const;
