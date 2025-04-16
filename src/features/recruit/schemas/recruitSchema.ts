import { z } from "zod";

export const recruitFormSchema = z.object({
  title: z.string().min(1),
  workPlace: z.string().min(1),
  payType: z.string().min(1),
  payAmount: z.string().min(1),
  employeeType: z.string().min(1),
  careerType: z.string().min(1),
  educationType: z.string().min(1),
  workDays: z.array(z.string()).min(1),
  workStartTime: z.string().optional(),
  workEndTime: z.string().optional(),
  workTimeNegotiable: z.boolean().optional(),
  workDaysNegotiable: z.boolean().optional(),
  volume: z.string().min(1),
  deadline: z.date(),
  summary: z.string().min(1),
  textArea: z.string().min(1),
  selectJobs: z.array(z.string()).min(1),
  agreement: z.literal(true),
});

export type RecruitFormSchema = z.infer<typeof recruitFormSchema>;
