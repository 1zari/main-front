"use client"

import { useFormContext, FieldValues, Path } from "react-hook-form"

type Props<T extends FieldValues> = {
  label: string
  name: Path<T>
  type?: string
  placeholder?: string
}

export default function FormInput<T extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
}: Props<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>()

  return (
    <div>
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-[60px] border border-gray-300 rounded px-4 bg-white placeholder:text-gray-400 focus:outline-none focus:border-2 focus:border-primary"
        {...register(name)}
      />
      {errors[name] && (
        <p className="text-red-500 mt-1 ml-2">{String(errors[name]?.message)}</p>
      )}
    </div>
  )
}
