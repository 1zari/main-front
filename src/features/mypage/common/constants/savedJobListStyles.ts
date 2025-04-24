import { type SalaryType } from "@/features/mypage/common/types/savedRecruit.types";

export const SALARY_TYPE_STYLES: Record<SalaryType, string> = {
  시급: "text-orange-500 border-orange-500",
  일급: "text-emerald-500 border-emerald-500",
  월급: "text-blue-500 border-blue-500",
} as const;

export const JOB_LIST_STYLES = {
  container: "space-y-6 px-2",
  header: {
    wrapper: "flex items-center justify-between pt-4 sm:pt-6",
    title: "pl-3 font-bold text-gray-900",
  },
  table: {
    wrapper: "hidden sm:block",
    container: "overflow-hidden bg-white border border-gray-200 rounded-lg",
    header: {
      wrapper: "flex items-center border-b border-gray-200 h-14 bg-gray-50",
      column: {
        base: "font-semibold text-gray-600 flex items-center overflow-hidden",
        checkbox: "w-[5%] justify-center",
        scrap: "w-[8%] justify-center",
        info: "w-[33%] justify-center",
        location: "w-[15%] justify-center",
        salary: "w-[15%] justify-center",
        type: "w-[12%] justify-center",
        deadline: "w-[12%] justify-center",
      },
    },
    row: {
      wrapper:
        "flex items-stretch min-h-[5rem] hover:bg-gray-50 cursor-pointer group transition-colors",
      column: {
        base: "flex items-center overflow-hidden",
        checkbox: "w-[5%] justify-center",
        scrap: "w-[8%] justify-center",
        info: "w-[33%] py-3 flex-col items-start justify-center",
        location: "w-[15%] justify-center text-gray-600",
        salary: "w-[15%] justify-center text-gray-600",
        type: "w-[12%] justify-center",
        deadline: "w-[12%] justify-center whitespace-nowrap",
      },
    },
  },
  card: {
    wrapper: "sm:hidden space-y-4",
    container:
      "p-3 transition-colors bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 group",
    header: {
      wrapper: "flex items-start justify-between mb-2",
      content: "flex-1 pr-3 overflow-hidden",
      company: "block font-medium text-gray-900 break-words",
      title: "mt-0.5 font-medium text-gray-900 break-words group-hover:text-primary",
      scrap: "flex-none ml-1",
    },
    tags: {
      wrapper: "flex flex-wrap gap-1.5 mt-2",
      tag: "px-1.5 py-0.5 text-gray-600 break-words bg-gray-100 rounded",
    },
    deadline: {
      wrapper: "flex justify-end mt-2",
      text: "pr-3",
    },
  },
} as const;
