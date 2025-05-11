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
