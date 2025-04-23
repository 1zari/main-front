"use client";

import { Controller, useFormContext, FieldValues, Path } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/utils/cn";

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  placeholder?: string;
  disabled?: boolean;
};

export default function FormDatePicker<T extends FieldValues>({
  label,
  name,
  placeholder,
  disabled = false,
}: Props<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div className="w-full">
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="relative w-full">
            <DatePicker
              selected={field.value ? new Date(field.value) : null}
              onChange={(date: Date | null) => {
                const formatted = date?.toISOString().split("T")[0] || "";
                field.onChange(formatted);
              }}
              dateFormat="yyyy-MM-dd"
              placeholderText={placeholder || "날짜를 선택해주세요."}
              locale={ko}
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              dropdownMode="select"
              disabled={disabled}
              className={cn(
                "w-full h-[60px] pr-12 pl-4 rounded border block",
                "placeholder:text-gray-400",
                disabled
                  ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                  : "bg-white border-gray-300 focus:outline-none focus:border-2 focus:border-primary",
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
