"use client";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import { useWatch } from "react-hook-form";

type TextAreaProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  maxLength?: number;
  "aria-label"?: string;
  "aria-describedby"?: string;
};

export default function TextArea<T extends FieldValues>({
  label,
  name,
  placeholder,
  disabled = false,
  rows = 5,
  maxLength = 500,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
}: TextAreaProps<T>) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<T>();

  const watchedValue = useWatch({ control, name });
  const currentLength = watchedValue?.length || 0;

  const error = errors[name];
  const hasError = !!error;
  const errorId = `${name}-error`;
  const helpId = `${name}-help`;
  const counterId = `${name}-counter`;

  // aria-describedby 조합
  const describedBy = [ariaDescribedBy, hasError ? errorId : null, helpId, counterId]
    .filter(Boolean)
    .join(" ");

  const isNearLimit = currentLength > maxLength * 0.8;
  const isOverLimit = currentLength > maxLength;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-3 ml-2 font-semibold text-base sm:text-lg text-[#28562c]"
        >
          {label}
          <span className="sr-only">(최대 {maxLength}자)</span>
        </label>
      )}
      <div className="relative">
        <textarea
          id={name}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          {...register(name)}
          className={`w-full px-4 py-3 border rounded resize-none placeholder:text-gray-400 transition
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            ${
              disabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300"
                : hasError
                  ? "border-red-500"
                  : "border-gray-300 bg-white"
            }
          `}
          aria-label={ariaLabel}
          aria-describedby={describedBy}
          aria-invalid={hasError}
          aria-required="true"
        />
        <div
          id={counterId}
          className={`absolute bottom-3 right-3 text-xs font-medium pointer-events-none
            ${isOverLimit ? "text-red-500" : isNearLimit ? "text-yellow-600" : "text-gray-400"}
          `}
          role="status"
          aria-live="polite"
          aria-label={`현재 글자수 ${currentLength}자, 최대 ${maxLength}자`}
        >
          {currentLength}/{maxLength}
        </div>
      </div>
      <div id={helpId} className="sr-only">
        자기소개는 최대 {maxLength}자까지 작성할 수 있습니다.
        {isNearLimit && "글자수 제한에 가까워지고 있습니다."}
        {isOverLimit && "글자수 제한을 초과했습니다."}
      </div>
      {hasError && (
        <p id={errorId} className="text-red-500 mt-1 ml-2" role="alert" aria-live="polite">
          {String(error?.message)}
        </p>
      )}
      {isOverLimit && (
        <p className="text-red-500 text-sm mt-1 ml-2" role="alert">
          글자수 제한({maxLength}자)을 초과했습니다.
        </p>
      )}
    </div>
  );
}
