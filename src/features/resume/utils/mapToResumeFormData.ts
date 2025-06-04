import type { ResumeFormData } from "@/features/resume/validation/resumeSchema";
import type {
  CreateResumeRequestDto,
  ResumeResponseDto,
  UpdateResumeRequestDto,
} from "@/types/api/resume";

export function mapToResumeFormData(
  dto: ResumeResponseDto["resume"],
  userEmail: string,
): ResumeFormData {
  if (!dto) {
    throw new Error("이력서 데이터가 없습니다.");
  }
  if (!userEmail?.trim()) {
    throw new Error("사용자 이메일이 필요합니다.");
  }

  try {
    return {
      jobCategory: dto.job_category || "",
      title: dto.resume_title || "",
      name: dto.user?.name || "",
      phone: dto.user?.phone_number || "",
      email: userEmail.trim(),
      schoolType: dto.education_level || "",
      schoolName: dto.school_name || "",
      graduationStatus: dto.education_state || "",
      experiences: (dto.career_list || []).map((career) => ({
        company: career.company_name || "",
        position: career.position || "",
        startDate: career.employment_period_start || "",
        endDate: career.employment_period_end || "",
        isCurrent: career.employment_period_end === null,
      })),
      certifications: (dto.certification_list || []).map((cert) => ({
        name: cert.certification_name || "",
        issuer: cert.issuing_organization || "",
        date: cert.date_acquired || "",
      })),
      introduction: dto.introduce || "",
    };
  } catch (error) {
    console.error("데이터 변환 중 오류 발생:", error);
    throw new Error("이력서 데이터 변환에 실패했습니다.");
  }
}

export const validateCreateDto = (dto: CreateResumeRequestDto): boolean => {
  return !!(
    dto.job_category?.trim() &&
    dto.resume_title?.trim() &&
    dto.education_level &&
    dto.school_name?.trim() &&
    dto.education_state
  );
};

export const validateUpdateDto = (dto: UpdateResumeRequestDto): boolean => {
  return !!(
    dto.resume_id?.trim() &&
    dto.job_category?.trim() &&
    dto.resume_title?.trim() &&
    dto.education_level &&
    dto.school_name?.trim() &&
    dto.education_state
  );
};

export const sanitizeCareerData = (experiences: ResumeFormData["experiences"]) => {
  return (experiences || [])
    .filter((exp) => exp.company?.trim() && exp.position?.trim() && exp.startDate)
    .map((exp) => ({
      ...exp,
      company: exp.company.trim(),
      position: exp.position.trim(),
      endDate: exp.isCurrent ? "" : exp.endDate?.trim() || "",
    }));
};

export const sanitizeCertificationData = (certifications: ResumeFormData["certifications"]) => {
  return (certifications || [])
    .filter((cert) => cert.name?.trim() && cert.issuer?.trim() && cert.date)
    .map((cert) => ({
      ...cert,
      name: cert.name.trim(),
      issuer: cert.issuer.trim(),
    }));
};
