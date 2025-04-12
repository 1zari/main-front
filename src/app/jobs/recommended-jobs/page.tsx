import JobCard from "../../../features/home/components/JobCard";
import JobFilter from "../../../features/jobs/components/JobFilter";

export default function RecommendedJobsPage() {
  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-6">
        <JobFilter />
      </div>
      <div className="bg-gray-z-light py-6">
        <section className="w-full max-w-7xl mx-auto my-8 px-4 ">
          <div className="flex justify-between items-center py-6 mb-4">
            <h2 className="text-2xl font-semibold">추천 공고</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            <JobCard />
          </div>
        </section>
      </div>
    </>
  );
}
