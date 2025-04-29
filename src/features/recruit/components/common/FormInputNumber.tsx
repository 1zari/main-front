"use client";

import { Controller, Control, UseFormRegister, FieldValues } from "react-hook-form";
import { useId } from "react";

// 천 단위 콤마 처리 함수
const formatWithComma = (value: string | number | undefined) => {
  if (!value) return "";
  const number = String(value).replace(/[^0-9]/g, "");
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

interface FormNumberInputProps {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
  unit?: string;
  labelWidth?: string;
  inputWidth?: string;
  ml?: string;
}

const FormNumberInput = ({
  label,
  name,
  control,
  unit,
  labelWidth = "",
  inputWidth = "w-40",
}: FormNumberInputProps) => {
  const id = useId();

  return (
    <div>
      <div className="flex items-center">
        <label htmlFor={id} className={`text-sm font-semibold text-gray-700 ${labelWidth}`}>
          {label}
        </label>
        <div className="relative">
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <input
                id={id}
                type="text"
                inputMode="numeric"
                value={formatWithComma(field.value)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange(raw);
                }}
                className={`border border-gray-300 rounded-md px-3 py-2 text-sm ${inputWidth} placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F8C3B] focus:border-transparent`}
                placeholder="숫자만 입력"
              />
            )}
          />
          <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-700 pointer-events-none">
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FormNumberInput;
