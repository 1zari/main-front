"use client"

import { useFormContext, FieldValues, Path } from "react-hook-form"

type Props<T extends FieldValues> = {
  label: string
  name: Path<T>
  placeholder?: string
  buttonText: string
  onButtonClick: () => void
}

export default function FormActionInput<T extends FieldValues>({
  label,
  name,
  placeholder,
  buttonText,
  onButtonClick,
}: Props<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>()

  return (
    <div>
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg whitespace-normal break-keep">
        {label}
      </label>
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 w-full">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full h-[60px] border border-gray-300 rounded px-4 bg-white placeholder:text-gray-400 focus:outline-none focus:border-2 focus:border-primary"
          {...register(name)}
        />
        <button
          type="button"
          onClick={onButtonClick}
          className="w-full sm:w-auto h-[60px] px-4 border border-primary text-primary rounded hover:bg-primary hover:text-white transition whitespace-nowrap cursor-pointer"
        >
          {buttonText}
        </button>
      </div>
      {errors[name] && (
        <p className="text-red-500 mt-1 ml-2">{String(errors[name]?.message)}</p>
      )}
    </div>
  )
}
