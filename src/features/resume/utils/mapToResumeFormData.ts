import type { ResumeFormData } from "@/features/resume/validation/resumeSchema";
import type { ResumeResponseDto } from "@/types/api/resume";

export function mapToResumeFormData(
  dto: ResumeResponseDto["resume"],
  userEmail: string,
): ResumeFormData {
  return {
    jobCategory: dto.job_category,
    title: dto.resume_title,
    name: dto.user.name,
    phone: dto.user.phone_number,
    email: userEmail,
    schoolType: dto.education_level,
    schoolName: dto.school_name,
    graduationStatus: dto.education_state,
    experiences: dto.career_list.map((c) => ({
      company: c.company_name,
      position: c.position,
      startDate: c.employment_period_start,
      endDate: c.employment_period_end ?? "",
      isCurrent: c.employment_period_end === null,
    })),
    certifications: dto.certification_list.map((c) => ({
      name: c.certification_name,
      issuer: c.issuing_organization,
      date: c.date_acquired,
    })),
    introduction: dto.introduce,
  };
}
