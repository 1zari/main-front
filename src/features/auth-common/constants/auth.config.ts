export const AUTH_ROUTES = {
  normal: {
    emailFind: "/auth/user/find-email/",
    passwordFind: "/auth/user/find-password/",
    signup: "/auth/user/signup/",
  },
  company: {
    emailFind: "/auth/company/find-email/",
    passwordFind: "/auth/company/find-password/",
    signup: "/auth/company/signup/",
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
