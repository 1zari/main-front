"use client";

interface InputPayProps {
  value: string;
  onChange: (value: string) => void;
}

const InputPay = ({ value, onChange }: InputPayProps) => {
  return (
    <div className="flex relative">
      <input
        type="string"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="예)1,000,000"
        className="pr-6 w-40 m-1 border border-gray-300 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F8C3B] focus:border-transparent"
      ></input>
      <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-700 pointer-events-none">
        원
      </span>
    </div>
  );
};

export default InputPay;
