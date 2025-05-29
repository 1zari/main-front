"use client";
import { Controller, useFormContext, FieldValues, Path } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";

const datePickerVariants = cva(
  "w-full h-[60px] pr-12 pl-4 rounded border block placeholder:text-gray-400 transition focus:outline-none",
  {
    variants: {
      variant: {
        default: "border-gray-300 bg-white focus:border-2 focus:border-primary",
        disabled: "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type DatePickerFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
} & VariantProps<typeof datePickerVariants>;

const formatDateToLocalString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseLocalDateString = (dateString: string): Date | null => {
  if (!dateString) return null;

  const [year, month, day] = dateString.split("-").map(Number);
  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day);
};

export default function DatePickerField<T extends FieldValues>({
  label,
  name,
  placeholder,
  disabled = false,
  variant,
}: DatePickerFieldProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div className="w-full">
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg text-[#28562c]">
        {label}
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="relative w-full">
            <DatePicker
              selected={parseLocalDateString(field.value)}
              onChange={(date: Date | null) => {
                const formatted = date ? formatDateToLocalString(date) : "";
                field.onChange(formatted);
              }}
              dateFormat="yyyy-MM-dd"
              placeholderText={placeholder || "날짜를 선택하세요"}
              locale={ko}
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              dropdownMode="select"
              disabled={disabled}
              className={cn(
                datePickerVariants({
                  variant: disabled ? "disabled" : (variant ?? "default"),
                }),
              )}
              wrapperClassName="w-full"
            />
            <CalendarIcon
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
          </div>
        )}
      />
      {errors[name] && <p className="text-red-500 mt-1 ml-2">{String(errors[name]?.message)}</p>}
    </div>
  );
}
