// schemas/resumeSchema.ts
import { z } from "zod";

export const resumeFormSchema = z.object({
  category: z.string(),
  title: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  emailDomain: z.string(),
  schoolType: z.string(),
  schoolName: z.string(),
  graduateStatus: z.string(),
  summary: z.string(),
  experiences: z
    .array(
      z.object({
        company: z.string(),
        position: z.string(),
        startDate: z.string(),
        endDate: z.string().nullable(),
        isCurrent: z.boolean(),
      }),
    )
    .optional(),
  certifications: z
    .array(
      z.object({
        name: z.string(),
        issuer: z.string(),
        date: z.string(),
      }),
    )
    .optional(),
});

export type ResumeFormSchema = z.infer<typeof resumeFormSchema>;
