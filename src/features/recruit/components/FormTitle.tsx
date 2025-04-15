"use client";

interface RecruitFormTitleProps {
  value: string;
  onChange: (value: string) => void;
}

const FormTitle = ({ value, onChange }: RecruitFormTitleProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-lg text-[#0F8C3B] font-bold">공고 제목</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="공고 제목을 입력해주세요."
        className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F8C3B] focus:border-transparent"
      />
    </div>
  );
};

export default FormTitle;
