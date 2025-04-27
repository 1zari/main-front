export default function SashaTest() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">채용공고 등록</h2>
      <div className="space-y-4">
        <input className="w-full border p-2 rounded" placeholder="공고 제목 (50자 이내)" />
        <input className="w-full border p-2 rounded" placeholder="직종 (예: 서비스, 고객상담)" />
        <div className="flex gap-2">
          <button className="border px-4 py-2 rounded">정규직</button>
          <button className="border px-4 py-2 rounded">계약직</button>
        </div>
        <input className="w-full border p-2 rounded" placeholder="모집인원 (명)" />
        <div className="flex gap-2">
          <button className="border px-4 py-2 rounded">경력무관</button>
          <button className="border px-4 py-2 rounded">경력</button>
        </div>
        <div className="flex gap-2">
          <button className="border px-4 py-2 rounded">고졸</button>
          <button className="border px-4 py-2 rounded">대졸</button>
          <button className="border px-4 py-2 rounded">학력무관</button>
        </div>
        <input className="w-full border p-2 rounded" placeholder="근무지" />
        <input className="w-full border p-2 rounded" placeholder="공고 마감일 (YYYY-MM-DD)" />
        <input className="w-full border p-2 rounded" placeholder="급여 (예: 2,000,000)" />
        <div className="flex gap-2 flex-wrap">
          {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
            <button key={day} className="border px-4 py-2 rounded">
              {day}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <input className="border p-2 rounded w-1/2" placeholder="시작시간 (예: 09:00)" />
          <span>~</span>
          <input className="border p-2 rounded w-1/2" placeholder="종료시간 (예: 16:00)" />
        </div>
        <input className="w-full border p-2 rounded" placeholder="근무요약 (50자 이내)" />
        <textarea className="w-full border p-2 rounded h-24" placeholder="상세요강" />
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          <label>이용약관에 동의합니다.</label>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">등록하기</button>
      </div>
    </div>
  );
}
