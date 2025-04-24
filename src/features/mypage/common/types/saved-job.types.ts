export interface SavedJob {
  id: string;
  companyName: string;
  title: string;
  location: string;
  salary: number;
  deadline: string;
  isSaved: boolean;
}

export interface SavedJobListProps {
  jobs: SavedJob[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onToggleSave: (jobId: string) => void;
}
