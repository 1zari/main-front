//채용 공고 리스트 조회 응답 DTO
export interface JobPostsListResponseDto {
  message: string;
  data: {
    job_posting_id: string;
    company_name: string;
    company_address: string;
    job_posting_title: string;
    summary: string;
    deadline: string;
    is_bookmarked: boolean;
  }[];
}

//채용공고 상세 조회 응답 Dto
export interface JobPostDetailResponseDto {
  message: string;
  job_posting: {
    job_posting_id: string;
    company_id: string;
    job_posting_title: string;
    address: string;
    city: string;
    district: string;
    location: [number, number];
    work_time_start: string;
    work_time_end: string;
    posting_type: string;
    employment_type: string;
    job_keyword_main: string;
    job_keyword_sub: string;
    number_of_positions: number;
    education: string;
    deadline: string;
    time_discussion: string;
    day_discussion: string;
    work_day: string;
    salary_type: string;
    salary: string;
    summary: string;
    content: string;
    is_bookmarked: boolean;
  };
}

// 채용 공고 등록 요청 DTO
export interface JobPostRequestDto {
  job_posting_title: string;
  address: string;
  city: string;
  district: string;
  location: [number, number];
  work_time_start: string;
  work_time_end: string;
  posting_type: string;
  employment_type: string;
  job_keyword_main: string;
  job_keyword_sub: string;
  number_of_positions: number;
  education: string;
  deadline: string;
  time_discussion: string;
  day_discussion: string;
  work_day: string;
  salary_type: string;
  salary: string;
  summary: string;
  content: string;
}

// 채용 공고 등록 응답 DTO
export interface JobPostResponseDto {
  message: string;
  job_posting: {
    job_posting_id: string;
    company_id: string;
    job_posting_title: string;
    address: string;
    city: string;
    district: string;
    location: [number, number];
    work_time_start: string;
    work_time_end: string;
    posting_type: string;
    employment_type: string;
    job_keyword_main: string;
    job_keyword_sub: string;
    number_of_positions: number;
    education: string;
    deadline: string;
    time_discussion: string;
    day_discussion: string;
    work_day: string;
    salary_type: string;
    salary: string;
    summary: string;
    content: string;
    is_bookmarked: boolean;
  };
}

// 채용 공고 수정 요청 DTO
export interface UpdateJobPostRequestDto {
  job_posting_title: string;
  address: string;
  city: string;
  district: string;
  location: [number, number];
  work_time_start: string;
  work_time_end: string;
  posting_type: string;
  employment_type: string;
  job_keyword_main: string;
  job_keyword_sub: string;
  number_of_positions: number;
  education: string;
  deadline: string;
  time_discussion: string;
  day_discussion: string;
  work_day: string;
  salary_type: string;
  salary: string;
  summary: string;
  content: string;
}

// 채용 공고 수정 응답 DTO
export interface UpdateJobPostResponseDto {
  message: string;
  job_posting: {
    job_posting_id: string;
    company_id: string;
    job_posting_title: string;
    address: string;
    city: string;
    district: string;
    location: [number, number];
    work_time_start: string;
    work_time_end: string;
    posting_type: string;
    employment_type: string;
    job_keyword_main: string;
    job_keyword_sub: string;
    number_of_positions: number;
    education: string;
    deadline: string;
    time_discussion: string;
    day_discussion: string;
    work_day: string;
    salary_type: string;
    salary: string;
    summary: string;
    content: string;
    is_bookmarked: boolean;
  };
}

// 채용 공고 삭제 응답 DTO
export interface DeleteJobPostResponseDto {
  message: string;
}
