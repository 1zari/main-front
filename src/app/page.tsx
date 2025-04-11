import JobsArea from "../features/home/components/JobsArea"
import JobSearch from "../features/home/components/JobSearch"
import WelcomeBanner from "../features/home/components/WelcomeBanner"

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <WelcomeBanner />
      <JobSearch />
      <div className="w-full bg-gray-z">
        <JobsArea />
      </div>
    </main>
  )
}
