"use client";

import JobDetailSection from "@/features/jobs/components/JobDetailSection";
import { JOB_DETAIL_TEXT } from "@/features/jobs/model/constants/jobDetailText";
import { handleKakaoShare } from "@/utils/kakaoShare";
import { useEffect } from "react";

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
  } = JOB_DETAIL_TEXT;

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
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

            {/* 고용조건 */}
            <JobDetailSection
              title="고용조건"
              items={[
                { label: "급여", value: salary },
                { label: "고용형태", value: contract },
                { label: "근무요약", value: summary },
              ]}
            />

            {/* 모집조건 */}
            <JobDetailSection
              title="모집조건"
              items={[
                { label: "마감일", value: deadline },
                { label: "경력사항", value: experience },
                { label: "최종학력", value: education },
                { label: "모집인원", value: headcount },
              ]}
            />

            {/* 근무지 */}
            <JobDetailSection title="근무지" items={[{ value: address }]} />

            {/* 상세요강 */}
            <JobDetailSection title="상세요강" items={[{ value: description }]} />

            {/* 채용담당자 연락처 */}
            <JobDetailSection
              title="채용담당자 연락처"
              items={[
                { label: "담당자", value: contact.name },
                { label: "전화", value: contact.phone },
              ]}
            />

            {/* 지원하기 버튼 */}

            <div className="text-center py-6 sticky bottom-0 bg-white z-10">
              <div className="flex gap-2">
                <button className="grow-1 bg-primary hover:bg-green-700 text-white font-bold py-4 px-6 rounded-sm">
                  지원하기
                </button>
                <button className=" bg-[#FEE500] font-bold py-4 px-6 rounded-sm">
                  <img
                    src="/images/kakao-logo.png"
                    alt="카카오 로고"
                    className="inline-block w-5 h-5 mr-2 align-middle"
                  />
                  카톡 공유
                </button>
              </div>
            </div>

            <div className="text-center py-6 bg-white z-10">
              <button className="w-full  bg-primary hover:bg-green-700 text-white font-bold py-4 px-6 rounded-sm">
                지원하기
              </button>
            </div>
            <div className="text-center bg-white z-10">
              <button
                onClick={handleKakaoShare}
                className="w-full bg-[#FEE500] font-bold py-4 px-6 rounded-sm"
              >
                <img
                  src="/images/kakao-logo.png"
                  alt="카카오 로고"
                  className="inline-block w-5 h-5 mr-2 align-middle"
                />
                카카오로 공유하기
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
