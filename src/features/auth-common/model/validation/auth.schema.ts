import { z } from "zod";

// 로그인 스키마
export const loginSchema = z.object({
  email: z.string().email("유효하지 않은 이메일 형식입니다."),
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(16, "비밀번호는 16자 이하여야 합니다.")
    .regex(
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/,
      "비밀번호는 영어 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
    ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
