export const JOBS_ROUTES = {
  recommended: "/jobs/recommended-jobs",
  root: "/jobs",
  public: "/jobs/public-jobs",
  byLocation: "/jobs/by-location",
  byField: "/jobs/by-field",
} as const;

export const JOBS_LABELS = {
  recommended: "추천 공고",
  public: "공공일자리",
  byLocation: "지역별",
  byField: "직종별",
} as const;
