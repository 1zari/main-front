"use client";

interface VolumeProps {
  value: string; // 숫자 문자열 (예: "3", "00")
  onChange: (value: string) => void;
}

const Volume = ({ value, onChange }: VolumeProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    onChange(onlyNums);
  };

  return (
    <div className="flex items-center text-gray-700">
      <label className="text-sm font-medium text-gray-700">모집인원</label>
      <div className="flex relative">
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={handleChange}
          placeholder="숫자만 입력해주세요."
          className="ml-2 m-1 pr-6 w-50 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F8C3B] focus:border-transparent"
        />
        <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-700 pointer-events-none">
          명
        </span>
      </div>
    </div>
  );
};

export default Volume;

