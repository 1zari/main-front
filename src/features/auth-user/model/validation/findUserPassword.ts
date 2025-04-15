import { z } from "zod";

export const findPasswordSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  code: z.string().regex(/^\d{6}$/, "인증번호는 숫자 6자리여야 합니다."),
  phone: z.string().regex(/^010-\d{4}-\d{4}$/, "전화번호 형식이 올바르지 않습니다."),
  newPassword: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(16, "비밀번호는 16자 이하여야 합니다.")
    .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,16}$/, {
      message: "영어 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
    }),
});

export type FindPasswordFormValues = z.infer<typeof findPasswordSchema>;
