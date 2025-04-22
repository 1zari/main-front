"use client"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  userEditSchema,
  userPasswordEditSchema,
  UserEditFormValues,
  UserPasswordEditFormValues,
} from "@/features/mypage-user/validation/user-edit.schema"
import FormInput from "@/features/auth-common/components/baseFields/FormInput"
import FormActionInput from "@/features/auth-common/components/baseFields/FormActionInput"
import FormDatePicker from "@/features/auth-common/components/baseFields/FormDatePicker"
import ControlledCheckboxGroup from "@/features/auth-common/components/baseFields/ControlledCheckboxGroup"
import PasswordChangeForm from "./PasswordChangeForm"
import { useState } from "react"

type Props = {
  onSubmit: (data: UserEditFormValues) => void
  defaultValues: UserEditFormValues & {
    name: string
    birth: string
    email: string
    gender?: "male" | "female"
  }
}

export default function UserInformationEdit({ onSubmit, defaultValues }: Props) {
  const [showPasswordChange, setShowPasswordChange] = useState(false)

  const methods = useForm<UserEditFormValues>({
    resolver: zodResolver(userEditSchema),
    defaultValues,
  })

  const passwordForm = useForm<UserPasswordEditFormValues>({
    resolver: zodResolver(userPasswordEditSchema),
    mode: "onBlur",
  })

  const {
    handleSubmit,
    control,
    getValues,
    setError,
    formState: { errors },
  } = methods

  const handlePasswordSubmit = (data: UserPasswordEditFormValues) => {
    console.log("비밀번호 변경 요청", data)
    setShowPasswordChange(false)
  }

  return (
    <div className="flex justify-center items-center flex-1">
      <div className="bg-white rounded-lg shadow-md px-10 py-[100px] w-full max-w-[1000px]">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center space-y-8"
          >
            <h2 className="text-3xl font-semibold">개인회원 정보수정</h2>

            <div className="w-full max-w-[700px] space-y-6">
              <FormInput label="이름" name="name" disabled />
              <FormDatePicker label="생년월일" name="birth" disabled />
              <FormInput label="이메일" name="email" disabled />

              {defaultValues.gender && (
                <div className="w-full">
                  <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">
                    성별
                  </label>
                  <div className="w-full h-[60px] px-4 flex items-center border border-gray-300 bg-gray-100 text-gray-500 rounded cursor-not-allowed">
                    {defaultValues.gender === "male" ? "남성" : "여성"}
                  </div>
                </div>
              )}

              {showPasswordChange ? (
                <FormProvider {...passwordForm}>
                  <div className="space-y-6">
                    <PasswordChangeForm onCancel={() => setShowPasswordChange(false)} />
                    <button
                      type="button"
                      onClick={() => passwordForm.handleSubmit(handlePasswordSubmit)()}
                      className="w-full h-[60px] bg-primary text-white font-semibold rounded hover:opacity-90 transition"
                    >
                      비밀번호 변경하기
                    </button>
                  </div>
                </FormProvider>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPasswordChange(true)}
                  className="w-full h-[60px] border border-primary text-primary font-medium rounded hover:bg-primary hover:text-white transition"
                >
                  비밀번호 변경하기
                </button>
              )}

              <FormActionInput
                label="전화번호 (번호 변경 시 인증 필요)"
                name="phone"
                placeholder="010-1234-5678"
                buttonText="번호 인증"
                onButtonClick={() => {
                  const phone = getValues("phone")
                  if (!phone) {
                    setError("phone", {
                      type: "manual",
                      message: "전화번호를 입력 후 인증을 진행해주세요.",
                    })
                  }
                }}
              />

              <FormActionInput
                label="인증번호"
                name="verifyCode"
                placeholder="숫자 6자리"
                buttonText="인증 확인"
                onButtonClick={() => {
                  const code = getValues("verifyCode")
                  if (!code) {
                    setError("verifyCode", {
                      type: "manual",
                      message: "인증번호 6자리를 입력해주세요",
                    })
                  }
                }}
              />

              <FormInput
                label="희망 근무지 (복수 가능)"
                name="preferredLocation"
                placeholder="서울, 인천"
              />

              <ControlledCheckboxGroup
                label="관심 분야 (중복 선택 가능)"
                name="interests"
                options={["사무", "서비스", "기술직", "교육/강사", "서울시 공공 일자리", "운전/배송"]}
                control={control}
                error={errors.interests?.message}
              />

              <ControlledCheckboxGroup
                label="어떤 정보를 얻고 싶어서 가입하셨나요? (중복 선택 가능)"
                name="purposes"
                options={[
                  "일자리 관련 정보",
                  "교육 및 재취업 준비",
                  "창업 및 부업 정보",
                  "네트워킹 및 커뮤니티",
                ]}
                control={control}
                error={errors.purposes?.message}
              />

              <ControlledCheckboxGroup
                label="유입 경로 (중복 선택 가능)"
                name="channels"
                options={[
                  "네이버 검색",
                  "구글 검색",
                  "네이버 카페",
                  "인스타그램/유튜브",
                  "복지관/고용센터/박람회",
                  "지인추천",
                ]}
                control={control}
                error={errors.channels?.message}
              />

              <div className="flex gap-4 mt-7">
                <button
                  type="button"
                  onClick={() => {
                    console.log("수정 취소")
                  }}
                  className="w-full h-[60px] bg-gray-200 text-gray-700 font-semibold rounded hover:bg-gray-300 transition"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="w-full h-[60px] bg-primary text-white font-semibold rounded hover:opacity-90 transition"
                >
                  정보 수정하기
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
