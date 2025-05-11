import { z } from "zod";

export const resumeSchema = z.object({
  jobCategory: z.string().min(1, "직종을 입력해주세요. ex) IT, 디자인, 마케팅"),
  title: z.string().min(1, "이력서 제목을 입력해주세요."),
  name: z.string().min(1, "이름을 입력해주세요."),
  phone: z.string().regex(/^010-\d{4}-\d{4}$/, "010-1234-5678 형식으로 입력해주세요."),
  email: z.string().min(1, "이메일을 입력해주세요."),
  schoolType: z.string().min(1, "학교 구분을 선택해주세요."),
  schoolName: z.string().min(1, "학교명을 입력해주세요."),
  graduationStatus: z.string().min(1, "졸업 상태를 선택해주세요."),
  experiences: z
    .array(
      z.object({
        company: z.string().min(1, "회사명을 입력해주세요."),
        position: z.string().min(1, "직무를 입력해주세요."),
        startDate: z.string().min(1, "근무 시작일을 입력해주세요."),
        endDate: z.string().optional(),
        isCurrent: z.boolean(),
      }),
    )
    .optional(),
  certifications: z
    .array(
      z.object({
        name: z.string().min(1, "자격증명을 입력해주세요."),
        issuer: z.string().min(1, "발급기관을 입력해주세요."),
        date: z.string().min(1, "취득일자를 입력해주세요."),
      }),
    )
    .optional(),
  introduction: z.string().max(500, "자기소개는 최대 500자까지 작성할 수 있습니다."),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;
