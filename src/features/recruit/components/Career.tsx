"use client";

interface CareerProps {
  value: string;
  onChange: (value: string) => void;
}

const Career_Type = ["경력무관", "경력"];

const Career = ({ value, onChange }: CareerProps) => {
  return (
    <div className="flex items-center text-gray-700 ">
      <label className="text-sm font-medium text-gray-700">경력여부</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ml-2 w-50 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F8C3B] focus:border-transparent"
      >
        <option value=""></option>
        {Career_Type.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Career;
