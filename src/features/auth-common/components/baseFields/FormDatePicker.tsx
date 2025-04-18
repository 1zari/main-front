"use client"
import { Controller, useFormContext } from "react-hook-form"
import { CalendarIcon } from "lucide-react"
import DatePicker from "react-datepicker"
import { ko } from "date-fns/locale"
import { CompanyFormValues } from "@/features/auth-company/validation/company-auth.schema"
import "react-datepicker/dist/react-datepicker.css"

type Props = {
  label: string
  name: keyof CompanyFormValues
}

export default function FormDatePicker({ label, name }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext<CompanyFormValues>()

  return (
    <div className="w-full">
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="relative w-full">
            <DatePicker
              selected={field.value ? new Date(field.value) : null}
              onChange={(date: Date | null) => {
                const formatted = date?.toISOString().split("T")[0] || ""
                field.onChange(formatted)
              }}
              dateFormat="yyyy-MM-dd"
              placeholderText="입력란을 클릭하여 달력에서 개업년월일을 선택해 주세요."
              locale={ko}
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              dropdownMode="select"
              className="w-full h-[60px] pr-12 pl-4 rounded bg-white placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:border-2 focus:border-primary block"
              wrapperClassName="w-full"
            />
            <CalendarIcon
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
          </div>
        )}
      />
      {errors[name] && (
        <p className="text-red-500 mt-1 ml-2">{String(errors[name]?.message)}</p>
      )}
    </div>
  )
}
