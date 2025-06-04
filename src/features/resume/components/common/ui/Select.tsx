"use client";
import { useEffect, useRef, useState, useCallback } from "react";
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
  "aria-label"?: string;
}

export default function CustomSelect({
  label,
  options,
  placeholder = "선택하세요",
  disabled = false,
  onChange,
  value,
  error,
  "aria-label": ariaLabel,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;
  const selectedIndex = options.findIndex((opt) => opt.value === value);

  const handleSelect = useCallback(
    (val: string) => {
      onChange?.(val);
      setIsOpen(false);
      setFocusedIndex(-1);
      buttonRef.current?.focus();
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (isOpen && focusedIndex >= 0) {
            handleSelect(options[focusedIndex].value);
          } else {
            setIsOpen(true);
            setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          buttonRef.current?.focus();
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
          } else {
            setFocusedIndex((prev) => Math.min(prev + 1, options.length - 1));
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setFocusedIndex(selectedIndex >= 0 ? selectedIndex : options.length - 1);
          } else {
            setFocusedIndex((prev) => Math.max(prev - 1, 0));
          }
          break;
        case "Home":
          e.preventDefault();
          if (isOpen) {
            setFocusedIndex(0);
          }
          break;
        case "End":
          e.preventDefault();
          if (isOpen) {
            setFocusedIndex(options.length - 1);
          }
          break;
      }
    },
    [disabled, isOpen, focusedIndex, selectedIndex, options, handleSelect],
  );

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const focusedOption = listRef.current.children[focusedIndex] as HTMLElement;
      if (focusedOption) {
        focusedOption.scrollIntoView({ block: "nearest" });
      }
    }
  }, [isOpen, focusedIndex]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const hasError = !!error;
  const errorId = `${label.replace(/\s+/g, "-")}-error`;
  const helpId = `${label.replace(/\s+/g, "-")}-help`;
  const listboxId = `${label.replace(/\s+/g, "-")}-listbox`;

  return (
    <div className="w-full" ref={selectRef}>
      <label
        htmlFor={`select-${label.replace(/\s+/g, "-")}`}
        className="block mb-3 ml-2 text-[#28562c] text-base sm:text-lg font-semibold"
      >
        {label}
        <span className="sr-only">(필수 선택)</span>
      </label>

      <div className="relative">
        <button
          ref={buttonRef}
          id={`select-${label.replace(/\s+/g, "-")}`}
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          onKeyDown={handleKeyDown}
          className={`w-full h-[60px] px-4 pr-10 text-left text-base border rounded bg-white leading-normal
            transition-all flex items-center
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            ${
              disabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : hasError
                  ? "border-red-500"
                  : "border-gray-300"
            }
          `}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-label={ariaLabel || label}
          aria-describedby={`${hasError ? errorId : ""} ${helpId}`.trim()}
          aria-invalid={hasError}
          aria-activedescendant={
            isOpen && focusedIndex >= 0 ? `${listboxId}-option-${focusedIndex}` : undefined
          }
        >
          {selectedLabel || <span className="text-gray-400">{placeholder}</span>}
          <ChevronDown
            size={20}
            className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200
              ${isOpen ? "rotate-180 text-primary" : "rotate-0 text-gray-400"}
            `}
            aria-hidden="true"
          />
        </button>

        {isOpen && (
          <div
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label={`${label} 옵션 목록`}
            className="absolute z-10 mt-2 w-full rounded-lg border bg-white shadow-lg max-h-60 overflow-auto"
          >
            {options.map((option, index) => (
              <div
                key={option.value}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={option.value === value}
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  index === focusedIndex
                    ? "bg-primary text-white"
                    : option.value === value
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-primary/10"
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <div id={helpId} className="sr-only">
        {isOpen
          ? "화살표 키로 옵션을 탐색하고 Enter 키로 선택하세요. ESC 키로 닫을 수 있습니다."
          : "스페이스바 또는 Enter 키로 옵션 목록을 열 수 있습니다."}
      </div>

      {hasError && (
        <p id={errorId} className="text-red-500 mt-1 ml-2" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}
