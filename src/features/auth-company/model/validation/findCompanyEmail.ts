import { z } from "zod";

export const findCompanyEmailSchema = z.object({
  companyName: z
    .string()
    .min(2, "기업명은 2자 이상이어야 합니다.")
    .max(30, "기업명은 30자 이하여야 합니다.")
    .regex(
      /^[가-힣a-zA-Z0-9&()\-\s]+$/,
      "기업명은 한글, 영문, 숫자, 공백, (), -, &만 사용할 수 있습니다.",
    )
    .refine((val) => !/\s{2,}/.test(val), {
      message: "기업명에 연속된 공백은 사용할 수 없습니다.",
    }),
  businessNumber: z.string().regex(/^\d{10}$/, "사업자등록번호는 숫자 10자리여야 합니다."),
  phone: z.string().regex(/^010-\d{4}-\d{4}$/, "전화번호 형식이 올바르지 않습니다."),
  code: z.string().regex(/^\d{6}$/, "인증번호는 숫자 6자리여야 합니다."),
});

export type FindCompanyEmailFormValues = z.infer<typeof findCompanyEmailSchema>;
