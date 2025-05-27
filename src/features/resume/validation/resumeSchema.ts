import { z } from "zod";

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && !!dateString.match(/^\d{4}-\d{2}-\d{2}$/);
};

// 전화번호 정규식 (더 유연하게)
const phoneRegex = /^010-\d{4}-\d{4}$/;

// 이메일 정규식 (더 빡세게)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 경력 스키마 (조건부 검증 포함)
const experienceSchema = z
  .object({
    company: z
      .string()
      .min(1, "회사명을 입력해주세요.")
      .max(100, "회사명은 100자 이하로 입력해주세요."),
    position: z
      .string()
      .min(1, "직무를 입력해주세요.")
      .max(100, "직무는 100자 이하로 입력해주세요."),
    startDate: z
      .string()
      .min(1, "근무 시작일을 입력해주세요.")
      .refine(isValidDate, "올바른 날짜 형식(YYYY-MM-DD)으로 입력해주세요."),
    endDate: z
      .string()
      .optional()
      .refine(
        (date) => !date || isValidDate(date),
        "올바른 날짜 형식(YYYY-MM-DD)으로 입력해주세요.",
      ),
    isCurrent: z.boolean(),
  })
  .refine(
    (data) => {
      // 현재 근무 중이 아닌 경우 종료일 필수
      if (!data.isCurrent && (!data.endDate || data.endDate.trim() === "")) {
        return false;
      }

      // 시작일과 종료일 비교 (종료일이 있는 경우)
      if (data.endDate && data.startDate) {
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        if (startDate >= endDate) {
          return false;
        }
      }

      // 미래 날짜 검증
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (data.startDate) {
        const startDate = new Date(data.startDate);
        if (startDate > today) {
          return false;
        }
      }

      if (data.endDate && !data.isCurrent) {
        const endDate = new Date(data.endDate);
        if (endDate > today) {
          return false;
        }
      }

      return true;
    },
    {
      message:
        "날짜를 올바르게 입력해주세요. (현재 근무 중이 아닌 경우 종료일 필수, 시작일 < 종료일, 미래 날짜 불가)",
      path: ["endDate"],
    },
  );

// 자격증 스키마
const certificationSchema = z.object({
  name: z
    .string()
    .min(1, "자격증명을 입력해주세요.")
    .max(100, "자격증명은 100자 이하로 입력해주세요."),
  issuer: z
    .string()
    .min(1, "발급기관을 입력해주세요.")
    .max(100, "발급기관은 100자 이하로 입력해주세요."),
  date: z
    .string()
    .min(1, "취득일자를 입력해주세요.")
    .refine(isValidDate, "올바른 날짜 형식(YYYY-MM-DD)으로 입력해주세요.")
    .refine((date) => {
      const certDate = new Date(date);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // 오늘까지는 허용
      return certDate <= today;
    }, "미래 날짜는 입력할 수 없습니다."),
});

// 메인 이력서 스키마
export const resumeSchema = z.object({
  jobCategory: z
    .string()
    .min(1, "직종을 입력해주세요. ex) IT, 디자인, 마케팅")
    .max(50, "직종은 50자 이하로 입력해주세요."),
  title: z
    .string()
    .min(1, "이력서 제목을 입력해주세요.")
    .max(100, "이력서 제목은 100자 이하로 입력해주세요."),
  name: z
    .string()
    .min(1, "이름을 입력해주세요.")
    .max(50, "이름은 50자 이하로 입력해주세요.")
    .refine((name) => name.trim().length >= 2, "이름은 최소 2자 이상 입력해주세요."),
  phone: z.string().regex(phoneRegex, "010-1234-5678 형식으로 입력해주세요."),
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .regex(emailRegex, "올바른 이메일 형식으로 입력해주세요.")
    .max(100, "이메일은 100자 이하로 입력해주세요."),
  schoolType: z
    .string()
    .min(1, "학교 구분을 선택해주세요.")
    .refine(
      (type) => ["고등학교", "대학교(2,3년)", "대학교(4년)", "대학원"].includes(type),
      "올바른 학교 구분을 선택해주세요.",
    ),
  schoolName: z
    .string()
    .min(1, "학교명을 입력해주세요.")
    .max(100, "학교명은 100자 이하로 입력해주세요."),
  graduationStatus: z
    .string()
    .min(1, "졸업 상태를 선택해주세요.")
    .refine(
      (status) => ["졸업", "재학", "중퇴", "휴학"].includes(status),
      "올바른 졸업 상태를 선택해주세요.",
    ),
  experiences: z
    .array(experienceSchema)
    .optional()
    .refine((experiences) => {
      if (!experiences || experiences.length === 0) return true;

      // 중복 검증
      for (let i = 0; i < experiences.length; i++) {
        for (let j = i + 1; j < experiences.length; j++) {
          const exp1 = experiences[i];
          const exp2 = experiences[j];

          if (exp1.company === exp2.company && exp1.position === exp2.position) {
            const start1 = new Date(exp1.startDate);
            const end1 = exp1.isCurrent ? new Date() : new Date(exp1.endDate || "");
            const start2 = new Date(exp2.startDate);
            const end2 = exp2.isCurrent ? new Date() : new Date(exp2.endDate || "");

            // 기간 겹침 확인
            if (start1 <= end2 && start2 <= end1) {
              return false;
            }
          }
        }
      }
      return true;
    }, "같은 회사의 같은 직무에서 겹치는 근무 기간이 있습니다."),
  certifications: z
    .array(certificationSchema)
    .optional()
    .refine((certifications) => {
      if (!certifications || certifications.length === 0) return true;

      // 중복 자격증 검증
      const certSet = new Set();
      for (const cert of certifications) {
        const key = `${cert.name}-${cert.issuer}`;
        if (certSet.has(key)) {
          return false;
        }
        certSet.add(key);
      }
      return true;
    }, "동일한 자격증이 중복으로 입력되었습니다."),
  introduction: z.string().max(500, "자기소개는 최대 500자까지 작성할 수 있습니다.").optional(),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;

export const validateResumeData = (data: unknown): data is ResumeFormData => {
  try {
    resumeSchema.parse(data);
    return true;
  } catch {
    return false;
  }
};

export const getValidationErrors = (data: unknown) => {
  try {
    resumeSchema.parse(data);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors;
    }
    return null;
  }
};
