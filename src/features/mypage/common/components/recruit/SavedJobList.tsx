import { useRouter } from "next/navigation";
import { formatDate, formatSalary } from "@/utils/format";
import ScrapBtn from "@/components/ScrapBtn";
import { Heading } from "@/components/ui/Heading";
import type { SavedJobListProps } from "@/features/mypage/common/types/saved-job.types";

// 더미 데이터
const DUMMY_JOBS = [
  {
    job_posting_id: "1",
    companyName: "스타벅스코리아",
    job_posting_title: "[시니어 환영] 스타벅스 강남점 바리스타 모집",
    location: "서울 강남구",
    salary: 2850000,
    salary_type: "월급",
    deadline: "2024-05-30",
    isSaved: true,
  },
  {
    job_posting_id: "2",
    companyName: "이마트24",
    job_posting_title: "[주4일/시간협의] 편의점 야간 담당자 구함",
    location: "서울 서초구",
    salary: 15000,
    salary_type: "시급",
    deadline: "2025-05-15",
    isSaved: true,
  },
  {
    job_posting_id: "3",
    companyName: "파리바게뜨",
    job_posting_title: "[경력무관] 제과제빵 보조 직원 모집",
    location: "서울 송파구",
    salary: 2950000,
    salary_type: "월급",
    deadline: "2025-04-20",
    isSaved: true,
  },
  {
    job_posting_id: "4",
    companyName: "맥도날드",
    job_posting_title: "[주5일/오전] 맥도날드 매장관리 및 캐셔",
    location: "서울 종로구",
    salary: 120000,
    salary_type: "일급",
    deadline: "2024-05-10",
    isSaved: true,
  },
  {
    job_posting_id: "5",
    companyName: "롯데리아",
    job_posting_title: "[시간제] 롯데리아 주방 보조 알바생 구함",
    location: "서울 마포구",
    salary: 12000,
    salary_type: "시급",
    deadline: "2025-04-15",
    isSaved: true,
  },
  {
    job_posting_id: "6",
    companyName: "GS25",
    job_posting_title: "[즉시채용] GS25 편의점 매니저 구인",
    location: "서울 영등포구",
    salary: 3300000,
    salary_type: "월급",
    deadline: "2024-05-20",
    isSaved: true,
  },
  {
    job_posting_id: "7",
    companyName: "버거킹",
    job_posting_title: "[주말알바] 버거킹 캐셔 및 주방 직원",
    location: "서울 강동구",
    salary: 100000,
    salary_type: "일급",
    deadline: "2025-04-25",
    isSaved: true,
  },
  {
    job_posting_id: "8",
    companyName: "CU",
    job_posting_title: "[야간전담] CU 편의점 야간 매니저",
    location: "서울 용산구",
    salary: 15000,
    salary_type: "시급",
    deadline: "2024-05-25",
    isSaved: true,
  },
  {
    job_posting_id: "9",
    companyName: "던킨도너츠",
    job_posting_title: "[신입가능] 던킨도너츠 제과 생산직",
    location: "서울 강서구",
    salary: 2900000,
    salary_type: "월급",
    deadline: "2025-05-05",
    isSaved: true,
  },
  {
    job_posting_id: "10",
    companyName: "KFC",
    job_posting_title: "[주5일] KFC 주방 및 서빙 스태프",
    location: "서울 성동구",
    salary: 110000,
    salary_type: "일급",
    deadline: "2025-05-18",
    isSaved: true,
  },
  {
    job_posting_id: "11",
    companyName: "배스킨라빈스",
    job_posting_title: "[시니어우대] 아이스크림 제조 및 판매",
    location: "서울 중구",
    salary: 13000,
    salary_type: "시급",
    deadline: "2024-05-22",
    isSaved: true,
  },
  {
    job_posting_id: "12",
    companyName: "서브웨이",
    job_posting_title: "[경력무관] 서브웨이 샌드위치 아티스트",
    location: "서울 광진구",
    salary: 2880000,
    salary_type: "월급",
    deadline: "2025-05-28",
    isSaved: true,
  },
];

