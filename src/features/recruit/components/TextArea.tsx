"use client";

interface TextProps {
  value: string;
  onChange: (value: string) => void;
}

const TextArea = ({ value, onChange }: TextProps) => {
  return (
    <div>
      <label className="text-lg text-[#0F8C3B] font-bold">상세 요강</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="공고 상세 내용을 작성해주세요."
        className="mt-2 h-100 w-full border text-gray-700 border-gray-300 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F8C3B] focus:border-transparent"
      />
    </div>
  );
};
export default TextArea