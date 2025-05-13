"use client";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  options: string[];
  control: Control<T>;
  error?: string;
};

export default function ControlledCheckboxGroup<T extends FieldValues>({
  label,
  name,
  options,
  control,
  error,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selected = (Array.isArray(field.value) ? field.value : []) as string[];

        const toggleOption = (value: string) => {
          const updated = selected.includes(value)
            ? selected.filter((v) => v !== value)
            : [...selected, value];
          field.onChange(updated);
          field.onBlur();
        };

        return (
          <div className="mb-12">
            <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg whitespace-normal break-keep">
              {label}
            </label>
            <div className="grid grid-cols-1 min-[500px]:grid-cols-2 sm:grid-cols-3 gap-3">
              {options.map((option, idx) => {
                const isChecked = selected.includes(option);

                return (
                  <label
                    key={idx}
                    className={`relative flex items-center justify-between gap-2 px-4 py-[14px] min-w-[160px] h-auto rounded cursor-pointer font-medium border transition break-words text-center
                      ${
                        isChecked
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-700 border-gray-300"
                      }`}
                  >
                    <span className="leading-tight flex items-center justify-center text-center w-full h-full whitespace-normal break-keep">
                      {option}
                    </span>
                    <input
                      type="checkbox"
                      value={option}
                      checked={isChecked}
                      onChange={() => toggleOption(option)}
                      className="sr-only"
                    />
                    {isChecked && (
                      <svg
                        className="w-4 h-4 text-white shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </label>
                );
              })}
            </div>
            {error && <p className="text-red-500 mt-1 ml-2">{error}</p>}
          </div>
        );
      }}
    />
  );
}
