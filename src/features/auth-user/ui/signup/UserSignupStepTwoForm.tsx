"use client";
import { useForm, FormProvider, Controller, FieldValues, Path, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-datepicker/dist/react-datepicker.css";
import { userSignupSchema, UserFormValues } from "@/features/auth-user/validation/user-auth.schema";
import FormActionInput from "@/features/auth-common/components/baseFields/FormActionInput";
import FormInput from "@/features/auth-common/components/baseFields/FormInput";
import FormDatePicker from "@/features/auth-common/components/baseFields/FormDatePicker";
import UserTermsAgreement from "@/features/auth-common/components/terms/UserTermsAgreement";
import { SIGNUP_CONSTANTS } from "@/constants/signup";
import { useSmsVerification } from "@/hooks/useSmsVerification";
import { handleSmsVerificationError, handleSmsCodeVerificationError } from "@/utils/errorHandlers";
import { toast } from "react-hot-toast";

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
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  const smsVerification = useSmsVerification();

  const onFormSubmit = async (data: UserFormValues) => {
    if (!smsVerification.isVerified) {
      setError("phone", {
        type: "manual",
        message: "전화번호 인증을 완료해야 회원가입이 가능합니다.",
      });
      return;
    }

    const birthDate = new Date(data.birth);
    if (isNaN(birthDate.getTime())) {
      setError("birth", {
        type: "manual",
        message: "생년월일 형식이 올바르지 않습니다.",
      });
      return;
    }
    const isoBirth = birthDate.toISOString();

    await onSubmit({ ...data, birth: isoBirth });
  };

  const handleRequestVerification = async () => {
    const rawPhone = getValues("phone");
    if (!rawPhone) {
      setError("phone", {
        type: "manual",
        message: "전화번호를 입력해주세요.",
      });
      return;
    }

    smsVerification.requestVerification(
      { phone_number: rawPhone },
      {
        onSuccess: () => {
          clearErrors("phone");
          toast.success("인증번호가 발송되었습니다. 확인 후 입력해주세요");
        },
        onError: (error) => {
          handleSmsVerificationError(error, setError, "phone", () => {});
        },
      },
    );
  };

  const handleVerifyCode = async () => {
    const code = getValues("verifyCode");
    const rawPhone = getValues("phone");

    if (!code) {
      setError("verifyCode", {
        type: "manual",
        message: "인증번호를 입력해주세요.",
      });
      return;
    }

    smsVerification.verifyCode(
      { phone_number: rawPhone, code: code },
      {
        onSuccess: () => {
          clearErrors("verifyCode");
          toast.success("전화번호 인증이 완료되었습니다!");
        },
        onError: (error) => {
          handleSmsCodeVerificationError(error, setError, "verifyCode");
        },
      },
    );
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col items-center space-y-8"
        noValidate
        role="form"
        aria-label="개인 회원가입 2단계 폼"
      >
        <h2 className="text-3xl font-semibold" id="user-signup-title">
          개인 회원정보
        </h2>
        <div
          className="w-full max-w-[700px] space-y-6"
          role="group"
          aria-labelledby="user-signup-title"
          aria-describedby="user-signup-step-info"
        >
          <div id="user-signup-step-info" className="sr-only" aria-live="polite">
            2단계: 개인정보와 전화번호 인증을 완료해주세요. 모든 필드는 필수 입력사항입니다.
          </div>
          <FormInput<UserFormValues>
            label="이름"
            name="name"
            placeholder={SIGNUP_CONSTANTS.PLACEHOLDERS.USER_NAME}
          />

          <FormDatePicker<UserFormValues>
            label="생년월일"
            name="birth"
            placeholder={SIGNUP_CONSTANTS.PLACEHOLDERS.USER_BIRTH}
          />

          <FormActionInput<UserFormValues>
            label="전화번호"
            name="phone"
            placeholder={SIGNUP_CONSTANTS.PLACEHOLDERS.USER_PHONE}
            buttonText={
              smsVerification.isRequestingCode
                ? "전송 중..."
                : SIGNUP_CONSTANTS.BUTTON_TEXT.REQUEST_VERIFICATION
            }
            buttonDisabled={smsVerification.isRequestingCode}
            timerText={
              smsVerification.timeLeft > 0 ? `남은시간: ${smsVerification.formattedTime}` : ""
            }
            onButtonClick={handleRequestVerification}
          />

          {(smsVerification.timeLeft > 0 || smsVerification.isVerified) && (
            <FormActionInput<UserFormValues>
              label="인증번호"
              name="verifyCode"
              placeholder={SIGNUP_CONSTANTS.PLACEHOLDERS.VERIFICATION_CODE}
              buttonText={
                smsVerification.isVerifyingCode
                  ? "확인 중..."
                  : smsVerification.isVerified
                    ? "인증 완료"
                    : SIGNUP_CONSTANTS.BUTTON_TEXT.VERIFY_CODE
              }
              buttonDisabled={smsVerification.isVerifyingCode || smsVerification.isVerified}
              onButtonClick={handleVerifyCode}
            />
          )}

          <div className="mb-10">
            <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">성별</label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <>
                  <div className="flex flex-col sm:flex-row w-full sm:gap-4">
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
            disabled={!smsVerification.isVerified}
            className={`w-full h-[60px] bg-primary text-white font-semibold rounded transition cursor-pointer ${
              !smsVerification.isVerified ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {SIGNUP_CONSTANTS.BUTTON_TEXT.COMPLETE_SIGNUP}
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

const GenderButton = ({ selected, onClick, label }: GenderButtonProps) => (
  <button
    type="button"
    className={`flex-1 h-[50px] border-2 rounded transition ${
      selected ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 text-gray-700"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

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
    <div className="mb-10">
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedValues: string[] = field.value || [];
          const toggleOption = (value: string) => {
            const newValues = selectedValues.includes(value)
              ? selectedValues.filter((v: string) => v !== value)
              : [...selectedValues, value];
            field.onChange(newValues);
          };

          return (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`p-3 border-2 rounded transition text-left ${
                      selectedValues.includes(option)
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 text-gray-700"
                    }`}
                    onClick={() => toggleOption(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {error && <p className="text-red-500 mt-1 ml-2">{error}</p>}
            </>
          );
        }}
      />
    </div>
  );
}
