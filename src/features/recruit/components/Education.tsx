"use client";

interface EducationProps {
  value: string;
  onChange: (value: string) => void;
}

const Education_Type = ["고졸", "대졸", "무관"];

const Education = ({ value, onChange }: EducationProps) => {
  return (
    <div className="flex items-center text-gray-700 ">
      <label className="text-sm font-medium text-gray-700">학력</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ml-10 w-50 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F8C3B] focus:border-transparent"
      >
        <option value=""></option>
        {Education_Type.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Education;
