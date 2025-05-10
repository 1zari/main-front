"use client";

import { jobPostApi } from "@/api/job";
import ApplyButton from "@/features/jobs/components/job-detail-bottom-btns/ApplyButton";
import KakaoShareButton from "@/features/jobs/components/job-detail-bottom-btns/KakaoShareButton";
import StickyApplyKakaoShareButton from "@/features/jobs/components/job-detail-bottom-btns/StickyApplyKakaoShareButton";
import JobDetailSection from "@/features/jobs/components/JobDetailSection";
import type { JobPostDetailResponseDto } from "@/types/api/job";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";

interface JobDetailContentProps {
  jobPostingId: string;
}

export default function JobDetailContent({ jobPostingId }: JobDetailContentProps) {
  const [jobPosting, setJobPosting] = useState<JobPostDetailResponseDto["job_posting"] | null>(
    null,
  );
  const bottomButtonRef = useRef<HTMLDivElement>(null);
  const [isBottomVisible, setIsBottomVisible] = useState(false);

  // 카카오 초기화
  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY!);
    }
  }, []);

  // 상세 공고 불러오기
  useEffect(() => {
    const fetchJobPosting = async () => {
      const res = await jobPostApi.getJobPostDetail(jobPostingId);
      setJobPosting(res.job_posting);
    };

    fetchJobPosting();
  }, [jobPostingId]);

  // 버튼 영역 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsBottomVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );

    if (bottomButtonRef.current) {
      observer.observe(bottomButtonRef.current);
    }

    return () => {
      if (bottomButtonRef.current) {
        observer.unobserve(bottomButtonRef.current);
      }
    };
  }, []);

  // 로딩중 처리
  if (!jobPosting) {
    return <p>불러오는 중...</p>;
  }

  const {
    job_posting_title,
    address,
    summary,
    salary,
    employment_type,
    work_day,
    work_time_start,
    work_time_end,
    deadline,
    job_keyword_main,
    education,
    number_of_positions,
    content,
    company_id,
  } = jobPosting;

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <div className="w-full max-w-3xl mx-auto px-6">
        <section className="bg-white space-y-8">
          {/* 회사정보 */}
          <div className="flex flex-col gap-2">
            <img
              src={"/default-image.png"}
              className="rounded w-12 h-12 object-contain bg-gray-200"
              alt="회사 로고"
            />
            <p>회사명: {company_id}</p>
            <h2 className="text-xl font-semibold mb-2">{job_posting_title}</h2>
          </div>

          <JobDetailSection
            title="고용조건"
            items={[
              { label: "급여", value: salary || "협의 후 결정" },
              { label: "고용형태", value: employment_type },
              { label: "근무요약", value: summary },
              { label: "근무요일", value: work_day },
              { label: "근무시간", value: `${work_time_start} ~ ${work_time_end}` },
            ]}
          />

          <JobDetailSection
            title="모집조건"
            items={[
              { label: "마감일", value: deadline },
              { label: "경력사항", value: job_keyword_main },
              { label: "최종학력", value: education },
              { label: "모집인원", value: `${number_of_positions ?? "-"}명` },
            ]}
          />

          <JobDetailSection title="근무지" items={[{ value: address }]} />
          <JobDetailSection title="상세요강" items={[{ value: content }]} />

          <JobDetailSection
            title="채용담당자 연락처"
            items={[
              { label: "회사 ID", value: company_id },
              {
                label: "로고",
                value: (
                  <img
                    src={"/default-image.png"}
                    alt="회사 로고"
                    className="rounded object-contain w-24 h-24 bg-gray-200"
                  />
                ),
              },
              { label: "전화", value: "등록된 전화 없음" },
            ]}
          />

          <StickyApplyKakaoShareButton isBottomVisible={isBottomVisible} />
          <div ref={bottomButtonRef}>
            <ApplyButton />
            <KakaoShareButton />
          </div>
          <div className="flex gap-4 justify-end">
            <Link href={`/recruit/${jobPostingId}/edit`}>
              <button className="px-4 py-2 bg-blue-500 text-white rounded">수정하기</button>
            </Link>
            <button
              onClick={async () => {
                const confirmed = confirm("정말 삭제하시겠습니까?");
                if (!confirmed) return;
                try {
                  await jobPostApi.deleteJobPost(jobPostingId);
                  alert("삭제되었습니다.");
                  window.location.href = "/recruit";
                } catch (error) {
                  console.error("삭제 실패:", error);
                  alert("삭제에 실패했습니다.");
                }
              }}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              삭제하기
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
