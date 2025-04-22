"use client";

import { UseFormRegister } from "react-hook-form";

interface ResumeInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  required?: boolean;
  width?: string;
  [key: string]: any;
}

const ResumeInput = ({
  label,
  name,
  register,
  required,
  width = "",
  ...rest
}: ResumeInputProps) => (
  <div className={`flex flex-col items-center ${width} `}>
    <label htmlFor={name} className="text-sm font-semibold text-gray-700">
      {label}
    </label>
    <div className="flex flex-col flex-1 ">
      <input
        id={name}
        {...register(name, { required })}
        {...rest}
        className={`border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#0F8C3B]`}
      />
    </div>
  </div>
);

export default ResumeInput;
