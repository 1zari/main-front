"use client"
import { useFormContext } from "react-hook-form"
import { CompanyFormValues } from "@/features/auth-company/validation/company-auth.schema"

type Props = {
  label: string
  name: keyof CompanyFormValues
  type?: string
  placeholder?: string
}

export default function FormInput({
  label,
  name,
  type = "text",
  placeholder,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CompanyFormValues>()

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
