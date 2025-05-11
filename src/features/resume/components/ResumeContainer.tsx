import ResumeContactSection from "@/features/resume/components/ResumeContactSection";
import ResumeSelfIntroductionSection from "@/features/resume/components/ResumeSelfIntroductionSection";
import ResumeTableSection from "@/features/resume/components/ResumeTableSection";
import { ResumeFormData } from "@/features/resume/validation/resumeSchema";

type ResumeContainerProps = {
  resume: ResumeFormData;
};

export default function ResumeContainer({ resume }: ResumeContainerProps) {
  return (
    <div className="max-w-3xl m-auto">
      <div className="ml-4 inline-block text-xl bg-primary/5 text-primary hover:bg-primary/10 rounded-full px-3 py-1.5 font-medium transition-colors">
        {resume.jobCategory} 전문가✨
      </div>

      <div className="py-5 px-6 h-full flex flex-col gap-8 rounded-md">
        <ResumeContactSection name={resume.name} phone={resume.phone} email={resume.email} />

        <ResumeTableSection
          sectionTitle="학력 사항"
          items={[
            { label: "학교 구분", value: resume.schoolType },
            { label: "학교명", value: resume.schoolName },
            { label: "졸업 상태", value: resume.graduationStatus },
          ]}
        />

        {(resume.experiences ?? []).map((exp, idx) => (
          <ResumeTableSection
            key={idx}
            sectionTitle={`경력 사항 ${(resume.experiences ?? []).length > 1 ? `#${idx + 1}` : ""}`}
            items={[
              { label: "회사명", value: exp.company },
              { label: "직무", value: exp.position },
              {
                label: "근무 기간",
                value: `${exp.startDate} ~ ${exp.isCurrent ? "재직 중" : exp.endDate}`,
              },
            ]}
          />
        ))}

        {(resume.certifications ?? []).map((cert, idx) => (
          <ResumeTableSection
            key={idx}
            sectionTitle={`자격증 ${(resume.certifications ?? []).length > 1 ? `#${idx + 1}` : ""}`}
            items={[
              { label: "자격증명", value: cert.name },
              { label: "발급 기관", value: cert.issuer },
              { label: "취득 일자", value: cert.date },
            ]}
          />
        ))}

        <ResumeSelfIntroductionSection title="자기 소개" content={resume.introduction} />
      </div>
    </div>
  );
}
