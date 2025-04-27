import VoiceInput from "@/components/VoiceInput";
import CompanyDashboard from "@/features/home/components/CompanyDashboard";
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
      <CompanyDashboard className="w-full text-center bg-gray-z" />
      <JobSearch className="w-full text-center bg-white" />
      <JobsArea className="w-full bg-gray-z" />
      <SavedJobsArea className="w-full bg-white" />
      <LandingReview className="w-full bg-gray-z" />
      <LandingPartnerCompany className="w-full bg-white" />
      <VoiceInput className="fixed bottom-4 z-999 right-4" />
    </main>
  );
}
