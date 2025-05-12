"use client";
import { useFormContext, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  placeholder?: string;
  buttonText: string;
  buttonClassName?: string;
  timerText?: string;
  onButtonClick: () => void;
  inputDisabled?: boolean;
  buttonDisabled?: boolean;
  preserveStyleOnDisabled?: boolean;
};

export default function FormActionInput<T extends FieldValues>({
  label,
  name,
  placeholder,
  buttonText,
  onButtonClick,
  inputDisabled = false,
  buttonDisabled = false,
  preserveStyleOnDisabled = false,
  buttonClassName,
  timerText,
}: Props<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <div>
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg whitespace-normal break-keep">
        {label}
      </label>
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 w-full">
        <div className="relative w-full sm:w-auto flex-1">
          <input
            type="text"
            placeholder={placeholder}
            disabled={inputDisabled}
            className={`w-full h-[60px] border px-4 pr-[70px] rounded bg-white placeholder:text-gray-400 focus:outline-none ${
              inputDisabled
                ? preserveStyleOnDisabled
                  ? "border-gray-300 text-black bg-white cursor-default"
                  : "border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                : "border-gray-300 focus:border-2 focus:border-primary"
            }`}
            {...register(name)}
          />
          {timerText && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 font-semibold pointer-events-none">
              {timerText}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onButtonClick}
          disabled={buttonDisabled}
          className={
            buttonClassName ??
            "w-full sm:w-auto h-[60px] px-4 border border-primary text-primary rounded hover:bg-primary hover:text-white transition whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-50"
          }
        >
          {buttonText}
        </button>
      </div>
      {errors[name] && <p className="text-red-500 mt-1 ml-2">{String(errors[name]?.message)}</p>}
    </div>
  );
}
