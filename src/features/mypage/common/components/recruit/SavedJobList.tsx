import { useRouter } from "next/navigation";
import { formatDate, formatSalary } from "@/utils/format";
import ScrapBtn from "@/components/ScrapBtn";
import type { SavedJobListProps } from "@/features/mypage/common/types/saved-job.types";

export default function SavedJobList({
  jobs,
  currentPage,
  totalPages,
  onPageChange,
  onToggleSave,
}: SavedJobListProps) {
  const router = useRouter();

  const isDeadlinePassed = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex items-center justify-between p-4 transition-colors bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-primary"
            onClick={() => router.push(`/jobs/${job.id}`)}
          >
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{job.companyName}</h3>
                  <p className="text-gray-600">{job.title}</p>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(job.id);
                  }}
                >
                  <ScrapBtn />
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{job.location}</span>
                <span>{formatSalary(job.salary)}</span>
                <span>
                  {isDeadlinePassed(job.deadline) ? "마감" : `~${formatDate(job.deadline)}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
