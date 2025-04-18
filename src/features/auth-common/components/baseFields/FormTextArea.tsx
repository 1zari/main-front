"use client"
import { useFormContext } from "react-hook-form"
import { CompanyFormValues } from "@/features/auth-company/validation/company-auth.schema"

type Props = {
  label: string
  name: keyof CompanyFormValues
  placeholder?: string
}

export default function FormTextArea({ label, name, placeholder }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext<CompanyFormValues>()

  return (
    <div>
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">
        {label}
      </label>
      <textarea
        placeholder={placeholder || `${label}을 입력해주세요`}
        className="w-full h-[140px] pt-4 border border-gray-300 rounded px-4 bg-white resize-none placeholder:text-gray-400 focus:outline-none focus:border-2 focus:border-primary"
        {...register(name)}
      />
      {errors[name] && (
        <p className="text-red-500 mt-1 ml-2">{String(errors[name]?.message)}</p>
      )}
    </div>
  )
}
