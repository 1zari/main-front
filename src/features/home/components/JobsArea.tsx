import { FaChevronRight } from "react-icons/fa";
import JobCard from "./JobCard";

export default function JobsArea() {
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
      <section className="w-full max-w-7xl mx-auto my-8 px-4 ">
        <div className="flex justify-between items-center py-6 mb-4">
          <h2 className="text-2xl font-bold">최근에 등록된 공고</h2>
          <MoreButton />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
      </section>
    </>
  );
}
