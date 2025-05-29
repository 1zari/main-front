import { z } from "zod";

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && !!dateString.match(/^\d{4}-\d{2}-\d{2}$/);
};

const experienceSchema = z
  .object({
    company: z
      .string()
      .min(1, "회사명을 입력해주세요.")
      .max(50, "회사명은 50자 이하로 입력해주세요."),
    position: z.string().min(1, "직무를 입력해주세요.").max(50, "직무는 50자 이하로 입력해주세요."),
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
      if (!data.isCurrent && (!data.endDate || data.endDate.trim() === "")) {
        return false;
      }

      if (data.endDate && data.startDate) {
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        if (startDate >= endDate) {
          return false;
        }
      }

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

export const resumeSchema = z.object({
  jobCategory: z
    .string()
    .min(1, "직종을 입력해주세요. ex) IT, 디자인, 마케팅")
    .max(20, "직종은 20자 이하로 입력해주세요."),
  title: z
    .string()
    .min(1, "이력서 제목을 입력해주세요.")
    .max(20, "이력서 제목은 20자 이하로 입력해주세요."),
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
    .max(50, "학교명은 50자 이하로 입력해주세요."),
  graduationStatus: z
    .string()
    .min(1, "졸업 상태를 선택해주세요.")
    .refine(
      (status) => ["졸업", "재학", "중퇴", "휴학"].includes(status),
      "올바른 졸업 상태를 선택해주세요.",
    ),
  experiences: z.array(experienceSchema).optional(),
  certifications: z.array(certificationSchema).optional(),
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
