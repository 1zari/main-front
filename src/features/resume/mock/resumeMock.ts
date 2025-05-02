import { ResumeFormData } from "../validation/resumeSchema";

export const resumeMockList: (ResumeFormData & { id: string; userId: string })[] = [
  {
    id: "resume-001",
    userId: "123",
    title: "나의 이력서",
    name: "김오즈",
    phone: "010-1234-5678",
    email: "kimoz@kakao.com",
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
    introduction: "안녕하세요. 책임감 있게 일하는 개발자 김오즈입니다.",
  },
  {
    id: "resume-002",
    userId: "123",
    title: "서비스 경력직, 김오즈입니다!",
    name: "김오즈",
    phone: "010-5678-1234",
    email: "oz.service@naver.com",
    schoolType: "대학교(4년)",
    schoolName: "한국대학교",
    graduationStatus: "졸업",
    experiences: [
      {
        company: "더서비스",
        position: "매장 관리자",
        startDate: "2018-03-01",
        endDate: "2021-05-31",
        isCurrent: false,
      },
    ],
    certifications: [
      {
        name: "CS관리사",
        issuer: "한국서비스협회",
        date: "2019-10-10",
      },
    ],
    introduction: "서비스 마인드로 고객을 응대해온 경험을 바탕으로 더 성장하고 싶습니다.",
  },
  {
    id: "resume-003",
    userId: "123",
    title: "사무직 경력자 김오즈입니다!",
    name: "김오즈",
    phone: "010-2222-3333",
    email: "oz.office@naver.com",
    schoolType: "대학교(2,3년)",
    schoolName: "서울비즈니스대학",
    graduationStatus: "졸업",
    experiences: [
      {
        company: "오피스코리아",
        position: "총무팀 사무보조",
        startDate: "2016-06-01",
        endDate: "2020-12-31",
        isCurrent: false,
      },
    ],
    certifications: [
      {
        name: "컴퓨터활용능력 1급",
        issuer: "대한상공회의소",
        date: "2018-03-15",
      },
    ],
    introduction: "정확하고 빠른 문서 처리 능력을 기반으로 조직 운영을 지원해왔습니다.",
  },
];
