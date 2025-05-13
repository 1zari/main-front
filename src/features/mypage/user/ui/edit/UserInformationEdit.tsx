"use client";
import ControlledCheckboxGroup from "@/features/auth-common/components/baseFields/ControlledCheckboxGroup";
import FormActionInput from "@/features/auth-common/components/baseFields/FormActionInput";
import FormDatePicker from "@/features/auth-common/components/baseFields/FormDatePicker";
import FormInput from "@/features/auth-common/components/baseFields/FormInput";
import {
  UserEditFormValues,
  userEditSchema,
  UserPasswordEditFormValues,
  userPasswordEditSchema,
} from "@/features/mypage/user/validation/user-edit.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PasswordChangeForm from "./PasswordChangeForm";

export default function UserInformationEdit({
  onSubmit = (data) => console.log("수정 요청", data),
  defaultValues,
}: {
  onSubmit?: (data: UserEditFormValues) => void;
  defaultValues?;
}) {
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isVerifyInputVisible, setIsVerifyInputVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const methods = useForm<UserEditFormValues>({
    resolver: zodResolver(userEditSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const passwordForm = useForm<UserPasswordEditFormValues>({
    resolver: zodResolver(userPasswordEditSchema),
    mode: "onBlur",
  });

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (!isRequesting) return;
    if (timeLeft <= 0) {
      setIsRequesting(false);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isRequesting, timeLeft]);

  return (
    <div className="flex justify-center items-center flex-1">
      <div className="bg-white rounded-lg shadow-md px-10 py-[100px] w-full max-w-[1000px]">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-8">
            <h2 className="text-3xl font-semibold">개인회원 정보수정</h2>

            <div className="w-full max-w-[700px] space-y-6">
              <FormInput label="이름" name="name" disabled />
              <FormDatePicker label="생년월일" name="birth" disabled />
              <FormInput label="이메일" name="email" disabled />

              {showPasswordChange ? (
                <FormProvider {...passwordForm}>
                  <div className="space-y-6 animate-fadeIn">
                    <PasswordChangeForm
                      onCancel={() => setShowPasswordChange(false)}
                      onSuccess={() => {
                        setPasswordChanged(true);
                        setShowPasswordChange(false);
                      }}
                    />
                  </div>
                </FormProvider>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPasswordChange(true)}
                  disabled={passwordChanged}
                  className={`w-full h-[60px] font-medium rounded transition ${
                    passwordChanged
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "border border-primary text-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  {passwordChanged ? "비밀번호 변경완료" : "비밀번호 변경하기"}
                </button>
              )}

              {!isEditingPhone ? (
                <FormActionInput
                  label="전화번호"
                  name="phone"
                  placeholder="010-1234-5678"
                  buttonText="번호 변경"
                  inputDisabled={true}
                  buttonDisabled={false}
                  preserveStyleOnDisabled={true}
                  onButtonClick={() => {
                    setIsEditingPhone(true);
                    setIsVerified(false);
                    setIsVerifyInputVisible(true);
                    setIsFadingOut(false);
                    setValue("verifyCode", "");
                  }}
                />
              ) : (
                <div className="animate-fadeIn space-y-4">
                  <FormActionInput
                    label="변경할 전화번호"
                    name="phone"
                    placeholder="010-0000-0000"
                    buttonText="인증 요청"
                    buttonDisabled={isRequesting}
                    inputDisabled={isRequesting}
                    timerText={
                      isRequesting
                        ? `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`
                        : undefined
                    }
                    onButtonClick={() => {
                      const phone = getValues("phone");
                      if (!phone) {
                        setError("phone", {
                          type: "manual",
                          message: "전화번호를 입력해주세요",
                        });
                        return;
                      }
                      setIsRequesting(true);
                      setTimeLeft(120);
                    }}
                  />

                  {isVerifyInputVisible && !isVerified && (
                    <div
                      className={`transition-opacity duration-100 ease-in ${
                        isFadingOut ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <FormActionInput
                        label="인증번호"
                        name="verifyCode"
                        placeholder="숫자 6자리"
                        buttonText="인증 확인"
                        onButtonClick={() => {
                          const code = getValues("verifyCode");
                          if (!code) {
                            setError("verifyCode", {
                              type: "manual",
                              message: "인증번호를 입력해주세요",
                            });
                            return;
                          }
                          setIsFadingOut(true);
                          setTimeout(() => {
                            setIsVerifyInputVisible(false);
                            setIsVerified(true);
                            setIsEditingPhone(false);
                            setIsRequesting(false);
                            setValue("verifyCode", "");
                          }, 100);
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              <FormInput label="희망 근무지" name="preferredLocation" placeholder="서울, 인천" />

              <ControlledCheckboxGroup
                label="관심 분야 (중복 선택 가능)"
                name="interests"
                options={[
                  "사무",
                  "서비스",
                  "기술직",
                  "교육/강사",
                  "서울시 공공 일자리",
                  "운전/배송",
                ]}
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

              <div className="flex flex-col sm:flex-row gap-4 mt-7 w-full">
                <button
                  type="button"
                  onClick={() => {
                    console.log("수정 취소");
                  }}
                  className="h-[60px] w-full bg-gray-200 text-gray-700 font-semibold rounded hover:bg-gray-300 transition"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="h-[60px] w-full bg-primary text-white font-semibold rounded hover:opacity-90 transition"
                >
                  정보 수정하기
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
