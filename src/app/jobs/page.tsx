import JobFilter from "../../features/jobs/components/JobFilter";
import JobsNav from "../../features/jobs/components/JobsNav";
import RecommendedJobsPage from "./recommended/page";

export default function JobsPage() {
  return (
    <div>
      <JobsNav />
      <div className="min-h-screen flex flex-col items-center">
        <div className="w-full max-w-7xl mx-auto px-6">
          <JobFilter />
        </div>
        <div className="w-full  mx-auto bg-gray-z">
          <RecommendedJobsPage />
        </div>
      </div>
    </div>
  );
}
