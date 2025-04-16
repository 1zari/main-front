"use client";

import { useState } from "react";

const Agreement = () => {
  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className="flex flex-col gap-2 mt-4">
      {/* 체크박스 */}
      <div className="flex items-center">
        <input
          id="agreement"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className={`
          appearance-none w-4 h-4 border-2 rounded-sm
          mr-2 transition-colors
          ${agreed ? "bg-[#0F8C3B] border-[#0F8C3B]" : "bg-gray-100 border-gray-300"}
        `}
        />
        <label
          htmlFor="agreement"
          className={`text-sm ${agreed ? "text-black font-medium" : "text-gray-500"}`}
        >
          이용약관에 동의합니다.
        </label>

        {/* 약관 보기 버튼 */}
        <button
          type="button"
          onClick={() => setShowTerms(!showTerms)}
          className="ml-1 text-sm text-[#0F8C3B] underline"
        >
          (약관 보기)
        </button>
      </div>

      {/* 약관 내용 */}
      {showTerms && (
        <div className="text-xs border rounded-md p-3 bg-gray-50 text-gray-700 max-h-40 overflow-y-auto">
          <p>이용약관내용들</p>
        </div>
      )}
    </div>
  );
};

export default Agreement;
