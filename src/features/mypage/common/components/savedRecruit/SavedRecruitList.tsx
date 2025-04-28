import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SavedRecruitListProps } from "@/features/mypage/common/types/savedRecruit.types";
import { ITEMS_PER_PAGE } from "@/features/mypage/common/constants/myPageTab";
import { JOB_LIST_STYLES } from "@/features/mypage/common/constants/savedJobListStyles";
import JobListHeader from "./JobListHeader";
import JobListItem from "./JobListItem";
import Pagination from "./Pagination";
import EmptySavedJobContent from "./EmptySavedJobContent";
import TableHeader from "./TableHeader";

export default function SavedJobList({
  jobs = [],
  currentPage = 1,
  onPageChange,
  onToggleSave,
}: Partial<SavedRecruitListProps>) {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState<Set<string>>(new Set());
  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const currentJobs = jobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSelectAll = () => {
    if (selectedJobs.size === currentJobs.length) {
      setSelectedJobs(new Set());
    } else {
      setSelectedJobs(new Set(currentJobs.map((job) => job.job_posting_id)));
    }
  };

  const handleSelect = (jobId: string) => {
    const newSelected = new Set(selectedJobs);
    if (newSelected.has(jobId)) {
      newSelected.delete(jobId);
    } else {
      newSelected.add(jobId);
    }
    setSelectedJobs(newSelected);
  };

  const handleDelete = () => {
    // TODO: 선택된 공고 삭제 로직 구현
    console.log("Delete jobs:", Array.from(selectedJobs));
    setSelectedJobs(new Set());
    setIsEditMode(false);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedJobs(new Set());
  };

  if (jobs.length === 0) {
    return <EmptySavedJobContent />;
  }

  return (
    <div className={JOB_LIST_STYLES.container}>
      <JobListHeader
        isEditMode={isEditMode}
        selectedCount={selectedJobs.size}
        onToggleEditMode={toggleEditMode}
        onDelete={handleDelete}
      />

      <div className={JOB_LIST_STYLES.table.wrapper}>
        <div className={JOB_LIST_STYLES.table.container}>
          <TableHeader
            isEditMode={isEditMode}
            hasSelectedAll={selectedJobs.size === currentJobs.length && currentJobs.length > 0}
            onSelectAll={handleSelectAll}
          />

          {/* 테이블 본문 */}
          <div className="divide-y divide-gray-200">
            {currentJobs.map((job) => (
              <JobListItem
                key={job.job_posting_id}
                job={job}
                isEditMode={isEditMode}
                isSelected={selectedJobs.has(job.job_posting_id)}
                onSelect={handleSelect}
                onToggleSave={onToggleSave!}
                onClick={(id) => router.push(`/jobs/${id}`)}
              />
            ))}
          </div>
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange!} />
    </div>
  );
}
