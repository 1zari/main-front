import JobCard from "../../../features/home/components/JobCard";

export default function RecommendedJobsPage() {
  return (
    <>
      <section className="w-full max-w-7xl mx-auto my-8 px-4 ">
        <div className="flex justify-between items-center py-6 mb-4">
          <h2 className="text-2xl font-semibold">추천 공고</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          <JobCard />
        </div>
      </section>
    </>
  );
}
