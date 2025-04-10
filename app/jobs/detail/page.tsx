import JobDetailNav from "./JobDetailNav"

export default function page() {
  return (
    <>
      <div>
        <JobDetailNav />
        <div className="min-h-screen flex flex-col items-center">
          <div className="w-full max-w-7xl mx-auto px-6">detail page</div>
        </div>
      </div>
    </>
  )
}
