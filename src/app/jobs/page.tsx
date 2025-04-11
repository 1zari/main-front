import JobFilter from "../../features/jobs/components/JobFilter"
import JobsList from "../../features/jobs/components/JobsList"
import JobsNav from "../../features/jobs/components/JobsNav"

export default function JobsPage() {
  return (
    <div>
      <JobsNav />
      <div className="min-h-screen flex flex-col items-center">
        <div className="w-full max-w-7xl mx-auto px-6">
          <JobFilter />
          <JobsList />
        </div>
      </div>
    </div>
  )
}
