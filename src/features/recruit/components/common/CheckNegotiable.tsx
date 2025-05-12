"use client";

import React from "react";

interface CheckNegotiableProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckNegotiable = ({ id, checked, onChange }: CheckNegotiableProps) => {
  return (
    <div className="flex items-center">
      {/* 체크박스 */}
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={`
          appearance-none w-4 h-4 border-2 rounded-sm
          mr-2 transition-colors
          ${checked ? "bg-[#0F8C3B] border-[#0F8C3B]" : "bg-gray-100 border-gray-300"}
        `}
      />

      {/* 체크박스 라벨 */}
      <label
        htmlFor={id}
        className={`text-sm transition-colors ${checked ? "text-black font-medium" : "text-gray-500"}`}
      >
        협의 가능
      </label>
    </div>
  );
};

export default CheckNegotiable;
