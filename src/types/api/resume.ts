export interface CreateResumeRequestDto {
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
}

export interface UpdateResumeRequestDto extends CreateResumeRequestDto {
  resume_id: string;
}

export interface ResumeResponseDto {
  message: string;
  resume: {
    job_category: string;
    resume_id: string;
    resume_title: string;
    education_level: string;
    school_name: string;
    education_state: string;
    introduce: string;
    updated_at: string;
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
    user: {
      user_id: string;
      name: string;
      phone_number: string;
      gender: string;
      birthday: string | null;
      interest: string[];
      purpose_subscription: string[];
      route: string[];
    };
  };
}

export interface ResumeListResponseDto {
  message: string;
  resume_list: ResumeResponseDto["resume"][];
}
