import { format, parseISO, isValid } from "date-fns";

/**
 * Date 객체 혹은 ISO 문자열을 받아 YYYYMMDD 문자열로 반환
 * @param dateInput - Date 객체 또는 'YYYY-MM-DD' 형식의 문자열
 * @returns 'YYYYMMDD' 형식의 문자열
 */
export function formatDateToYYYYMMDD(dateInput: Date | string): string {
  let dateObj: Date;

  if (typeof dateInput === "string") {
    // ISO 형식 문자열을 Date 객체로 파싱
    dateObj = parseISO(dateInput);
  } else {
    dateObj = dateInput;
  }

  // 유효성 검사
  if (!isValid(dateObj)) {
    throw new Error("유효하지 않은 날짜입니다: " + dateInput);
  }

  // date-fns의 format 함수를 사용해 'yyyyMMdd' 포맷 적용
  return format(dateObj, "yyyyMMdd");
}
