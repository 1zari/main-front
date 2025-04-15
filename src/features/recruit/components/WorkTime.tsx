"use client";

import CheckNegotiable from "./Negotiable";

// 🔧 컴포넌트에서 사용할 props 타입 정의
interface WorkTimeProps {
  valueStart: string;
  valueEnd: string;
  negotiable: boolean;
  onChangeStart: (value: string) => void;
  onChangeEnd: (value: string) => void;
  onChangeNegotiable: (value: boolean) => void;
}

// ⏰ 30분 단위 시간 배열 생성
const timeOptions = Array.from({ length: 48 }, (_, index) => {
  const hour = String(Math.floor(index / 2)).padStart(2, "0");
  const minute = index % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

// 📦 props 기반의 근무시간 컴포넌트
export default function WorkTime({
  valueStart,
  valueEnd,
  negotiable,
  onChangeStart,
  onChangeEnd,
  onChangeNegotiable,
}: WorkTimeProps) {
  return (
    <div className="text-gray-700">
      <div className="flex items-center">
        <label className="text-sm font-medium text-gray-700">근무 시간</label>

        {/* 시간 선택 드롭다운 */}
        <div className="flex items-center gap-1">
          {/* 시작 시간 */}
          <select
            className="ml-1 w-28 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F8C3B]"
            value={valueStart}
            onChange={(e) => onChangeStart(e.target.value)}
            disabled={negotiable} // 협의 가능 시 비활성화
          >
            <option value="">시작 시간</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          <span className="text-sm font-medium">~</span>

          {/* 종료 시간 */}
          <select
            className="w-28 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F8C3B]"
            value={valueEnd}
            onChange={(e) => onChangeEnd(e.target.value)}
            disabled={negotiable} // 협의 가능 시 비활성화
          >
            <option value="">종료 시간</option>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 하단 체크박스 */}
      <div className="mt-1 ml-14">
        <CheckNegotiable
          id="workTimeNegotiable"
          checked={negotiable}
          onChange={onChangeNegotiable}
        />
      </div>
    </div>
  );
}
