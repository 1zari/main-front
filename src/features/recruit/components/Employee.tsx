"use client";

interface EmployeeProps {
  value: string;
  onChange: (value: string) => void;
}

const Employee_Type = ["정규직", "계약직"];

const Employee = ({ value, onChange }: EmployeeProps) => {
  return (
    <div className="flex items-center text-gray-700 ">
      <label className="text-sm font-medium text-gray-700">고용 형태</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ml-3 w-50 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F8C3B] focus:border-transparent"
      >
        <option value=""></option>
        {Employee_Type.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Employee;
