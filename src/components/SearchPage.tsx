export default function SearchPage() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">검색 화면</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="flex-1 border px-3 py-2 rounded"
        />
        <button type="button" className="px-3 bg-primary text-white rounded">
          검색
        </button>
      </div>
    </div>
  );
}
