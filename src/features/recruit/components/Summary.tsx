"use client";

interface SummaryProps {
  value: string;
  onChange: (value: string) => void;
}

const Summary = ({ value, onChange }: SummaryProps) => {
  return (
    <div className="mt-2 flex justify-between items-center">
      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">근무요약</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="50자 이내로 입력해주세요."
        className="ml-2 w-full border text-gray-700 border-gray-300 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F8C3B]"
      />
    </div>
  );
};

export default Summary;
