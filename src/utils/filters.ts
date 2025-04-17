/** 필터 항목 문자열 생성 (예: 고용형태:정규직) */
export const formatFilterValue = (groupKey: string, option: string) => {
    return `${groupKey}:${option}`;
};

/** 근무요일 필터 문자열 생성 (예: 근무요일: 월,화,수) */
export const formatWorkDays = (days: string[]) => {
    const dayOrder = ["월", "화", "수", "목", "금", "토", "일"];
    const sorted = dayOrder.filter((d) => days.includes(d));
    return `근무요일: ${sorted.join(",")}`;
};