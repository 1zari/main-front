import { Heading } from "@/components/ui/Heading";
import { AiOutlineMail } from "react-icons/ai";
import { FaPhone } from "react-icons/fa6";
export default function ResumeContainer() {
  return (
    <>
      <div className="max-w-7xl m-auto ">
        <div className="bg-gray-z py-9 px-6 h-full flex flex-col gap-8 rounded-md">
          <div className="flex flex-col justify-start pb-2 gap-5  items-start">
            <Heading sizeOffset={4} className="font-bold min-w-30">
              김오즈
            </Heading>
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-wrap gap-3 items-center">
                <FaPhone className="m-2 text-gray-400" />
                <div>010-1234-1245</div>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <AiOutlineMail className="m-2 text-gray-400" />
                <div>user1234@naver.com</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start pb-2  items-start">
            <Heading sizeOffset={2} className="font-bold text-primary min-w-30 pb-2 w-full mb-2">
              학력 사항
            </Heading>
            <div className="flex flex-col gap-y-3">
              <div className="flex flex-wrap">
                <span className="min-w-25">학교 구분</span>
                <span className="font-bold">대학교(4년)</span>
              </div>
              <div className="flex flex-wrap">
                <span className="min-w-25">학교명</span>
                <span className="font-bold">연세대학교 </span>
              </div>
              <div className="flex flex-wrap">
                <span className="min-w-25">졸업 상태</span>
                <span className="font-bold">졸업</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start pb-2  items-start">
            <Heading sizeOffset={2} className="font-bold text-primary min-w-30 pb-2 w-full mb-2">
              경력 사항
            </Heading>
            <div className="flex flex-col gap-y-3">
              <div className="flex flex-wrap">
                <span className="min-w-25">회사명</span>
                <span className="font-bold">넥스트러너스</span>
              </div>
              <div className="flex flex-wrap">
                <span className="min-w-25">직무</span>
                <span className="font-bold">웹디자인</span>
              </div>
              <div className="flex flex-wrap">
                <span className="min-w-25">근무 기간</span>
                <span className="font-bold">14.04.09 ~ 24.04.09</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start pb-2  items-start">
            <Heading sizeOffset={2} className="font-bold text-primary min-w-30 pb-2 w-full mb-2">
              자격증
            </Heading>
            <div className="flex flex-col gap-y-3">
              <div className="flex flex-wrap">
                <span className="min-w-25">자격증명</span>
                <span className="font-bold">웹디자인 기능사</span>
              </div>
              <div className="flex flex-wrap">
                <span className="min-w-25">발급 기관</span>
                <span className="font-bold">한국산업인력공단</span>
              </div>
              <div className="flex flex-wrap">
                <span className="min-w-25">취득 일자</span>
                <span className="font-bold">24.04.09</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start pb-2  items-start">
            <Heading sizeOffset={2} className="font-bold text-primary min-w-30 pb-2 w-full mb-2">
              자기 소개
            </Heading>
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
