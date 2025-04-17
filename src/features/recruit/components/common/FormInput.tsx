"use client";

import { UseFormRegister } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  required?: boolean;
  width?: string;
  inputWidth?: string;
  ml?: string;
  labelWidth?: string;
  [key: string]: any;
}

const FormInput = ({
  label,
  name,
  register,
  required,
  error,
  width = "",
  inputWidth = "",
  labelWidth = "w-16",
  ...rest
}: FormInputProps) => (
  <div className={`flex items-center ${width} `}>
    <label htmlFor={name} className={`text-sm font-semibold text-gray-700 ${labelWidth}`}>
      {label}
    </label>
    <div className={`flex flex-col flex-1 ${inputWidth}`}>
      <input
        id={name}
        {...register(name, { required })}
        {...rest}
        className={`border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#0F8C3B]`}
      />
    </div>
  </div>
);

export default FormInput;
