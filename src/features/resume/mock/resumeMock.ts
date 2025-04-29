import { ResumeFormData } from "../validation/resumeSchema";

export const resumeMockData: ResumeFormData & { id: string } = {
  id: "123",
  title: "나의 이력서",
  name: "최오즈",
  phone: "010-1234-5678",
  email: "ozchoi@naver.com",
  schoolType: "고등학교",
  schoolName: "서울고등학교",
  graduationStatus: "졸업",
  experiences: [
    {
      company: "오즈컴퍼니",
      position: "프론트엔드 개발자",
      startDate: "2020-01-01",
      endDate: "2022-12-31",
      isCurrent: false,
    },
  ],
  certifications: [
    {
      name: "정보처리기사",
      issuer: "한국산업인력공단",
      date: "2019-06-01",
    },
  ],
  introduction: "안녕하세요. 책임감 있게 일하는 개발자 최오즈입니다.",
};
