import RecommendedJobsPage from "./recommended-jobs/page";

export default function JobsPage() {
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center">
        <div className="w-full  mx-auto bg-gray-z">
          <RecommendedJobsPage />
        </div>
      </div>
    </div>
  );
}
