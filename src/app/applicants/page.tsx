"use client";
import { Heading } from "@/components/ui/Heading";
import ApplicantsListContainer from "@/features/applicants/components/ApplicantsListContainer";
import WelcomeBanner from "@/features/home/components/WelcomeBanner";

export default function applicantsPage() {
  return (
    <>
      <WelcomeBanner />
      <div className="w-full max-w-7xl mx-auto my-8 px-4 space-y-6">
        <Heading sizeOffset={3} className="font-bold">
          지원자 조회
        </Heading>
        <ApplicantsListContainer />
      </div>
    </>
  );
}
