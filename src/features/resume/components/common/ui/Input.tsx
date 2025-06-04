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
        error: "border-red-500 bg-white focus:border-2 focus:border-red-500",
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
  "aria-label"?: string;
  "aria-describedby"?: string;
} & VariantProps<typeof inputVariants>;

export default function Input<T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
  disabled = false,
  value,
  variant,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
}: InputProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];
  const hasError = !!error;
  const errorId = `${name}-error`;
  const helpId = `${name}-help`;

  // aria-describedby 조합
  const describedBy = [ariaDescribedBy, hasError ? errorId : null, helpId]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-3 ml-2 font-semibold text-base sm:text-lg text-[#28562c]"
        >
          {label}
          <span className="sr-only">(필수 입력)</span>
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={disabled ? value : undefined}
        {...register(name)}
        className={cn(
          inputVariants({
            variant: disabled ? "disabled" : hasError ? "error" : (variant ?? "default"),
          }),
        )}
        aria-label={ariaLabel}
        aria-describedby={describedBy || undefined}
        aria-invalid={hasError}
        aria-required="true"
      />

      <div id={helpId} className="sr-only">
        {placeholder && `예시: ${placeholder}`}
      </div>

      {hasError && (
        <p id={errorId} className="text-red-500 mt-1 ml-2" role="alert" aria-live="polite">
          {String(error?.message)}
        </p>
      )}
    </div>
  );
}
