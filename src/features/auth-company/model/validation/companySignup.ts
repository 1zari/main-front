import { z } from "zod";

export const companySchema = z.object({
  companyName: z
    .string()
    .min(2, "기업명은 필수입니다. 최소 2자 이상 입력해주세요.")
    .max(50, "기업명은 50자 이하여야 합니다."),
  startDate: z
    .string()
    .nonempty("개업년월일은 필수입니다.")
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
      message: "입력란을 클릭하여 달력에서 개업년월일을 선택해 주세요.",
    }),
  representativeName: z
    .string()
    .regex(/^[가-힣]{2,15}$/, "한글만 입력해주세요. 2자 이상 15자 이하로 입력 가능합니다."),
  businessNumber: z
    .string()
    .min(10, "사업자등록번호 인증은 필수입니다. 인증을 먼저 진행해주세요.")
    .regex(/^\d+$/, "-없이 숫자만 입력해주세요."),
  companyIntro: z
    .string()
    .min(10, "기업 소개는 필수입니다. 최소 10자 이상 입력해주세요.")
    .max(500, "기업 소개는 500자 이하여야 합니다."),
  companyAddress: z
    .string()
    .min(1, "사업장 주소 입력은 필수입니다.")
    .max(100, "주소는 100자 이하여야 합니다."),
  managerName: z
    .string()
    .regex(/^[가-힣]{2,15}$/, "한글만 입력해주세요. 2자 이상 15자 이하로 입력 가능합니다."),
  managerPhone: z
    .string()
    .min(11, "전화번호는 필수입니다.")
    .regex(/^010-\d{4}-\d{4}$/, "형식에 맞게 입력해주세요. 예 : 010-1234-5678"),
  managerEmail: z
    .string()
    .email("올바른 이메일을 입력해주세요. 예 : user@naver.com"),
  companyLogo: z
    .any()
    .optional()
    .refine(
      (file) => !file || file.length === 0 || ["image/png", "image/jpeg", "image/svg+xml"].includes(file[0]?.type),
      "PNG, JPG, SVG 형식의 이미지 파일만 업로드 가능합니다."
    )
    .refine(
      (file) => !file || file.length === 0 || file[0]?.size <= 1 * 1024 * 1024,
      "파일 크기는 1MB 이하여야 합니다."
    ),
  businessFile: z
    .any()
    .refine((file) => !!file && file.length > 0, "사업자등록증 파일은 필수입니다.")
    .refine(
      (file) => file && file[0] && ["image/png", "image/jpeg", "image/svg+xml"].includes(file[0].type),
      "PNG, JPG, SVG 형식의 이미지 파일만 업로드 가능합니다."
    )
    .refine(
      (file) => file && file[0] && file[0].size <= 1 * 1024 * 1024,
      "파일 크기는 1MB 이하여야 합니다."
    ),
});
export type CompanyFormValues = z.infer<typeof companySchema>;
