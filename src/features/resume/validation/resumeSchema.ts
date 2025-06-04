import { z } from "zod";
import {
  RESUME_VALIDATION_LIMITS,
  DATE_VALIDATION,
  RESUME_VALIDATION_MESSAGES,
} from "@/features/resume/constants/validation";

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && !!dateString.match(DATE_VALIDATION.FORMAT_REGEX);
};

const experienceSchema = z
  .object({
    company: z
      .string()
      .min(RESUME_VALIDATION_LIMITS.MIN_LENGTH, RESUME_VALIDATION_MESSAGES.COMPANY_NAME.REQUIRED)
      .max(
        RESUME_VALIDATION_LIMITS.COMPANY_NAME_MAX,
        RESUME_VALIDATION_MESSAGES.COMPANY_NAME.MAX_LENGTH,
      ),
    position: z
      .string()
      .min(RESUME_VALIDATION_LIMITS.MIN_LENGTH, RESUME_VALIDATION_MESSAGES.POSITION.REQUIRED)
      .max(RESUME_VALIDATION_LIMITS.POSITION_MAX, RESUME_VALIDATION_MESSAGES.POSITION.MAX_LENGTH),
    startDate: z
      .string()
      .min(RESUME_VALIDATION_LIMITS.MIN_LENGTH, RESUME_VALIDATION_MESSAGES.DATE.REQUIRED_START)
      .refine(isValidDate, RESUME_VALIDATION_MESSAGES.DATE.INVALID_FORMAT),
    endDate: z
      .string()
      .optional()
      .refine((date) => !date || isValidDate(date), RESUME_VALIDATION_MESSAGES.DATE.INVALID_FORMAT),
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
      today.setHours(...DATE_VALIDATION.TIME_RESET.START_OF_DAY);

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
      message: RESUME_VALIDATION_MESSAGES.DATE.INVALID_RANGE,
      path: ["endDate"],
    },
  );

const certificationSchema = z.object({
  name: z
    .string()
    .min(
      RESUME_VALIDATION_LIMITS.MIN_LENGTH,
      RESUME_VALIDATION_MESSAGES.CERTIFICATION.NAME_REQUIRED,
    )
    .max(
      RESUME_VALIDATION_LIMITS.CERTIFICATION_NAME_MAX,
      RESUME_VALIDATION_MESSAGES.CERTIFICATION.NAME_MAX_LENGTH,
    ),
  issuer: z
    .string()
    .min(
      RESUME_VALIDATION_LIMITS.MIN_LENGTH,
      RESUME_VALIDATION_MESSAGES.CERTIFICATION.ISSUER_REQUIRED,
    )
    .max(
      RESUME_VALIDATION_LIMITS.CERTIFICATION_ISSUER_MAX,
      RESUME_VALIDATION_MESSAGES.CERTIFICATION.ISSUER_MAX_LENGTH,
    ),
  date: z
    .string()
    .min(RESUME_VALIDATION_LIMITS.MIN_LENGTH, RESUME_VALIDATION_MESSAGES.DATE.REQUIRED_CERT)
    .refine(isValidDate, RESUME_VALIDATION_MESSAGES.DATE.INVALID_FORMAT)
    .refine((date) => {
      const certDate = new Date(date);
      const today = new Date();
      today.setHours(...DATE_VALIDATION.TIME_RESET.END_OF_DAY);
      return certDate <= today;
    }, RESUME_VALIDATION_MESSAGES.DATE.FUTURE_NOT_ALLOWED),
});

export const resumeSchema = z.object({
  jobCategory: z
    .string()
    .min(RESUME_VALIDATION_LIMITS.MIN_LENGTH, RESUME_VALIDATION_MESSAGES.JOB_CATEGORY.REQUIRED)
    .max(
      RESUME_VALIDATION_LIMITS.JOB_CATEGORY_MAX,
      RESUME_VALIDATION_MESSAGES.JOB_CATEGORY.MAX_LENGTH,
    ),
  title: z
    .string()
    .min(RESUME_VALIDATION_LIMITS.MIN_LENGTH, RESUME_VALIDATION_MESSAGES.TITLE.REQUIRED)
    .max(RESUME_VALIDATION_LIMITS.TITLE_MAX, RESUME_VALIDATION_MESSAGES.TITLE.MAX_LENGTH),
  schoolType: z
    .string()
    .min(RESUME_VALIDATION_LIMITS.MIN_LENGTH, RESUME_VALIDATION_MESSAGES.SCHOOL.TYPE_REQUIRED)
    .refine(
      (type) => ["고등학교", "대학교(2,3년)", "대학교(4년)", "대학원"].includes(type),
      RESUME_VALIDATION_MESSAGES.SCHOOL.TYPE_INVALID,
    ),
  schoolName: z
    .string()
    .min(RESUME_VALIDATION_LIMITS.MIN_LENGTH, RESUME_VALIDATION_MESSAGES.SCHOOL.NAME_REQUIRED)
    .max(
      RESUME_VALIDATION_LIMITS.SCHOOL_NAME_MAX,
      RESUME_VALIDATION_MESSAGES.SCHOOL.NAME_MAX_LENGTH,
    ),
  graduationStatus: z
    .string()
    .min(RESUME_VALIDATION_LIMITS.MIN_LENGTH, RESUME_VALIDATION_MESSAGES.SCHOOL.STATUS_REQUIRED)
    .refine(
      (status) => ["졸업", "재학", "중퇴", "휴학"].includes(status),
      RESUME_VALIDATION_MESSAGES.SCHOOL.STATUS_INVALID,
    ),
  experiences: z.array(experienceSchema).optional(),
  certifications: z.array(certificationSchema).optional(),
  introduction: z
    .string()
    .max(
      RESUME_VALIDATION_LIMITS.INTRODUCTION_MAX,
      RESUME_VALIDATION_MESSAGES.INTRODUCTION.MAX_LENGTH,
    )
    .optional(),
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