export default function SavedJobList({
  currentPage = 1,
  onPageChange,
  onToggleSave,
}: Partial<SavedJobListProps>) {
  const router = useRouter();
  const itemsPerPage = 10;
  const totalPages = Math.ceil(DUMMY_JOBS.length / itemsPerPage);

  const currentJobs = DUMMY_JOBS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const isDeadlinePassed = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pt-4 sm:pt-6">
        <Heading sizeOffset={3} className="pl-3 font-bold text-gray-900">
          저장한 공고 목록
        </Heading>
      </div>

      {/* 웹, 태블릿 뷰 */}
      <div className="hidden sm:block">
        <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center px-4 border-b border-gray-200 h-14 bg-gray-50">
            <div className="w-[8%] font-semibold text-gray-600 flex justify-center overflow-hidden">
              스크랩
            </div>
            <div className="w-[33%] font-semibold text-gray-600 flex justify-center px-2 overflow-hidden">
              회사명/공고제목
            </div>
            <div className="w-[17%] font-semibold text-gray-600 flex justify-center overflow-hidden">
              근무지
            </div>
            <div className="w-[17%] font-semibold text-gray-600 flex justify-center overflow-hidden">
              급여
            </div>
            <div className="w-[13%] font-semibold text-gray-600 flex justify-center overflow-hidden">
              급여형태
            </div>
            <div className="w-[12%] font-semibold text-gray-600 flex justify-center">마감일</div>
          </div>

          <div className="divide-y divide-gray-200">
            {currentJobs.map((job) => (
              <div
                key={job.job_posting_id}
                onClick={() => router.push(`/jobs/${job.job_posting_id}`)}
                className="flex items-stretch min-h-[5rem] px-2 hover:bg-gray-50 cursor-pointer group transition-colors"
              >
                <div
                  className="w-[8%] flex justify-center items-center overflow-hidden"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave?.(job.job_posting_id);
                  }}
                >
                  <ScrapBtn />
                </div>
                <div className="w-[33%] flex flex-col justify-center px-2 py-3 overflow-hidden">
                  <span className="font-medium text-gray-900 break-words">{job.companyName}</span>
                  <Heading
                    sizeOffset={1}
                    className="mt-0.5 font-medium text-gray-900 break-words group-hover:text-primary"
                  >
                    {job.job_posting_title}
                  </Heading>
                </div>
                <div className="w-[17%] text-gray-600 flex justify-center items-center overflow-hidden px-1">
                  <span className="text-center break-words">{job.location}</span>
                </div>
                <div className="w-[17%] text-gray-600 flex justify-center items-center overflow-hidden">
                  <div className="text-center break-words">{formatSalary(job.salary)}</div>
                </div>
                <div className="w-[13%] flex justify-center items-center overflow-hidden">
                  {job.salary_type === "시급" && (
                    <span className="text-orange-500 border border-orange-500 rounded-full px-1.5 py-0.5">
                      시급
                    </span>
                  )}
                  {job.salary_type === "일급" && (
                    <span className="text-emerald-500 border border-emerald-500 rounded-full px-1.5 py-0.5">
                      일급
                    </span>
                  )}
                  {job.salary_type === "월급" && (
                    <span className="text-blue-500 border border-blue-500 rounded-full px-1.5 py-0.5">
                      월급
                    </span>
                  )}
                </div>
                <div className="w-[12%] flex justify-center items-center whitespace-nowrap">
                  <div
                    className={isDeadlinePassed(job.deadline) ? "text-red-500" : "text-gray-600"}
                  >
                    {isDeadlinePassed(job.deadline) ? "마감" : formatDate(job.deadline)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 모바일 뷰 */}
      <div className="sm:hidden">
        <div className="space-y-4">
          {currentJobs.map((job) => (
            <div
              key={job.job_posting_id}
              onClick={() => router.push(`/jobs/${job.job_posting_id}`)}
              className="p-3 transition-colors bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 pr-3 overflow-hidden">
                  <span className="block font-medium text-gray-900 break-words">
                    {job.companyName}
                  </span>
                  <Heading
                    sizeOffset={1}
                    className="mt-0.5 font-medium text-gray-900 break-words group-hover:text-primary"
                  >
                    {job.job_posting_title}
                  </Heading>
                </div>
                <div
                  className="flex-none ml-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave?.(job.job_posting_id);
                  }}
                >
                  <ScrapBtn />
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="px-1.5 py-0.5 text-gray-600 break-words bg-gray-100 rounded">
                  {job.location}
                </span>
                <span className="px-1.5 py-0.5 text-gray-600 bg-gray-100 rounded">
                  {formatSalary(job.salary)}
                </span>
                {job.salary_type === "시급" && (
                  <span className="text-orange-500 border border-orange-500 rounded-full px-1.5 py-0.5">
                    시급
                  </span>
                )}
                {job.salary_type === "일급" && (
                  <span className="text-emerald-500 border border-emerald-500 rounded-full px-1.5 py-0.5">
                    일급
                  </span>
                )}
                {job.salary_type === "월급" && (
                  <span className="text-blue-500 border border-blue-500 rounded-full px-1.5 py-0.5">
                    월급
                  </span>
                )}
              </div>

              <div className="mt-2">
                <div className={isDeadlinePassed(job.deadline) ? "text-red-500" : "text-gray-600"}>
                  {isDeadlinePassed(job.deadline) ? "마감" : `${formatDate(job.deadline)}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange?.(page)}
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
