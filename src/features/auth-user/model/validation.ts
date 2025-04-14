import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일은 필수입니다.")
    .email("올바른 이메일을 입력해주세요. 예 : user@naver.com"),
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(16, "비밀번호는 16자 이하여야 합니다.")
    .regex(
      /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/,
      "비밀번호는 8자 이상 16자 이하이며, 영어 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
    ),
});
export type LoginFormValues = z.infer<typeof loginSchema>;


export const userSchema = z.object({
  name: z
    .string()
    .min(1, "이름은 필수입니다.")
    .max(15, "최대 15자까지 입력 가능합니다."),
  phone: z
    .string()
    .min(1, "전화번호 인증은 필수입니다.")
    .regex(/^010-\d{4}-\d{4}$/, "형식에 맞게 입력 후 인증해주세요. 예 : 010-1234-5678"),
  verifyCode: z
    .string()
    .min(1, "인증번호는 필수입니다.")
    .length(6, "인증번호 6자리를 입력해주세요.")
    .regex(/^\d+$/, "숫자만 입력해주세요."),
  birth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD 형식으로 입력해주세요."),
  gender: z
    .enum(['male', 'female'], { required_error: "성별을 선택해주세요." }),
  interests: z
    .array(z.string())
    .optional(),
  purposes: z
    .array(z.string())
    .min(1, "가입 목적을 1개 이상 선택해주세요."),
  channels: z
    .array(z.string())
    .min(1, "유입 경로를 1개 이상 선택해주세요."),
});
export type UserFormValues = z.infer<typeof userSchema>;