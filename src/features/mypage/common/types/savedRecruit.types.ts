export type SalaryType = "시급" | "일급" | "월급";

export interface SavedRecruit {
  job_posting_id: string;
  companyName: string;
  job_posting_title: string;
  location: string;
  salary: number;
  salary_type: SalaryType;
  deadline: string;
  isSaved: boolean;
}

export interface SavedRecruitListProps {
  jobs: SavedRecruit[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onToggleSave: (jobId: string) => void;
}
