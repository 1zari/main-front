"use client";

import { UseFormRegister } from "react-hook-form";

interface ResumeSelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  register: UseFormRegister<any>;
  required?: boolean;
  width?: string;
  selectWidth?: string;
  [key: string]: any;
}

const ResumeSelect = ({
  label,
  name,
  options,
  register,
  required,
  width = "",
  selectWidth = "",

  ...rest
}: ResumeSelectProps) => (
  <div className={`flex items-center ${width}`}>
    <label htmlFor={name} className="text-sm font-semibold text-gray-700">
      {label}
    </label>
    <div className={`flex flex-col flex-1 ${selectWidth}`}>
      <select
        id={name}
        {...register(name, { required })}
        {...rest}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#0F8C3B]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default ResumeSelect;
