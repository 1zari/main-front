"use client";

interface PlaceProps {
  value: string;
  onChange: (value: string) => void;
}

const InputPlace = ({ value, onChange }: PlaceProps) => {
  return (
    <div className="flex justify-between items-center">
      <label className="text-sm font-medium text-gray-700 whitespace-nowrap">근무지</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="근무지를 입력해주세요."
        className="ml-5 w-full border text-gray-700 border-gray-300 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F8C3B]"
      />
    </div>
  );
};

export default InputPlace;
