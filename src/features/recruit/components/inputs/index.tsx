import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
import { JobPostFormValues } from "../../schemas/jobPostSchema";

function FormField({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>;
}

function ErrorMessage({ error }: { error?: FieldError }) {
  return error ? <p className="text-red-500 text-sm">{error.message}</p> : null;
}

export function TitleInput({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField>
      <label>공고 제목</label>
      <input {...register("title")} placeholder="공고 제목" className="input border rounded p-2" />
      <ErrorMessage error={error} />
    </FormField>
  );
}

export function OccupationInput({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField>
      <label>직종</label>
      <input {...register("occupation")} placeholder="직종" className="input border rounded p-2" />
      <ErrorMessage error={error} />
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
    <FormField>
      <label>고용형태</label>
      <select {...register("employmentType")} className="input border rounded p-2">
        <option value="정규직">정규직</option>
        <option value="계약직">계약직</option>
      </select>
      <ErrorMessage error={error} />
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
    <FormField>
      <div className="flex gap-3 flex-col items-start md:flex-row md:items-center flex-wrap">
        <label className="w-min-4 font-bold">모집인원</label>
        <input
          type="number"
          {...register("numberOfRecruits", { valueAsNumber: true })}
          placeholder="모집 인원"
          className="input border rounded p-2"
        />
        <ErrorMessage error={error} />
      </div>
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
    <FormField>
      <label>경력여부</label>
      <div className="flex gap-4">
        <label>
          <input type="radio" value="경력무관" {...register("career")} /> 경력무관
        </label>
        <label>
          <input type="radio" value="경력" {...register("career")} /> 경력
        </label>
      </div>
      <ErrorMessage error={error} />
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
    <FormField>
      <label>학력</label>
      <div className="flex gap-4">
        <label>
          <input type="radio" value="고졸" {...register("education")} /> 고졸
        </label>
        <label>
          <input type="radio" value="대졸" {...register("education")} /> 대졸
        </label>
        <label>
          <input type="radio" value="학력무관" {...register("education")} /> 학력무관
        </label>
      </div>
      <ErrorMessage error={error} />
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
    <FormField>
      <label>근무지</label>
      <input {...register("location")} placeholder="근무지" className="input border rounded p-2" />
      <ErrorMessage error={error} />
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
    <FormField>
      <label>공고 마감일</label>
      <input type="date" {...register("deadline")} className="input border rounded p-2" />
      <ErrorMessage error={error} />
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
    <FormField>
      <label>급여</label>
      <input
        type="number"
        {...register("salary", { valueAsNumber: true })}
        placeholder="급여"
        className="input border rounded p-2"
      />
      <ErrorMessage error={error} />
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
    <FormField>
      <label>근무요일</label>
      <div className="flex gap-2 flex-wrap">
        {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
          <label key={day}>
            <input type="checkbox" value={day} {...register("workingDays")} /> {day}
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
    <FormField>
      <label>근무시간</label>
      <div className="flex items-center gap-2">
        <label>시작 시간</label>
        <input type="time" {...register("workingHours.start")} />
        {error?.start && <p className="text-red-500 text-sm">{error.start.message}</p>}

        <label>종료 시간</label>
        <input type="time" {...register("workingHours.end")} />
        {error?.end && <p className="text-red-500 text-sm">{error.end.message}</p>}
      </div>
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
    <FormField>
      <label>근무요약</label>
      <input
        {...register("jobSummary")}
        placeholder="50자 이내 입력"
        className="input border rounded p-2"
      />
      <ErrorMessage error={error} />
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
    <FormField>
      <label>상세요강</label>
      <textarea
        {...register("jobDescription")}
        placeholder="상세요강 입력"
        className="input border rounded p-2 min-h-[150px]"
      />
      <ErrorMessage error={error} />
    </FormField>
  );
}

export function AgreeTermsCheckbox({
  register,
  error,
}: {
  register: UseFormRegister<JobPostFormValues>;
  error?: FieldError;
}) {
  return (
    <FormField>
      <label>
        <input type="checkbox" {...register("agreeTerms")} /> 이용약관에 동의합니다.
      </label>
      <ErrorMessage error={error} />
    </FormField>
  );
}
