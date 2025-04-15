"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

interface DeadlineProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

const Deadline = ({ value, onChange }: DeadlineProps) => {
  return (
    <div className="flex items-center gap-1 text-gray-700">
      {/* 라벨 */}
      <label className="text-sm font-medium text-gray-700">공고 마감일</label>

      {/* 날짜 선택기 */}
      <DatePicker
        selected={value}
        onChange={(date: Date | null) => onChange(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="공고마감일 선택"
        minDate={new Date()}
        locale={ko}
        className="ml-2 w-50 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F8C3B]"
      />
    </div>
  );
};

export default Deadline;
