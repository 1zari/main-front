export default function ApplicantsListControlArea() {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">채용공고</label>
          <select className="border px-3 py-2 rounded-md">
            <option>전체</option>
            <option>디자인 인턴</option>
            <option>프론트엔드 개발자</option>
            <option>운영 지원</option>
          </select>
        </div>
        <div>
          <select className="border px-3 py-2 rounded-md">
            <option>최신순</option>
            <option>이름순</option>
            <option>지원일순</option>
          </select>
        </div>
      </div>
    </>
  );
}
