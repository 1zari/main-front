import { z } from "zod";

export const findEmailSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다.").max(10, "이름은 10자 이하여야 합니다."),
  phone: z.string().regex(/^010-\d{4}-\d{4}$/, "전화번호 형식이 올바르지 않습니다."),
  code: z.string().regex(/^\d{6}$/, "인증번호는 숫자 6자리여야 합니다."),
});

export type FindEmailFormValues = z.infer<typeof findEmailSchema>;
