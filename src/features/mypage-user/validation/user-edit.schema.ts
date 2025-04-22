import { z } from "zod"
import { USER_VALIDATION } from "@/features/auth-user/validation/user-auth.schema"

export const userEditSchema = z.object({
  phone: z
    .string()
    .min(1, "전화번호 인증은 필수입니다.")
    .regex(USER_VALIDATION.phone.pattern, USER_VALIDATION.phone.message),

  verifyCode: z
    .string()
    .min(1, "인증번호는 필수입니다.")
    .length(6, USER_VALIDATION.verificationCode.message)
    .regex(/^[0-9]+$/, "숫자만 입력해주세요."),

  preferredLocation: z
    .string()
    .min(1, USER_VALIDATION.preferredLocation.required)
    .refine((val) => /^[가-힣a-zA-Z\s,]+$/.test(val), {
      message: USER_VALIDATION.preferredLocation.onlyCommaAndText,
    })
    .refine((val) => val.split(",").every((region) => region.trim().length > 0), {
      message: USER_VALIDATION.preferredLocation.commaRequired,
    }),

  interests: z.array(z.string()).optional(),

  purposes: z
    .array(z.string())
    .min(1, USER_VALIDATION.purposes.required),

  channels: z
    .array(z.string())
    .min(1, USER_VALIDATION.channels.required),
})

export type UserEditFormValues = z.infer<typeof userEditSchema>

// 회원정보수정 - 비밀번호 수정
export const userPasswordEditSchema = z.object({
  currentPassword: z.string().min(1, "현재 비밀번호를 입력해주세요."),
  newPassword: z
    .string()
    .min(USER_VALIDATION.password.min, USER_VALIDATION.password.messages.min)
    .max(USER_VALIDATION.password.max, USER_VALIDATION.password.messages.max)
    .regex(USER_VALIDATION.password.pattern, USER_VALIDATION.password.messages.format),
})

export type UserPasswordEditFormValues = z.infer<typeof userPasswordEditSchema>
