"use client";

import { applicantListApi } from "@/api/applicant";
import ResumeContactSection from "@/features/resume/components/ResumeContactSection";
import ResumeSelfIntroductionSection from "@/features/resume/components/ResumeSelfIntroductionSection";
import ResumeTableSection from "@/features/resume/components/ResumeTableSection";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function ApplicantsResume() {
  const params = useParams();
  const id = params.id as string;

  const { data: resume, isLoading } = useQuery({
    queryKey: ["applicantResume", id],
    queryFn: () => applicantListApi.getApplicantResume(id),
  });

  if (isLoading || !resume) return <div>불러오는 중...</div>;

  const {
    name,
    // resume_title,
    education_level,
    school_name,
    education_state,
    introduce,
    career_list,
    certification_list,
  } = resume.submission;

  return (
    <div className="max-w-3xl my-7 m-auto">
      <div className="border b-gray-300 py-9 px-6 h-full flex flex-col gap-8 rounded-md">
        <ResumeContactSection name={name} phone="-" email="-" />
        <ResumeTableSection
          sectionTitle="학력 사항"
          items={[
            { label: "학교 구분", value: education_level },
            { label: "학교명", value: school_name },
            { label: "졸업 상태", value: education_state },
          ]}
        />
        {career_list.map((career, i) => (
          <ResumeTableSection
            key={`career-${i}`}
            sectionTitle="경력 사항"
            items={[
              { label: "회사명", value: career.company_name },
              { label: "직무", value: career.position },
              {
                label: "근무 기간",
                value: `${career.employment_period_start} ~ ${career.employment_period_end}`,
              },
            ]}
          />
        ))}
        {certification_list.map((cert, i) => (
          <ResumeTableSection
            key={`cert-${i}`}
            sectionTitle="자격증"
            items={[
              { label: "자격증명", value: cert.certification_name },
              { label: "발급 기관", value: cert.issuing_organization },
              { label: "취득 일자", value: cert.date_acquired },
            ]}
          />
        ))}
        <ResumeSelfIntroductionSection title="자기 소개" content={introduce} />
      </div>
    </div>
  );
}
