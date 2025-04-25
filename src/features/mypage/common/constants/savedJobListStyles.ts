import { type SalaryType } from "@/features/mypage/common/types/savedRecruit.types";

export const SALARY_TYPE_STYLES: Record<SalaryType, string> = {
  시급: "text-orange-500 border-orange-500",
  일급: "text-emerald-500 border-emerald-500",
  월급: "text-blue-500 border-blue-500",
} as const;

export const JOB_LIST_STYLES = {
  container: "space-y-0",
  header: {
    wrapper: "space-y-2",
    titleWrapper: "flex items-center justify-between pt-4 sm:pt-6",
    title: "font-bold text-gray-900",
    buttonWrapper: "flex justify-end items-center gap-2 sm:mb-0 mb-2",
  },
  table: {
    wrapper: "mt-2",
    container: "overflow-hidden bg-white border border-gray-200 rounded-lg",
    header: {
      wrapper:
        "grid grid-cols-[10%_32%_15%_15%_13%_15%] items-center border-b border-gray-200 h-14 bg-gray-50 px-2",
      column: {
        base: "font-semibold text-gray-600 flex items-center justify-center overflow-hidden text-center",
        action: "justify-center",
        info: "px-4",
        location: "justify-center",
        salary: "justify-center",
        type: "justify-center",
        deadline: "justify-center",
      },
    },
    row: {
      wrapper:
        "grid grid-cols-[10%_32%_15%_15%_13%_15%] items-stretch min-h-[5rem] hover:bg-gray-50 cursor-pointer group transition-colors px-2",
      column: {
        base: "flex items-center overflow-hidden",
        action: "justify-center",
        info: "py-3 flex-col items-start justify-center px-4",
        location: "justify-center text-gray-600",
        salary: "justify-center text-gray-600",
        type: "justify-center",
        deadline: "justify-center whitespace-nowrap",
      },
    },
  },
  card: {
    wrapper: "sm:hidden space-y-4",
    container:
      "relative p-4 transition-colors bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 group",
    header: {
      wrapper: "flex items-start justify-between mb-2",
      content: "flex-1 pr-3 overflow-hidden",
      company: "block font-medium text-gray-900 break-words",
      title: "mt-0.5 font-medium text-gray-900 break-words group-hover:text-primary",
      scrap: "absolute right-4 top-4 z-10",
    },
    tags: {
      wrapper: "flex flex-wrap gap-1.5 mt-2",
      tag: "px-1.5 py-0.5 text-gray-600 break-words bg-gray-100 rounded",
    },
    deadline: {
      wrapper: "flex justify-end mt-2",
    },
  },
} as const;
