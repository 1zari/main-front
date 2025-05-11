import { z } from "zod";

export const jobPostSchema = z.object({
  title: z.string().min(1, "공고 제목을 입력해주세요.").max(50, "50자 이내로 작성해주세요."),
  occupation: z.array(z.string()).min(1, "직종을 1개 이상 선택해주세요."),
  employmentType: z
    .union([z.enum(["정규직", "계약직"]), z.null()])
    .refine((val) => val !== null, { message: "고용형태를 선택해주세요." }),
  numberOfRecruits: z
    .number({ invalid_type_error: "모집인원을 숫자로 입력해주세요." })
    .positive("1명 이상 입력해주세요."),
  career: z
    .union([z.enum(["경력", "경력무관"]), z.null()])
    .refine((val) => val !== null, { message: "경력여부를 선택해주세요." }),
  education: z
    .union([z.enum(["고졸", "대졸", "학력무관"]), z.null()])
    .refine((val) => val !== null, { message: "학력을 선택해주세요." }),
  location: z.string().min(1, "주소를 입력해주세요."),
  locationDetail: z.string().min(1, "상세주소를 입력해주세요."),
  deadline: z.string(),
  salaryType: z.string(),
  salary: z.number({ invalid_type_error: "급여를 숫자로 입력해주세요." }),
  workingDays: z.array(z.enum(["월", "화", "수", "목", "금", "토", "일", "요일협의"])),
  // workingHours: z
  //   .object({
  //     start: z.string().optional(),
  //     end: z.string().optional(),
  //     negotiable: z.boolean().optional(), // 추가
  //   })
  //   .refine(
  //     ({ start, end, negotiable }) => {
  //       return (start && end) || negotiable;
  //     },
  //     {
  //       message: "근무 시간을 입력하거나 시간협의를 선택해주세요.",
  //       path: ["start"],
  //     },
  //   ),
  // workingHourStart: z.string().min(1, "시작 시간을 입력해주세요.").optional(),
  // workingHourEnd: z.string().min(1, "종료 시간을 입력해주세요.").optional(),
  // workingHourNegotiable: z.boolean().optional(),
  posting_type: z.boolean(),
  jobSummary: z.string().max(50),
  jobDescription: z.string(),
  agreeTerms: z.boolean().refine((v) => v === true, { message: "이용약관에 동의해야 합니다." }),
});

export type JobPostFormValues = z.infer<typeof jobPostSchema>;
