"use client";

interface InputPayProps {
  value: string; // 예: "1000000"
  onChange: (value: string) => void; // 콤마 없는 숫자만 전달
}

// 천 단위 콤마 붙이는 함수
const formatWithComma = (value: string) => {
  if (!value) return "";
  const number = value.replace(/[^0-9]/g, "");
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const InputPay = ({ value, onChange }: InputPayProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    onChange(input);
  };

  return (
    <div className="flex relative">
      <input
        type="text"
        inputMode="numeric"
        value={formatWithComma(value)}
        onChange={handleChange}
        placeholder="예) 1,000,000"
        className="pr-6 w-40 m-1 border border-gray-300 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F8C3B] focus:border-transparent"
      />
      <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-700 pointer-events-none">
        원
      </span>
    </div>
  );
};

export default InputPay;
