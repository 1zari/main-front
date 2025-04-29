"use client";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { useFormContext, FieldValues, Path } from "react-hook-form";

const inputVariants = cva(
  "w-full h-[60px] px-4 border rounded placeholder:text-gray-400 transition focus:outline-none",
  {
    variants: {
      variant: {
        default: "border-gray-300 bg-white focus:border-2 focus:border-primary",
        disabled: "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type InputProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
} & VariantProps<typeof inputVariants>;

export default function Input<T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
  disabled = false,
  value,
  variant,
}: InputProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div className="w-full">
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg text-[#28562c]">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={disabled ? value : undefined}
        {...register(name)}
        className={cn(inputVariants({ variant: disabled ? "disabled" : (variant ?? "default") }))}
      />
      {errors[name] && <p className="text-red-500 mt-1 ml-2">{String(errors[name]?.message)}</p>}
    </div>
  );
}
