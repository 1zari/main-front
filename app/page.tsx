import JobsArea from "./home/components/JobsArea"
import JobSearch from "./home/components/JobSearch"
import WelcomeBanner from "./home/components/WelcomeBanner"

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <WelcomeBanner />
      <JobSearch />
      <div className="w-full bg-gray-50">
        <JobsArea />
      </div>
    </main>
  )
}
