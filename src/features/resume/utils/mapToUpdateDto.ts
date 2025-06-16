import type { ResumeFormData } from "@/features/resume/validation/resumeSchema";
import type { UpdateResumeRequestDto } from "@/types/api/resume";

export function mapToUpdateDto(data: ResumeFormData, resumeId: string): UpdateResumeRequestDto {
  if (!resumeId?.trim()) {
    throw new Error("이력서 ID가 필요합니다.");
  }
  if (!data.jobCategory?.trim()) {
    throw new Error("직종은 필수 입력 항목입니다.");
  }
  if (!data.title?.trim()) {
    throw new Error("이력서 제목은 필수 입력 항목입니다.");
  }

  return {
    resume_id: resumeId.trim(),
    job_category: data.jobCategory.trim(),
    resume_title: data.title.trim(),
    education_level: data.schoolType,
    school_name: data.schoolName.trim(),
    education_state: data.graduationStatus,
    introduce: data.introduction?.trim() || "",
    career_list: (data.experiences || [])
      .filter((exp) => exp.company?.trim() && exp.position?.trim() && exp.startDate)
      .map((exp) => ({
        company_name: exp.company.trim(),
        position: exp.position.trim(),
        employment_period_start: exp.startDate,
        employment_period_end: exp.isCurrent ? null : exp.endDate?.trim() || null,
      })),
    certification_list: (data.certifications || [])
      .filter((cert) => cert.name?.trim() && cert.issuer?.trim() && cert.date)
      .map((cert) => ({
        certification_name: cert.name.trim(),
        issuing_organization: cert.issuer.trim(),
        date_acquired: cert.date,
      })),
  };
}
