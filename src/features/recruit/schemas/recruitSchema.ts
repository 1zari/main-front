// schemas/recruitSchema.ts
import { z } from "zod";

export const recruitFormSchema = z.object({
  title: z.string().min(1, "공고 제목을 입력해주세요."),
  workPlace: z.string().min(1, "근무지를 입력해주세요."),
  payType: z.string().min(1, "급여 형태를 선택해주세요."),
  payAmount: z.string().min(1, "급여를 입력해주세요."),
  employeeType: z.string().min(1, "고용형태를 입력해주세요."),
  careerType: z.string().min(1, "경력을 선택해주세요."),
  educationType: z.string().min(1, "학력을 선택해주세요."),
  workDays: z.array(z.string()).min(1, "근무요일을 선택해주세요."),
  workStartTime: z.string().optional(),
  workEndTime: z.string().optional(),
  workTimeNegotiable: z.boolean().optional(),
  volume: z.string().min(1, "모집인원을 입력해주세요."),
  deadline: z.date({ required_error: "마감일을 선택해주세요." }),
  summary: z.string().min(1, "요약내용을 입력해주세요."),
  textArea: z.string().min(1, "상세 내용을 입력해주세요."),
  selectJobs: z.array(z.string()).min(1, "직종을 선택해주세요."),
  agreement: z.literal(true).refine((val) => val === true, {
    message: "이용약관에 동의해야 합니다.",
  }),
});

export type RecruitFormSchema = z.infer<typeof recruitFormSchema>;
