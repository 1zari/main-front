/**
 * 날짜 문자열을 'YYYY.MM.DD' 형식으로 변환합니다.
 * @param dateString - ISO 형식의 날짜 문자열 (예: "2024-03-01T09:00:00.000Z")
 * @returns 'YYYY.MM.DD' 형식의 날짜 문자열
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
};

/**
 * 생년월일을 'YYYY년 MM월 DD일' 형식으로 변환합니다.
 * @param dateString - ISO 형식의 날짜 문자열
 * @returns 'YYYY년 MM월 DD일' 형식의 날짜 문자열
 */
export const formatBirthDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, "0")}월 ${String(date.getDate()).padStart(2, "0")}일`;
};

export const formatSalary = (salary: number) => {
  return `${Math.floor(salary / 10000)}만원`;
};
