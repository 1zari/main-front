export type TabType = "resumes" | "applied" | "saved";

export const TABS = [
  { id: "resumes" as const, label: "내 이력서" },
  { id: "applied" as const, label: "지원한 공고" },
  { id: "saved" as const, label: "저장한 공고" },
] as const;

export const TAB_STYLES = {
  base: "flex-1 px-4 py-2 cursor-pointer transition-colors text-center",
  active: "text-primary font-semibold border-b-2 border-primary",
  inactive: "text-gray-600 hover:text-gray-800",
} as const;

export const ITEMS_PER_PAGE = 10;
