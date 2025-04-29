import { Heading } from "@/components/ui/Heading";
import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import {
  ERROR_TEXT_CLASS,
  FIELD_WRAPPER_CLASS,
  INPUT_CLASS,
  LABEL_CLASS,
  RADIO_CHECKBOX_CLASS,
} from "../../constants/classNames";
import { JobPostFormValues } from "../../schemas/jobPostSchema";

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  error?: FieldError;
};

export function FormField({ label, children, error }: FormFieldProps) {
  return (
    <div className={FIELD_WRAPPER_CLASS}>
      <label className={LABEL_CLASS}>{label}</label>
      <div className="relative flex flex-col w-full">
        {children}
        {error && <ErrorMessage error={error} />}
      </div>
    </div>
  );
}

function ErrorMessage({ error }: { error?: FieldError }) {
  return error ? <p className={ERROR_TEXT_CLASS}>{error.message}</p> : null;
}

export function TitleInput({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField label="공고 제목" error={error}>
      <input
        {...register("title")}
        placeholder="50자 이내로 입력해주세요."
        className={INPUT_CLASS}
      />
    </FormField>
  );
}

export function EmploymentTypeSelect({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField label="고용형태" error={error}>
      <div className="flex gap-2">
        {["정규직", "계약직"].map((option) => (
          <label key={option} className="cursor-pointer">
            <input
              type="radio"
              value={option}
              {...register("employmentType")}
              className="hidden peer"
            />
            <div className={RADIO_CHECKBOX_CLASS}>{option}</div>
          </label>
        ))}
      </div>
    </FormField>
  );
}

export function NumberOfRecruitsInput({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField label="모집인원" error={error}>
      <input
        type="number"
        {...register("numberOfRecruits", { valueAsNumber: true })}
        placeholder="예시) 00"
        className={`relative ${INPUT_CLASS} [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">명</span>
    </FormField>
  );
}

export function CareerRadio({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField label="경력여부" error={error}>
      <div className="flex gap-2">
        {["경력", "경력무관"].map((option) => (
          <label key={option} className="cursor-pointer">
            <input type="radio" value={option} {...register("career")} className="hidden peer" />
            <div className={RADIO_CHECKBOX_CLASS}>{option}</div>
          </label>
        ))}
      </div>
    </FormField>
  );
}

export function EducationRadio({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField label="학력" error={error}>
      <div className="flex gap-2">
        {["고졸", "대졸", "학력무관"].map((option) => (
          <label key={option} className="cursor-pointer">
            <input type="radio" value={option} {...register("education")} className="hidden peer" />
            <div className={RADIO_CHECKBOX_CLASS}>{option}</div>
          </label>
        ))}
      </div>
    </FormField>
  );
}

export function LocationInput({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField label="근무지" error={error}>
      <input {...register("location")} placeholder="근무지" className={INPUT_CLASS} />
    </FormField>
  );
}

export function DeadlineInput({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField label="공고 마감일" error={error}>
      <input type="date" {...register("deadline")} className={`w-full ${INPUT_CLASS}`} />
    </FormField>
  );
}

export function SalaryInput({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField label="급여" error={error}>
      <div className="flex gap-2 w-full">
        <select {...register("salaryType")} className="border rounded p-2">
          <option value="일급">일급</option>
          <option value="월급">월급</option>
          <option value="연봉">연봉</option>
        </select>
        <div className="relative w-full">
          <input
            type="text"
            {...register("salary", {
              valueAsNumber: true,
              setValueAs: (v) => (v === "" ? undefined : Number(String(v).replace(/,/g, ""))),
            })}
            placeholder="급여"
            className={`w-full ${INPUT_CLASS} [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
            onBlur={(e) => {
              const value = e.target.value.replace(/,/g, "");
              if (!isNaN(Number(value))) {
                e.target.value = Number(value).toLocaleString();
              }
            }}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">원</span>
        </div>
      </div>
    </FormField>
  );
}

export function WorkingDaysCheckbox({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError | FieldError[] | undefined;
}) {
  return (
    <FormField label="근무요일" error={error}>
      <div className="flex gap-2 flex-wrap">
        {["월", "화", "수", "목", "금", "토", "일", "요일협의"].map((day) => (
          <label key={day}>
            <input
              type="checkbox"
              value={day}
              {...register("workingDays")}
              className="hidden peer"
            />
            <div
              className={`flex items-center justify-center border-2 rounded peer-checked:bg-white peer-checked:border-primary text-gray-700 peer-checked:text-primary ${
                day === "요일협의" ? "h-10 px-4" : "w-10 h-10"
              }`}
            >
              {day}
            </div>
          </label>
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm">
          {Array.isArray(error) ? error[0]?.message : error.message}
        </p>
      )}
    </FormField>
  );
}

export function WorkingHoursInput({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldErrors<JobPostFormValues["workingHours"]>;
}) {
  return (
    <FormField label="근무시간" error={error}>
      <div className="flex flex-wrap items-center gap-3">
        {/* <label>시작 시간</label> */}
        <div className="flex gap-1 items-center">
          <input
            type="time"
            {...register("workingHours.start")}
            className={`${INPUT_CLASS} min-w-[150px]`}
          />
          {error?.start && <p className="text-red-500 text-sm">{error.start.message}</p>}
          <span>~</span>
          {/* <label>종료 시간</label> */}
          <input
            type="time"
            {...register("workingHours.end")}
            className={`${INPUT_CLASS} min-w-[150px]`}
          />
        </div>
        <label>
          <input type="checkbox" value="시간협의" className="hidden peer" />
          <div className="h-10 px-4 flex items-center justify-center border-2 rounded peer-checked:bg-white peer-checked:border-primary text-gray-700 peer-checked:text-primary">
            시간 협의
          </div>
        </label>
      </div>

      {error?.end && <p className="text-red-500 text-sm">{error.end.message}</p>}
    </FormField>
  );
}

export function JobSummaryInput({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField label="근무요약" error={error}>
      <input {...register("jobSummary")} placeholder="50자 이내 입력" className={INPUT_CLASS} />
    </FormField>
  );
}

export function JobDescriptionInput({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField label="상세요강" error={error}>
      <textarea
        {...register("jobDescription")}
        placeholder="상세요강 입력"
        rows={5}
        className={INPUT_CLASS}
      />
    </FormField>
  );
}

export function SectionTitle({ title }: { title: string }) {
  return (
    <div className="text-primary font-bold mt-3">
      <Heading sizeOffset={3}>{title}</Heading>
    </div>
  );
}
