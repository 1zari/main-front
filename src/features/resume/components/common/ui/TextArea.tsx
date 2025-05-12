"use client";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { useFormContext, FieldValues, Path } from "react-hook-form";

const textareaVariants = cva(
  "w-full min-h-[140px] px-4 pt-4 border rounded placeholder:text-gray-400 resize-none transition focus:outline-none",
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

type TextAreaProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
} & VariantProps<typeof textareaVariants>;

export default function TextArea<T extends FieldValues>({
  label,
  name,
  placeholder,
  disabled = false,
  value,
  variant,
}: TextAreaProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div className="w-full">
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg text-[#28562c]">
        {label}
      </label>
      <textarea
        placeholder={placeholder || `${label}을 입력해주세요`}
        disabled={disabled}
        value={disabled ? value : undefined}
        {...register(name)}
        className={cn(
          textareaVariants({ variant: disabled ? "disabled" : (variant ?? "default") }),
        )}
      />
      {errors[name] && <p className="text-red-500 mt-1 ml-2">{String(errors[name]?.message)}</p>}
    </div>
  );
}
