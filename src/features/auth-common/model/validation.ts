import { z } from 'zod';

export const signupSchema = z.object({
  email: z
    .string()
    .min(1, '이메일은 필수입니다.')
    .email('올바른 이메일을 입력해주세요. 예 : user@naver.com'),
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 16자 이하여야 합니다.')
    .regex(
      /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/,
      '영어 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.'
    ),
});

export type SignupFormValues = z.infer<typeof signupSchema>;
