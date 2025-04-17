import JobsArea from "../features/home/components/JobsArea";
import JobSearch from "../features/home/components/JobSearch";
import LandingPartnerCompany from "../features/home/components/LandingPartnerCompany";
import LandingReview from "../features/home/components/LandingReview";
import SavedJobsArea from "../features/home/components/SavedJobsArea";
import WelcomeBanner from "../features/home/components/WelcomeBanner";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <WelcomeBanner />

      <JobSearch />
      <div className="w-full bg-gray-z">
        <JobsArea />
      </div>
      <div className="w-full bg-white">
        <SavedJobsArea />
      </div>
      <div className="w-full bg-gray-z">
        <LandingReview />
      </div>
      <div className="w-full bg-white ">
        <LandingPartnerCompany />
      </div>
    </main>
  );
}
