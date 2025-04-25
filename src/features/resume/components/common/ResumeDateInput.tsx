import { UseFormRegister } from "react-hook-form";

interface ResumeDateInputProps {
  label?: string;
  name: string;
  register: UseFormRegister<any>;
  required?: boolean;
  disabled?: boolean;
  width?: string;
  [x: string]: any;
}

const ResumeDateInput = ({
  label,
  name,
  register,
  required,
  disabled = false,
  width = "w-full",
  ...rest
}: ResumeDateInputProps) => (
  <div className={`flex flex-col ${width}`}>
    {label && (
      <label className="mb-1 font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <input
      type="date"
      {...register(name, { required })}
      className="px-3 py-2 bg-white border rounded"
      disabled={disabled}
      {...rest}
    />
  </div>
);

export default ResumeDateInput;
