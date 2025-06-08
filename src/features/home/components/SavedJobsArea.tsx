import { JobCard } from "@/features/home/components/JobCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaChevronRight } from "react-icons/fa";

interface JobPosting {
  job_posting_id: string;
  company_name: string;
  job_posting_title: string;
  city: string;
  district: string;
  is_bookmarked: boolean;
  deadline: string;
  summary: string;
  company_logo: string;
}

interface JobResponse {
  data: JobPosting[];
  message: string;
  page: number;
  total_pages: number;
  total_results: number;
}

const fetchJobs = async (): Promise<JobResponse> => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/job-postings?page=3`);
  return data;
};

export default function JobsArea({ className }: { className?: string }) {
  function MoreButton() {
    return (
      <button className="flex items-center gap-2 text-lg text-primary">
        더 보기
        <FaChevronRight />
      </button>
    );
  }

  const { data } = useQuery({
    queryKey: ["saved-jobs"],
    queryFn: fetchJobs,
  });

  const recentJobs = (data?.data ?? []).sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
  );

  return (
    <div className={className}>
      <div className="sticky top-0  z-999 bg-white">
        <div className="w-full max-w-7xl px-4 flex justify-between items-center py-6 mb-4 mx-auto">
          <h2 className="text-2xl font-semibold">마감 임박 공고</h2>
          <MoreButton />
        </div>
      </div>
      <section className="w-full max-w-7xl mx-auto my-8 px-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {recentJobs.slice(0, 9).map((job) => (
            <JobCard key={job.job_posting_id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
}
