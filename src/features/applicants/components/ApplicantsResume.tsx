import { Heading } from "@/components/ui/Heading";

export default function ApplicantsResume() {
  return (
    <>
      <div className="max-w-7xl m-auto mb-10">
        <div className="bg-gray-z-light py-9 px-5 h-full flex flex-col gap-8 rounded-md">
          <div className="flex flex-col justify-start pb-2  items-start">
            <div className="border-b border-gray-300  pb-2  w-full mb-2">
              <Heading sizeOffset={2} className="font-bold min-w-30">
                기본 정보
              </Heading>
            </div>
            <div className="flex flex-col gap-y-3">
              <div className="flex flex-wrap">
                <div className="font-bold min-w-25">이름</div>
                <div>김오즈</div>
              </div>
              <div className="flex flex-wrap">
                <div className="font-bold min-w-25">전화번호</div>
                <div>010-1234-5678</div>
              </div>
              <div className="flex flex-wrap">
                <div className="font-bold min-w-25">이메일</div>
                <div>user1234@naver.com</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start pb-2  items-start">
            <div className="border-b border-gray-300  pb-2  w-full mb-2">
              <Heading sizeOffset={2} className="font-bold min-w-30">
                학력 사항
              </Heading>
            </div>
            <div className="flex flex-col gap-y-3">
              <div className="flex flex-wrap">
                <div className="font-bold min-w-25">학교 구분</div>
                <div>대학교(4년)</div>
              </div>
              <div className="flex flex-wrap">
                <div className="font-bold min-w-25">학교명</div>
                <div>연세대학교 </div>
              </div>
              <div className="flex flex-wrap">
                <div className="font-bold min-w-25">졸업 상태</div>
                <div>졸업</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start pb-2  items-start">
            <div className="border-b border-gray-300  pb-2  w-full mb-2">
              <Heading sizeOffset={2} className="font-bold min-w-30">
                경력 사항
              </Heading>
            </div>
            <div className="flex flex-col gap-y-3">
              <div className="flex flex-wrap">
                <div className="font-bold min-w-25">회사명</div>
                <div>넥스트러너스</div>
              </div>
              <div className="flex flex-wrap">
                <div className="font-bold min-w-25">직무</div>
                <div>웹디자인 </div>
              </div>
              <div className="flex flex-wrap">
                <div className="font-bold min-w-25">근무 기간</div>
                <div>14.04.09 ~ 24.04.09</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start pb-2  items-start">
            <div className="border-b border-gray-300  pb-2  w-full mb-2">
              <Heading sizeOffset={2} className="font-bold min-w-30">
                자격증
              </Heading>
            </div>
            <div className="flex flex-col gap-y-3">
              <div className="flex flex-wrap">
                <div className="font-bold min-w-25">자격증명</div>
                <div>웹디자인 기능사</div>
              </div>
              <div className="flex flex-wrap">
                <div className="font-bold min-w-25">발급 기관</div>
                <div>한국산업인력공단 </div>
              </div>
              <div className="flex flex-wrap">
                <div className="font-bold min-w-25">취득 일자</div>
                <div>24.04.09</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start pb-2  items-start">
            <div className="border-b border-gray-300  pb-2  w-full mb-2">
              <Heading sizeOffset={2} className="font-bold min-w-30">
                자기 소개
              </Heading>
            </div>
            <div className="">
              사용자의 감정을 움직이는 디자인을 만드는 디자이너 김오즈입니다. UI/UX 디자인을
              중심으로, 브랜드의 메시지를 시각적으로 풀어내는 데 집중해왔으며, 문제 해결 중심의
              디자인 사고를 바탕으로 프로젝트에 기여합니다.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
