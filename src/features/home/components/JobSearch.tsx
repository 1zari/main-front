import { FaCaretDown } from "react-icons/fa";
export default function JobSearch() {
  return (
    <>
      <section className="w-full max-w-7xl mx-auto my-8 px-4">
        <div className="flex flex-col mb-4">
          <h2 className="text-xl font-bold py-6">빠르게 일자리 찾아보기⚡️</h2>
          <div className="max-w-2xl flex gap-2 mt-4 justify-between items-center">
            <button className="w-full border border-gray-300 px-2 py-3 rounded-md flex justify-center items-center gap-2 text-gray-500">
              근무지역
              <FaCaretDown />
            </button>
            <button className="w-full border border-gray-300 px-2 py-3 rounded-md flex justify-center items-center gap-2 text-gray-500">
              직종
              <FaCaretDown />
            </button>
            <button className="w-full bg-primary text-white px-2 py-3 rounded-md flex justify-center items-center gap-2">
              검색하기
            </button>
          </div>
          <div className="max-w-2xl flex gap-2 mt-4 justify-between items-center">
            <div className="flex flex-wrap gap-2 mt-4">
              <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md">
                공공 일자리
              </button>
              <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md">사무</button>
              <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md">서비스</button>
              <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md">기술직</button>
              <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md">교육/강사</button>
              <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md">운전/배송</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
