"use client";

import React from "react";

interface CheckNegotiableProps {
  id: string; // 체크박스 ID (여러 곳에서 쓸 수 있도록 분리)
  checked: boolean; // 현재 체크 여부 (form에서 상태 관리용)
  onChange: (checked: boolean) => void; // 체크 시 실행할 함수
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
