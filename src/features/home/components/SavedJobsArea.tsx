import { FaChevronRight } from "react-icons/fa";
import JobCard from "./JobCard";

export default function SavedJobsArea() {
  function MoreButton() {
    return (
      <button className="flex items-center gap-2 text-lg text-primary">
        더 보기
        <FaChevronRight />
      </button>
    );
  }
  return (
    <>
      <div className="sticky top-0  z-999  bg-white">
        <div className="w-full max-w-7xl px-4 flex justify-between items-center py-6 mb-4 mx-auto">
          <h2 className="text-2xl font-semibold">내가 저장한 공고</h2>
          <MoreButton />
        </div>
      </div>
      <section className="w-full max-w-7xl mx-auto my-8 px-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <JobCard />
        </div>
      </section>
    </>
  );
}
