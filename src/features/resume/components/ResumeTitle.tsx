"use client";

import { useFontSize } from "@/hooks/useFontSize";

interface ResumeFormTitleProps {
  value: string;
  onChange: (value: string) => void;
}

const ResumeTitle = ({ value, onChange }: ResumeFormTitleProps) => {
  const { fontSize } = useFontSize();

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-xl text-[#0F8C3B] font-bold">이력서 제목</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="이력서 제목을 입력해주세요."
        style={{ fontSize: `${fontSize}px` }}
        className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F8C3B] bg-white"
      />
    </div>
  );
};

export default ResumeTitle;
