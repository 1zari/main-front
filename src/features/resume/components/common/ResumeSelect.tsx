// common/ResumeSelect.tsx

import { UseFormRegister, FieldValues } from "react-hook-form";

interface ResumeSelectProps {
  label?: string;
  name: string;
  options: { value: string; label: string }[];
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  width?: string;
  [x: string]: any;
}

const ResumeSelect = ({
  label,
  name,
  options,
  register,
  required,
  width = "w-full",
  ...rest
}: ResumeSelectProps) => (
  <div className={`flex flex-col ${width}`}>
    {label && (
      <label className="mb-1 font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <select
      {...register(name, { required })}
      className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F8C3B] bg-white"
      {...rest}
    >
      <option value="">선택</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default ResumeSelect;
