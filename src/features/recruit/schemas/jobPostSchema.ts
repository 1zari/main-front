import { z } from "zod";

export const jobPostSchema = z.object({
  title: z.string().min(1, "공고 제목을 입력해주세요.").max(50),
  occupation: z.string().min(1, "직종을 입력해주세요."),
  employmentType: z.enum(["정규직", "계약직"]),
  numberOfRecruits: z.number().positive("1명 이상 입력해주세요."),
  career: z.enum(["경력", "경력무관"]),
  education: z.enum(["고졸", "대졸", "학력무관"]),
  location: z.string().min(1, "근무지를 입력해주세요."),
  deadline: z.string(),
  salary: z.number(),
  workingDays: z.array(z.enum(["월", "화", "수", "목", "금", "토", "일"])),
  workingHours: z.object({
    start: z.string(),
    end: z.string(),
  }),
  jobSummary: z.string().max(50),
  jobDescription: z.string(),
  agreeTerms: z.boolean().refine((v) => v === true, { message: "이용약관에 동의해야 합니다." }),
});

export type JobPostFormValues = z.infer<typeof jobPostSchema>;
