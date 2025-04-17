"use client";
import { useFormContext, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

const Deadline = () => {
  const { control } = useFormContext();

  return (
    <div className="flex items-center">
      <label className="block text-sm font-medium text-gray-700 mb-1">공고 마감일</label>
      <Controller
        control={control}
        name="deadline"
        defaultValue={null}
        render={({ field }) => (
          <DatePicker
            locale={ko}
            dateFormat="yyyy-MM-dd"
            selected={field.value ?? null}
            onChange={(date: Date | null) => field.onChange(date)}
            className="ml-4 w-50 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F8C3B]"
            placeholderText="YYYY-MM-DD"
            minDate={new Date()}
      
          />
        )}
      />
    </div>
  );
};

export default Deadline;

