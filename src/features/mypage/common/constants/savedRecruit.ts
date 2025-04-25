export const SAVED_RECRUIT_TEXT = {
  TITLE: "저장한 공고 목록",
  EMPTY: {
    TITLE: "저장한 공고가 없습니다",
    MESSAGE: "관심있는 공고를 저장하고 모아보세요!",
    BUTTON: "채용공고 보러가기",
  },
  EDIT: {
    BUTTON: "편집",
    CANCEL: "편집 취소",
    DELETE: "선택 삭제",
    DELETE_COUNT: (count: number) => `(${count}개)`,
  },
  COLUMN: {
    DESKTOP: {
      SCRAP: "스크랩",
      INFO: "회사명/공고제목",
      LOCATION: "근무지",
      SALARY: "급여",
      TYPE: "급여형태",
      DEADLINE: "마감일",
    },
    TABLET: {
      SCRAP: "★",
      INFO: "공고",
      LOCATION: "근무지",
      SALARY: "급여",
      TYPE: "형태",
      DEADLINE: "마감일",
    },
  },
} as const;
