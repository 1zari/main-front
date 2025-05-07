export const AUTH_ROUTES = {
  normal: {
    emailFind: "/user/normal/find/email/",
    passwordFind: "/user/normal/reset/password/",
    signup: "/user/normal/signup/",
  },
  company: {
    emailFind: "/user/company/find/email/",
    passwordFind: "/user/company/reset/password/",
    signup: "/user/company/signup/",
  },
} as const;

export const LOGIN_CONFIG = {
  normal: {
    join_type: "normal" as const,
    showSocialLogin: true,
    showEmailDomainSelect: true,
  },
  company: {
    join_type: "company" as const,
    showSocialLogin: false,
    showEmailDomainSelect: false,
  },
} as const;
