export const AUTH_ROUTES = {
  user: {
    emailFind: "/auth/user/find-email",
    passwordFind: "/auth/user/find-password",
    signup: "/auth/user/signup",
  },
  company: {
    emailFind: "/auth/company/find-email",
    passwordFind: "/auth/company/find-password",
    signup: "/auth/company/signup",
  },
} as const;

export const LOGIN_CONFIG = {
  user: {
    join_type: "user" as const,
    showSocialLogin: true,
    showEmailDomainSelect: true,
  },
  company: {
    join_type: "company" as const,
    showSocialLogin: false,
    showEmailDomainSelect: false,
  },
} as const;
