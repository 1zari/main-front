"use client";

import ApplyButton from "@/features/jobs/components/job-detail-bottom-btns/ApplyButton";
import KakaoShareButton from "@/features/jobs/components/job-detail-bottom-btns/KakaoShareButton";
import StikyApplyKakaoShareButton from "@/features/jobs/components/job-detail-bottom-btns/StikyApplyKakaoShareButton";
import JobDetailSection from "@/features/jobs/components/JobDetailSection";
import { JOB_DETAIL_TEXT } from "@/features/jobs/model/constants/jobDetailText";
import { useEffect, useRef, useState } from "react";

export default function JobDetailContent() {
  const {
    company_image_url,
    company,
    title,
    salary,
    contact,
    summary,
    deadline,
    experience,
    education,
    headcount,
    address,
    description,
    contract,
    work_times,
    work_days,
  } = JOB_DETAIL_TEXT;

  const bottomButtonRef = useRef<HTMLDivElement>(null);
  const [isBottomVisible, setIsBottomVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY!);
    }
  }, []);

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

  return (
    <>
      <div className="min-h-screen flex flex-col items-center py-10">
        <div className="w-full max-w-7xl mx-auto px-6">
          <section className="bg-white  space-y-8">
            {/* 회사정보 */}
            <div className="flex flex-col gap-2">
              <img src={company_image_url} className="rounded w-12 h-12 object-contain" />
              <p>{company}</p>
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
            </div>
            <JobDetailSection
              title="고용조건"
              items={[
                { label: "급여", value: salary },
                { label: "고용형태", value: contract },
                { label: "근무요약", value: summary },
                { label: "근무요일", value: work_days },
                { label: "근무시간", value: work_times },
              ]}
            />
            <JobDetailSection
              title="모집조건"
              items={[
                { label: "마감일", value: deadline },
                { label: "경력사항", value: experience },
                { label: "최종학력", value: education },
                { label: "모집인원", value: headcount },
              ]}
            />
            <JobDetailSection title="근무지" items={[{ value: address }]} />
            <JobDetailSection title="상세요강" items={[{ value: description }]} />
            <div>
              {" "}
              <JobDetailSection
                title="채용담당자 연락처"
                items={[
                  { label: "회사명", value: company },
                  {
                    label: "로고",
                    value: (
                      <img
                        src={company_image_url}
                        alt="회사 로고"
                        className="rounded object-contain w-24 h-24"
                      />
                    ),
                  },
                  { label: "담당자", value: contact.name },
                  { label: "전화", value: contact.phone },
                ]}
              />
            </div>

            <StikyApplyKakaoShareButton isBottomVisible={isBottomVisible} />
            <div ref={bottomButtonRef}>
              <ApplyButton />
              <KakaoShareButton />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
