import type { ResumeFormData } from "@/features/resume/validation/resumeSchema";
import type { UpdateResumeRequestDto } from "@/types/api/resume";

export function mapToUpdateDto(data: ResumeFormData, resumeId: string): UpdateResumeRequestDto {
  return {
    resume_id: resumeId,
    job_category: data.jobCategory,
    resume_title: data.title,
    education_level: data.schoolType,
    school_name: data.schoolName,
    education_state: data.graduationStatus,
    introduce: data.introduction,
    career_list: (data.experiences ?? []).map((exp) => ({
      company_name: exp.company,
      position: exp.position,
      employment_period_start: exp.startDate,
      employment_period_end: exp.isCurrent ? null : exp.endDate || null,
    })),
    certification_list: (data.certifications ?? []).map((cert) => ({
      certification_name: cert.name,
      issuing_organization: cert.issuer,
      date_acquired: cert.date,
    })),
  };
}
