"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserFormValues } from "@/features/auth-user/model/validation";

export type UserStepTwoValues = UserFormValues;

type Props = {
  onSubmit: (data: UserStepTwoValues) => void;
};

export default function SignupStepTwoUser({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setError,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      interests: [],
      purposes: [],
      channels: [],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-8">
      <h2 className="text-2xl font-semibold">회원 정보</h2>

      <div className="w-full max-w-[700px] space-y-6">
        <Input label="이름" name="name" placeholder="김오즈" register={register} error={errors.name?.message} />

        <Input
          label="생년월일"
          name="birth"
          type="date"
          placeholder="YYYY-MM-DD"
          register={register}
          error={errors.birth?.message}
        />

        <InputWithButton
          label="전화번호"
          name="phone"
          placeholder="010-1234-5678"
          buttonText="번호 인증"
          onButtonClick={() => {
            const phone = getValues("phone");
            if (!phone) {
              setError("phone", { type: "manual", message: "전화번호를 입력 후 인증을 진행해주세요." });
              return;
            }
            // 인증 로직 연결 예정
          }}
          register={register}
          error={errors.phone?.message}
        />

        <InputWithButton
          label="인증번호"
          name="verifyCode"
          placeholder="숫자 6자리"
          buttonText="인증 확인"
          onButtonClick={() => {
            const verifyCode = getValues("verifyCode");
            if (!verifyCode) {
              setError("verifyCode", {
                type: "manual",
                message: "인증번호 6자리를 입력해주세요",
              });
              return;
            }
            // 확인 로직 연결 예정
          }}
          register={register}
          error={errors.verifyCode?.message}
        />

        <div className="mb-10">
          <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">성별</label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <>
                <div className="flex gap-4">
                  <GenderButton selected={field.value === 'male'} onClick={() => field.onChange('male')} label="남성" />
                  <GenderButton selected={field.value === 'female'} onClick={() => field.onChange('female')} label="여성" />
                </div>
                {errors.gender && <p className="text-red-500 mt-1 ml-2">{errors.gender.message}</p>}
              </>
            )}
          />
        </div>

        <ControlledCheckboxGroup
          label="관심 분야 (중복 선택 가능)"
          name="interests"
          options={['사무', '서비스', '기술직', '교육/강사', '서울시 공공 일자리', '운전/배송']}
          control={control}
          error={errors.interests?.message}
        />

        <ControlledCheckboxGroup
          label="어떤 정보를 얻고 싶어서 가입하셨나요? (중복 선택 가능)"
          name="purposes"
          options={['일자리 관련 정보', '교육 및 재취업 준비', '창업 및 부업 정보', '네트워킹 및 커뮤니티']}
          control={control}
          error={errors.purposes?.message}
        />

        <ControlledCheckboxGroup
          label="유입 경로 (중복 선택 가능)"
          name="channels"
          options={['네이버 검색', '구글 검색', '네이버 카페', '인스타그램/유튜브', '복지관/고용센터/박람회', '지인추천']}
          control={control}
          error={errors.channels?.message}
        />

        <button
          type="submit"
          className="w-full h-[60px] bg-primary text-white font-semibold rounded mt-7 hover:opacity-90 transition cursor-pointer"
        >
          회원가입 완료
        </button>
      </div>
    </form>
  );
}

const Input = ({ label, name, type = 'text', placeholder, register, error }: {
  label: string;
  name: keyof UserFormValues;
  type?: string;
  placeholder?: string;
  register: ReturnType<typeof useForm<UserFormValues>>['register'];
  error?: string;
}) => {
  return (
    <div>
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-[60px] rounded px-4 bg-white placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:border-2 focus:border-primary"
        {...register(name)}
      />
      {error && <p className="text-red-500 mt-1 ml-2">{error}</p>}
    </div>
  );
};

const InputWithButton = ({ label, name, placeholder, buttonText, onButtonClick, register, error }: {
  label: string;
  name: keyof UserFormValues;
  placeholder?: string;
  buttonText: string;
  onButtonClick: () => void;
  register: ReturnType<typeof useForm<UserFormValues>>['register'];
  error?: string;
}) => {
  return (
    <div>
      <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">{label}</label>
      <div className="flex gap-3 w-full">
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 h-[60px] rounded px-4 bg-white placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:border-2 focus:border-primary"
          {...register(name)}
        />
        <button
          type="button"
          onClick={onButtonClick}
          className="h-[60px] px-4 border border-primary text-primary rounded hover:bg-primary hover:text-white transition whitespace-nowrap cursor-pointer"
        >
          {buttonText}
        </button>
      </div>
      {error && <p className="text-red-500 mt-1 ml-2">{error}</p>}
    </div>
  );
};

const GenderButton = ({ selected, onClick, label }: { selected: boolean; onClick: () => void; label: string }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[120px] h-[60px] rounded font-semibold border cursor-pointer 
        ${selected ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300'} 
        focus:outline-none focus:ring-0`}
    >
      {label}
    </button>
  );
};

const ControlledCheckboxGroup = ({ label, name, options, control, error }: {
  label: string;
  name: keyof UserFormValues;
  options: string[];
  control: ReturnType<typeof useForm<UserFormValues>>['control'];
  error?: string;
}) => {
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
            <label className="block mb-3 ml-2 font-semibold text-base sm:text-lg">{label}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {options.map((option, idx) => {
                const isChecked = selected.includes(option);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleOption(option)}
                    className={`flex items-center justify-between gap-2 px-4 py-[14px] min-w-[160px] h-auto rounded cursor-pointer font-medium border transition break-words text-center
                      ${isChecked ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300'}`}
                  >
                    <span className="block leading-tight">{option}</span>
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
};
