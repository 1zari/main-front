import { UseFormRegister, FieldValues } from "react-hook-form";

interface ResumeInputProps {
  label?: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  placeholder?: string;
  width?: string;
  type?: string;
  [x: string]: any;
}

const ResumeInput = ({
  label,
  name,
  register,
  required,
  placeholder,
  width = "w-full",
  type = "text",
  ...rest
}: ResumeInputProps) => (
  <div className={`flex flex-col ${width}`}>
    {label && (
      <label className="mb-1 font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <input
      type={type}
      {...register(name, { required })}
      placeholder={placeholder}
      className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F8C3B] bg-white"
      {...rest}
    />
  </div>
);

export default ResumeInput;
