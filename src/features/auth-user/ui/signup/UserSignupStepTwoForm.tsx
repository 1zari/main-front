"use client";
import { useState, useEffect } from "react";
import { useForm, FormProvider, Controller, FieldValues, Path, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-datepicker/dist/react-datepicker.css";
import { userSignupSchema, UserFormValues } from "@/features/auth-user/validation/user-auth.schema";
import FormActionInput from "@/features/auth-common/components/baseFields/FormActionInput";
import FormInput from "@/features/auth-common/components/baseFields/FormInput";
import FormDatePicker from "@/features/auth-common/components/baseFields/FormDatePicker";
import UserTermsAgreement from "@/features/auth-common/components/terms/UserTermsAgreement";

export type UserStepTwoValues = UserFormValues;

type Props = {
  onSubmit: (data: UserStepTwoValues) => void;
};

export default function SignupStepTwoUser({ onSubmit }: Props) {
  const methods = useForm<UserFormValues>({
    resolver: zodResolver(userSignupSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      verifyCode: "",
      birth: "",
      gender: undefined,
      preferredLocation: "",
      interests: [],
      purposes: [],
      channels: [],
      agreeTerms: false,
    },
  });

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  const [isRequesting, setIsRequesting] = useState(false);
  const [isVerifyInputVisible, setIsVerifyInputVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

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
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((data) => {
          if (!isVerified) {
            setError("phone", {
              type: "manual",
              message: "전화번호 인증을 완료해야 회원가입이 가능합니다.",
            });
            return;
          }
          onSubmit(data);
        })}
        className="flex flex-col items-center space-y-8"
      >
        <h2 className="text-3xl font-semibold">개인 회원정보</h2>
        <div className="w-full max-w-[700px] space-y-6">
          <FormInput<UserFormValues> label="이름" name="name" placeholder="김오즈" />

          <FormDatePicker<UserFormValues>
            label="생년월일"
            name="birth"
            placeholder="입력란을 클릭하여 생년월일을 선택해 주세요."
          />

          <FormActionInput<UserFormValues>
            label="전화번호"
            name="phone"
            placeholder="010-1234-5678"
            buttonText="인증 요청"
            buttonDisabled={isRequesting}
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
                  message: "전화번호를 입력 후 인증을 진행해주세요.",
                });
                return;
              }
              clearErrors("phone");
              setIsRequesting(true);
              setTimeLeft(120);
              setIsVerifyInputVisible(true);
              setIsFadingOut(false);
            }}
          />

          {isVerifyInputVisible && (
            <div
              className={`transition-opacity duration-100 ease-in ${
                isFadingOut ? "opacity-0" : "opacity-100"
              }`}
            >
              <FormActionInput<UserFormValues>
                label="인증번호"
                name="verifyCode"
                placeholder="숫자 6자리"
                buttonText="인증 확인"
                onButtonClick={() => {
                  const code = getValues("verifyCode");
                  if (!code) {
                    setError("verifyCode", {
                      type: "manual",
                      message: "인증번호 6자리를 입력해주세요",
                    });
                    return;
                  }
                  setIsVerified(true);
                  setValue("verifyCode", code, { shouldValidate: true });
                  setIsFadingOut(true);
                  setTimeout(() => {
                    setIsVerifyInputVisible(false);
                    setIsRequesting(false);
                  }, 100);
                }}
              />
            </div>
          )}

          <div className="mb-10">
            <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">성별</label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <>
                  <div className="flex flex-col sm:flex-row w-full sm:gap-4">
                    <div className="flex w-full gap-3">
                      <GenderButton
                        selected={field.value === "male"}
                        onClick={() => field.onChange("male")}
                        label="남성"
                      />
                      <GenderButton
                        selected={field.value === "female"}
                        onClick={() => field.onChange("female")}
                        label="여성"
                      />
                    </div>
                  </div>
                  {errors.gender && (
                    <p className="text-red-500 mt-1 ml-2">{errors.gender.message}</p>
                  )}
                </>
              )}
            />
          </div>

          <FormInput<UserFormValues>
            label="희망 근무지 (복수 가능)"
            name="preferredLocation"
            placeholder="쉼표(,)로 구분하여 입력해주세요. 예: 서울, 경기, 인천"
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
          <div className="mb-10">
            <label className="block ml-2 mt-17 font-semibold text-base sm:text-lg">
              사이트 이용을 위한 필수 약관에 동의해주세요
            </label>
            <Controller
              name="agreeTerms"
              control={control}
              render={({ field }) => (
                <UserTermsAgreement onAllAgreedChange={(agreed) => field.onChange(agreed)} />
              )}
            />
            {errors.agreeTerms && (
              <p className="text-red-500 mt-1 ml-2">{errors.agreeTerms.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full h-[60px] font-semibold rounded mt-7 transition bg-primary text-white hover:opacity-90 cursor-pointer"
          >
            회원가입 완료
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

type GenderButtonProps = {
  selected: boolean;
  onClick: () => void;
  label: string;
};

const GenderButton = ({ selected, onClick, label }: GenderButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-1/2 sm:w-[120px] h-[60px] rounded font-semibold border cursor-pointer ${
        selected ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-300"
      } focus:outline-none focus:ring-0`}
    >
      {label}
    </button>
  );
};

type ControlledCheckboxGroupProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  options: string[];
  control: Control<T>;
  error?: string;
};

function ControlledCheckboxGroup<T extends FieldValues>({
  label,
  name,
  options,
  control,
  error,
}: ControlledCheckboxGroupProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selected = Array.isArray(field.value) ? field.value : [];

        const toggleOption = (value: string) => {
          const exists = selected.includes(value);
          const updated = exists ? selected.filter((v) => v !== value) : [...selected, value];
          field.onChange(updated);
        };

        return (
          <div className="mb-12">
            <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg whitespace-normal break-keep">
              {label}
            </label>
            <div className="grid grid-cols-1 min-[500px]:grid-cols-2 sm:grid-cols-3 gap-3">
              {options.map((option, idx) => {
                const isChecked = selected.includes(option);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleOption(option)}
                    className={`flex items-center justify-between gap-2 px-4 py-[14px] min-w-[160px] h-auto rounded cursor-pointer font-medium border transition break-words text-center ${
                      isChecked
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    <span className="leading-tight flex items-center justify-center text-center w-full h-full whitespace-normal break-keep">
                      {option}
                    </span>
                    <input
                      type="checkbox"
                      value={option}
                      checked={isChecked}
                      onChange={() => toggleOption(option)}
                      className="hidden"
                    />
                    {isChecked && (
                      <svg
                        className="w-4 h-4 text-white shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
            {error && <p className="text-red-500 mt-1 ml-2">{error}</p>}
          </div>
        );
      }}
    />
  );
}
