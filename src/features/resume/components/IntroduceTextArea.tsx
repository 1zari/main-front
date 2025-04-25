"use client";

import { useFormContext } from "react-hook-form";

const ResumeTextArea = () => {
  const { register } = useFormContext();

  return (
    <div>
      <label className="text-lg text-[#0F8C3B] font-bold">자기소개</label>
      <textarea
        {...register("textArea")}
        placeholder="자기소개서를 입력하세요"
        className="mt-2 h-40 border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#0F8C3B] bg-white"
      />
    </div>
  );
};
export default ResumeTextArea;
