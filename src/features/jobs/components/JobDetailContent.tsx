"use client";

import { JOB_DETAIL_TEXT } from "@/features/jobs/model/constants/jobDetailText";
import { useEffect } from "react";

export default function JobDetailContent() {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }, []);

  const handleKakaoShare = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "채용 공고를 확인해보세요!",
          description: JOB_DETAIL_TEXT.title,
          imageUrl: JOB_DETAIL_TEXT.company_image_url,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "공고 보기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center py-10">
        <div className="w-full max-w-7xl mx-auto px-6">
          <section className="bg-white  space-y-8">
            {/* 회사정보 */}
            <div className="flex flex-col gap-2">
              <img
                src={JOB_DETAIL_TEXT.company_image_url}
                className="rounded w-12 h-12 object-contain"
              />
              <p>{JOB_DETAIL_TEXT.company}</p>
              <h2 className="text-xl font-semibold mb-2">{JOB_DETAIL_TEXT.title}</h2>
            </div>

            {/* 고용조건 */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-primary font-semibold mb-2">고용조건</h2>
              <div className="grid grid-cols-[auto_1fr] gap-y-4 gap-x-10">
                <p>급여</p>
                <p className="font-bold">{JOB_DETAIL_TEXT.salary}</p>
                <p>고용형태</p>
                <p className="font-bold">{JOB_DETAIL_TEXT.contract}</p>
                <p>근무요약</p>
                <p className="font-bold">{JOB_DETAIL_TEXT.summary}</p>
              </div>
            </div>

            <div className="h-2 bg-gray-z "></div>

            {/* 모집조건 */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-primary font-semibold mb-2">모집조건</h2>
              <div className="grid grid-cols-[auto_1fr] gap-y-4 gap-x-10">
                <p>마감일</p>
                <p className="font-bold">{JOB_DETAIL_TEXT.deadline}</p>
                <p>경력사항</p>
                <p className="font-bold">{JOB_DETAIL_TEXT.experience}</p>
                <p>최종학력</p>
                <p className="font-bold">{JOB_DETAIL_TEXT.education}</p>
                <p>모집인원</p>
                <p className="font-bold">{JOB_DETAIL_TEXT.headcount}</p>
              </div>
            </div>

            <div className="h-2 bg-gray-z "></div>

            {/* 근무지 */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-primary font-semibold mb-2">근무지</h2>
              <p>{JOB_DETAIL_TEXT.address}</p>
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500">
                지도 영역
              </div>
            </div>

            <div className="h-2 bg-gray-z "></div>

            {/* 상세요강 */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-primary font-semibold mb-2">상세요강</h2>
              <p className="whitespace-pre-line text-sm text-gray-700">
                {JOB_DETAIL_TEXT.description}
              </p>
            </div>

            <div className="h-2 bg-gray-z "></div>

            {/* 채용담당자 연락처 */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-primary font-semibold mb-2">채용담당자 연락처</h2>
              <div className="grid grid-cols-[auto_1fr] gap-y-4 gap-x-10">
                <p>담당자</p>
                <p className="font-bold">{JOB_DETAIL_TEXT.contact.name}</p>
                <p>전화</p>
                <p className="font-bold">{JOB_DETAIL_TEXT.contact.phone}</p>
              </div>
            </div>

            <div className="h-2 bg-gray-z "></div>

            {/* 지원하기 버튼 */}
            <div className="text-center py-6 sticky bottom-0 bg-white z-10">
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
