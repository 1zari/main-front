export const MOCK_USER = {
  name: "홍길동",
  phone: "010-1234-1234",
  code: "123456",
  email: "honggildong@example.com",
};

export const MOCK_COMPANY = {
  companyName: "시니어내일",
  businessNumber: "1234567890",
  phone: "010-1234-5678",
  code: "123456",
  email: "manager@seniorMyJob.com",
};

// 마이페이지 > 정보수정용 임시
export const MOCK_USER1 = {
  id: "1",
  name: "김오즈",
  birth: "1960-03-10",
  email: "kimoz@kakao.com",
  gender: "female",
  phone: "010-1234-5678",
  verifyCode: "654321",
  preferredLocation: "서울, 인천",
  interests: ["기술직"],
  purposes: ["일자리 관련 정보", "교육 및 재취업 준비"],
  channels: ["네이버 검색", "지인추천"],
}

export const MOCK_COMPANY1 = {
  id: "1",
  companyName: "시니어내일",
  companyEmail: "company@senior.com",
  startDate: "2010-05-15",
  representativeName: "이오즈",
  businessNumber: "1234567890",
  companyIntro: "시니어를 위한 일자리를 연결하는 따뜻한 기업입니다.",
  companyAddress: "서울특별시 중구 청계천로 100",
  managerName: "박오즈",
  managerPhone: "010-1234-5678",
  managerEmail: "manager@senior.com",
  businessFileName: "사업자등록증_샘플.pdf",
  companyLogo: undefined,
}

export const MOCK_USER_SESSION = {
  user: {
    role: "user" as const,
    ...MOCK_USER1,
  },
}

export const MOCK_COMPANY_SESSION = {
  user: {
    role: "company" as const,
    ...MOCK_COMPANY1,
  },
}

