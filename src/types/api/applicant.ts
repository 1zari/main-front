// 지원자 목록 및 채용공고 리스트 응답 DTO
export interface ApplicantListWithJobPostingsResponseDto {
  message: string;
  job_posting_list: {
    job_posting_id: string; // UUID
    job_posting_title: string;
  }[];
  submission_list: {
    submission_id: string; // UUID
    job_posting_id: string; // UUID
    name: string;
    summary: string;
    is_read: boolean;
    created_at: string; // ISO date string (e.g., '2025-05-11T00:00:00Z')
    resume_title: string;
  }[];
}

export interface ApplicantResumeResponseDto {
  message: string;
  submission: {
    job_category: string;
    name: string;
    resume_title: string;
    education_level: string;
    school_name: string;
    education_state: string;
    introduce: string;
    career_list: {
      company_name: string;
      position: string;
      employment_period_start: string; // ISO date string
      employment_period_end: string; // ISO date string
    }[];
    certification_list: {
      certification_name: string;
      issuing_organization: string;
      date_acquired: string; // ISO date string
    }[];
  };
}
