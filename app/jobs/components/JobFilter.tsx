import { FaCaretDown } from "react-icons/fa"
export default function JobFilter() {
  return (
    <>
      <section className="w-full max-w-7xl mx-auto my-8">
        <div className="flex flex-col mb-4">
          <h2 className="text-2xl font-bold py-6">
            <span className="text-primary">전체 지역, 모든 직종</span>에 대한
            채용공고에요!
            <br />
            검색 조건을 변경하고 싶으신가요?
          </h2>
          <div className="max-w-2xl flex gap-2 mt-4 justify-between items-center">
            <button className="w-full border border-gray-300 px-2 py-3 rounded-md flex justify-center items-center gap-2 text-gray-500">
              근무지역
              <FaCaretDown />
            </button>
            <button className="w-full border border-gray-300 px-2 py-3 rounded-md flex justify-center items-center gap-2 text-gray-500">
              직종
              <FaCaretDown />
            </button>
            <button className="w-full border border-gray-300 px-2 py-3 rounded-md flex justify-center items-center gap-2 text-gray-500">
              상세조건
              <FaCaretDown />
            </button>
            <button className="w-full bg-primary text-white px-2 py-3 rounded-md flex justify-center items-center gap-2">
              검색하기
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
