import ApplicantsResume from "@/features/applicants/components/ApplicantsResume";
import BackNavOnApplicants from "@/features/applicants/components/BackNavOnApplicants";

export default function ApplicantDetailPage() {
  return (
    <>
      <div className="px-4">
        <BackNavOnApplicants />
        <ApplicantsResume />
      </div>
    </>
  );
}
