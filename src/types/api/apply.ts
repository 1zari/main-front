export interface ApplyRequestDto {
  job_posting_id: string;
  resume_id: string;
}

export interface ApplyResponseDto {
  message: string;
  submission: {
    submission_id: string;
    job_posting: {
      job_posting_id: string;
      city: string;
      district: string;
      company_name: string;
      company_address: string;
      job_posting_title: string;
      summary: string;
      deadline: string;
      is_bookmarked: boolean;
    };
    snapshot_resume: {
      job_category: string;
      resume_title: string;
      education_level: string;
      school_name: string;
      education_state: string;
      introduce: string;
      career_list: {
        company_name: string;
        position: string;
        employment_period_start: string;
        employment_period_end: string | null;
      }[];
      certification_list: {
        certification_name: string;
        issuing_organization: string;
        date_acquired: string;
      }[];
    };
    memo: string | null;
    is_read: boolean;
    created_at: string;
  };
}
