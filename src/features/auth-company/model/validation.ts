import { z } from "zod";

export const companySchema = z.object({
  companyName: z
    .string()
    .min(1, "기업명은 필수입니다.")
    .max(50, "기업명은 50자 이하여야 합니다."),
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD 형식으로 입력해주세요."),
  businessNumber: z
    .string()
    .min(1, "사업자등록번호는 필수입니다. 중복 확인 후 입력해주세요.")
    .regex(/^\d+$/, "-없이 숫자만 입력해주세요."),
  companyIntro: z
    .string()
    .min(1, "기업 소개는 필수입니다.")
    .max(500, "기업 소개는 500자 이하여야 합니다."),
  managerName: z
    .string()
    .min(1, "담당자 성함은 필수입니다.")
    .max(15, "최대 15자까지 입력 가능합니다."),
  managerPhone: z
    .string()
    .min(1, "전화번호는 필수입니다.")
    .regex(/^010-\d{4}-\d{4}$/, "형식에 맞게 입력해주세요. 예 : 010-1234-5678"),
  managerEmail: z
    .string()
    .min(1, "이메일은 필수입니다.")
    .email("올바른 이메일을 입력해주세요. 예 : user@naver.com"),
  companyLogo: z
    .any()
    .optional()
    .refine(
      (file) => !file || file.length === 0 || ['image/png', 'image/jpeg', 'image/svg+xml'].includes(file[0]?.type),
      "PNG, JPG, SVG 형식의 이미지 파일만 업로드 가능합니다."
    )
    .refine(
      (file) => !file || file.length === 0 || file[0]?.size <= 2 * 1024 * 1024,
      "파일 크기는 2MB 이하여야 합니다."
    ),
});
export type CompanyFormValues = z.infer<typeof companySchema>;
