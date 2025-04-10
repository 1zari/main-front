import { FaCaretDown } from "react-icons/fa"
export default function JobSearch() {
  return (
    <>
      <section className="w-full max-w-7xl mx-auto my-8 px-4">
        <div className="flex flex-col mb-4">
          <h2 className="text-2xl font-bold">빠르게 일자리를 찾아보기⚡️ </h2>
          <div className="max-w-2xl flex gap-2 mt-4 justify-between items-center">
            <button className="w-full border border-gray-300 px-5 py-3 rounded-md flex justify-center items-center gap-2 text-gray-500">
              근무지역
              <FaCaretDown />
            </button>
            <button className="w-full border border-gray-300 px-5 py-3 rounded-md flex justify-center items-center gap-2 text-gray-500">
              직종
              <FaCaretDown />
            </button>
            <button className="w-full bg-primary text-white px-7 py-3 rounded-md flex justify-center items-center gap-2">
              검색하기
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
