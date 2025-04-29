"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

interface CustomSelectProps {
  label: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  value?: string;
  error?: string;
}

export default function CustomSelect({
  label,
  options,
  placeholder = "선택하세요",
  disabled = false,
  onChange,
  value,
  error,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  const handleSelect = (val: string) => {
    onChange?.(val);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="w-full" ref={selectRef}>
      <label className="block mb-3 ml-2 text-[#28562c] text-base sm:text-lg font-semibold">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`w-full h-[60px] px-4 pr-10 text-left text-base border rounded bg-white leading-normal
            transition-all flex items-center
            focus:outline-none focus:border-2 focus:border-primary
            ${
              disabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : error
                  ? "border-red-500"
                  : "border-gray-300"
            }
          `}
        >
          {selectedLabel || <span className="text-gray-400">{placeholder}</span>}
          <ChevronDown
            size={20}
            className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200
              ${isOpen ? "rotate-180 text-primary" : "rotate-0 text-gray-400"}
            `}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-2 w-full rounded-lg border bg-white shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="px-4 py-3 cursor-pointer hover:bg-primary/10 transition-colors"
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 mt-1 ml-2">{error}</p>}
    </div>
  );
}
