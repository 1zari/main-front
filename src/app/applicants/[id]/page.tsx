import ApplicantsResume from "@/features/applicants/components/ApplicantsResume";
import BackNavOnApplicatns from "@/features/applicants/components/BackNavOnApplicatns";

export default function ApplicantDetailPage() {
  return (
    <>
      <div className="px-4">
        <BackNavOnApplicatns />
        <ApplicantsResume />
      </div>
    </>
  );
}
