"use client";
import {
  useForm,
  FormProvider,
  useFieldArray,
  SubmitHandler,
  Control,
  UseFormRegister,
  UseFormWatch,
  Path,
} from "react-hook-form";
import { useModalStore } from "@/store/useModalStore";
import { useState, useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema, ResumeFormData } from "@/features/resume/validation/resumeSchema";
import { useRouter, useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateResume } from "@/features/resume/api/useCreateResume";
import { useUpdateResume } from "@/features/resume/api/useUpdateResume";
import { mapToCreateDto } from "@/features/resume/utils/mapToCreateDto";
import { mapToUpdateDto } from "@/features/resume/utils/mapToUpdateDto";
import Input from "@/features/resume/components/common/ui/Input";
import TextArea from "@/features/resume/components/common/ui/TextArea";
import DatePickerField from "@/features/resume/components/common/ui/DatePicker";
import CustomSelect from "@/features/resume/components/common/ui/Select";
import { LoadingSpinner } from "@/features/resume/components/common/LoadingSpinner";
import { ErrorMessage } from "@/features/resume/components/common/ErrorMessage";
import {
  SCHOOL_TYPE_OPTIONS,
  GRADUATION_STATUS_OPTIONS,
} from "@/features/resume/constants/options";
import {
  ResumeFormProps,
  ResumeApiResponse,
  ApiError,
  ExperienceFormData,
  CertificationFormData,
} from "@/features/resume/types";

function useExperienceField(control: Control<ResumeFormData>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });
  const { showModal } = useModalStore();

  const handleAdd = useCallback(() => {
    const newExperience: ExperienceFormData = {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
    };
    append(newExperience);
  }, [append]);

  const handleRemove = useCallback(
    (index: number) => {
      showModal({
        title: "경력 삭제",
        message: "이 경력을 삭제하시겠습니까?\n삭제된 내용은 복구할 수 없습니다.",
        confirmText: "삭제",
        onConfirm: () => remove(index),
      });
    },
    [remove, showModal],
  );

  return { fields, handleAdd, handleRemove, isEmpty: fields.length === 0 };
}

function useCertificationField(control: Control<ResumeFormData>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });
  const { showModal } = useModalStore();

  const handleAdd = useCallback(() => {
    const newCertification: CertificationFormData = {
      name: "",
      issuer: "",
      date: "",
    };
    append(newCertification);
  }, [append]);

  const handleRemove = useCallback(
    (index: number) => {
      showModal({
        title: "자격증 삭제",
        message: "이 자격증을 삭제하시겠습니까?\n삭제된 내용은 복구할 수 없습니다.",
        confirmText: "삭제",
        onConfirm: () => remove(index),
      });
    },
    [remove, showModal],
  );

  return { fields, handleAdd, handleRemove, isEmpty: fields.length === 0 };
}

interface ExperiencesSectionProps {
  fields: Record<"id", string>[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  watch: UseFormWatch<ResumeFormData>;
  register: UseFormRegister<ResumeFormData>;
  isEmpty: boolean;
}

const ExperiencesSection = ({
  fields,
  onAdd,
  onRemove,
  watch,
  register,
  isEmpty,
}: ExperiencesSectionProps) => (
  <section className="space-y-4">
    <h3 id="experiences-heading" className="text-xl font-semibold text-primary">
      경력 사항
    </h3>
    <div className="sr-only" aria-live="polite" id="experiences-status">
      {isEmpty
        ? "경력 사항이 없습니다. 경력 추가 버튼을 눌러 경력을 추가해보세요."
        : `현재 ${fields.length}개의 경력이 등록되어 있습니다.`}
    </div>

    {isEmpty && (
      <p className="text-gray-500 text-sm" aria-hidden="true">
        경력 사항이 없습니다. 경력을 추가해보세요.
      </p>
    )}

    <div role="group" aria-labelledby="experiences-heading" aria-describedby="experiences-status">
      {fields.map((field, idx) => (
        <div
          key={field.id}
          className="relative space-y-4 p-4 rounded-xl border bg-gray-50"
          role="group"
          aria-label={`${idx + 1}번째 경력 정보`}
        >
          <button
            type="button"
            onClick={() => onRemove(idx)}
            className="absolute top-4 right-4 text-red-500 border border-red-500 rounded-2xl px-2 text-sm hover:bg-red-50 transition-colors"
            aria-label={`${idx + 1}번째 경력 삭제`}
            aria-describedby={`experience-${idx}-description`}
          >
            삭제
          </button>

          <div id={`experience-${idx}-description`} className="sr-only">
            이 버튼을 누르면 {idx + 1}번째 경력 정보가 완전히 삭제됩니다.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name={`experiences.${idx}.company`} label="회사명" placeholder="회사명 입력" />
            <Input name={`experiences.${idx}.position`} label="직무" placeholder="직무 입력" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePickerField
              name={`experiences.${idx}.startDate`}
              label="근무 시작일"
              placeholder="YYYY-MM-DD"
            />
            <DatePickerField
              name={`experiences.${idx}.endDate`}
              label="근무 종료일"
              placeholder="YYYY-MM-DD"
              disabled={!!watch(`experiences.${idx}.isCurrent` as Path<ResumeFormData>)}
            />
          </div>
          <fieldset className="flex items-center gap-2">
            <legend className="sr-only">현재 근무 상태</legend>
            <input
              type="checkbox"
              id={`current-work-${idx}`}
              {...register(`experiences.${idx}.isCurrent` as Path<ResumeFormData>)}
              className="w-5 h-5 accent-primary"
              aria-describedby={`current-work-help-${idx}`}
            />
            <label htmlFor={`current-work-${idx}`} className="cursor-pointer">
              현재 근무 중
            </label>
            <div id={`current-work-help-${idx}`} className="sr-only">
              체크하면 근무 종료일 입력이 비활성화됩니다.
            </div>
          </fieldset>
        </div>
      ))}
    </div>

    <button
      type="button"
      onClick={onAdd}
      className="w-full h-16 border border-primary rounded-lg font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
      aria-label="경력 추가"
      aria-describedby="add-experience-help"
    >
      + 경력 추가하기
    </button>
    <div id="add-experience-help" className="sr-only">
      새로운 경력 정보를 입력할 수 있는 섹션이 추가됩니다.
    </div>
  </section>
);

interface CertificationsSectionProps {
  fields: Record<"id", string>[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  isEmpty: boolean;
}

const CertificationsSection = ({
  fields,
  onAdd,
  onRemove,
  isEmpty,
}: CertificationsSectionProps) => (
  <section className="space-y-4">
    <h3 id="certifications-heading" className="text-xl font-semibold text-primary">
      자격증
    </h3>
    <div className="sr-only" aria-live="polite" id="certifications-status">
      {isEmpty
        ? "자격증이 없습니다. 자격증 추가 버튼을 눌러 자격증을 추가해보세요."
        : `현재 ${fields.length}개의 자격증이 등록되어 있습니다.`}
    </div>

    {isEmpty && (
      <p className="text-gray-500 text-sm" aria-hidden="true">
        자격증이 없습니다. 자격증을 추가해보세요.
      </p>
    )}

    <div
      role="group"
      aria-labelledby="certifications-heading"
      aria-describedby="certifications-status"
    >
      {fields.map((field, idx) => (
        <div
          key={field.id}
          className="relative space-y-4 p-4 rounded-xl border bg-gray-50"
          role="group"
          aria-label={`${idx + 1}번째 자격증 정보`}
        >
          <button
            type="button"
            onClick={() => onRemove(idx)}
            className="absolute top-4 right-4 text-red-500 border border-red-500 rounded-2xl px-2 text-sm hover:bg-red-50 transition-colors"
            aria-label={`${idx + 1}번째 자격증 삭제`}
            aria-describedby={`certification-${idx}-description`}
          >
            삭제
          </button>

          <div id={`certification-${idx}-description`} className="sr-only">
            이 버튼을 누르면 {idx + 1}번째 자격증 정보가 완전히 삭제됩니다.
          </div>

          <Input
            name={`certifications.${idx}.name`}
            label="자격증명"
            placeholder="자격증명을 입력하세요"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name={`certifications.${idx}.issuer`}
              label="발급기관"
              placeholder="발급기관을 입력하세요"
            />
            <DatePickerField
              name={`certifications.${idx}.date`}
              label="취득일자"
              placeholder="YYYY-MM-DD"
            />
          </div>
        </div>
      ))}
    </div>

    <button
      type="button"
      onClick={onAdd}
      className="w-full h-16 border border-primary rounded-lg font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
      aria-label="자격증 추가"
      aria-describedby="add-certification-help"
    >
      + 자격증 추가하기
    </button>
    <div id="add-certification-help" className="sr-only">
      새로운 자격증 정보를 입력할 수 있는 섹션이 추가됩니다.
    </div>
  </section>
);

export default function ResumeForm({ mode, resumeId, defaultValues }: ResumeFormProps) {
  const router = useRouter();
  const params = useParams<{ type: string; userId: string }>();
  const qc = useQueryClient();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isValidParams = useMemo(() => {
    return !!(params?.type && params?.userId);
  }, [params]);

  if (!isValidParams) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-red-600">잘못된 접근입니다.</p>
        <button
          onClick={() => router.replace("/auth/login")}
          className="px-4 py-2 bg-primary text-white rounded hover:opacity-90"
        >
          로그인 페이지로 이동
        </button>
      </div>
    );
  }

  const methods = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),
    mode: "onBlur",
    defaultValues: defaultValues ?? {
      jobCategory: "",
      title: "",
      schoolType: "",
      schoolName: "",
      graduationStatus: "",
      experiences: [],
      certifications: [],
      introduction: "",
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { isSubmitting, errors },
    trigger,
  } = methods;

  const { createResume, isLoading: isCreating, error: createError } = useCreateResume();
  const { updateResume, isUpdating, error: updateError } = useUpdateResume();

  const experiencesField = useExperienceField(control);
  const certificationsField = useCertificationField(control);

  const watchedValues = watch(["schoolType", "graduationStatus"]);
  const [selectedSchoolType, selectedGraduationStatus] = watchedValues;

  const handleSuccess = useCallback(
    (res: ResumeApiResponse) => {
      setSubmitError(null);

      if (mode === "create") {
        const newId = res.resume.resume_id;
        qc.invalidateQueries({ queryKey: ["resumeList"] });
        qc.invalidateQueries({ queryKey: ["resumeDetail", newId] });
        toast.success("이력서가 성공적으로 생성되었습니다!");
        router.push(`/${params.type}/mypage/${params.userId}/resume/${newId}`);
      } else {
        qc.invalidateQueries({ queryKey: ["resumeDetail", resumeId] });
        toast.success("이력서가 성공적으로 수정되었습니다!");
        router.push(`/${params.type}/mypage/${params.userId}/resume/${resumeId}`);
      }
    },
    [mode, qc, params, resumeId, router],
  );

  const handleError = useCallback(
    (err: ApiError | Error | unknown) => {
      let errorMessage = `이력서 ${mode === "create" ? "생성" : "수정"}에 실패했습니다.`;

      if (err && typeof err === "object" && "message" in err && typeof err.message === "string") {
        errorMessage = err.message;
      }

      setSubmitError(errorMessage);
      toast.error(errorMessage);
      console.error(`이력서 ${mode === "create" ? "생성" : "수정"} 실패:`, err);
    },
    [mode],
  );

  const onSubmit: SubmitHandler<ResumeFormData> = useCallback(
    async (data: ResumeFormData) => {
      try {
        setSubmitError(null);

        const isValid = await trigger();
        if (!isValid) {
          setSubmitError("입력 정보를 다시 확인해주세요.");
          return;
        }

        if (mode === "create") {
          const dto = mapToCreateDto(data);
          createResume(dto, {
            onSuccess: handleSuccess,
            onError: handleError,
          });
        } else {
          if (!resumeId) {
            setSubmitError("이력서 ID가 없습니다.");
            return;
          }

          const dto = mapToUpdateDto(data, resumeId);
          updateResume(
            { id: resumeId, dto },
            {
              onSuccess: handleSuccess,
              onError: handleError,
            },
          );
        }
      } catch (error) {
        handleError(error);
      }
    },
    [mode, resumeId, trigger, createResume, updateResume, handleSuccess, handleError],
  );

  const isLoading = mode === "create" ? isCreating : isUpdating;
  const apiError = mode === "create" ? createError : updateError;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-8"
        role="form"
        aria-label={`이력서 ${mode === "create" ? "작성" : "수정"} 폼`}
      >
        <div className="w-full max-w-[700px] space-y-6">
          <div className="sr-only" aria-live="polite" id="form-instructions">
            이력서 {mode === "create" ? "작성" : "수정"} 폼입니다. 모든 필드를 입력한 후 완료 버튼을
            눌러주세요.
          </div>

          {(submitError || apiError) && (
            <div role="alert" aria-live="assertive">
              <ErrorMessage message={submitError || apiError?.message || "오류가 발생했습니다."} />
            </div>
          )}

          <section role="group" aria-labelledby="job-category-heading">
            <h3 id="job-category-heading" className="text-xl font-semibold text-primary mb-4">
              직종
            </h3>
            <Input name="jobCategory" label="" placeholder="ex) 웹디자인" aria-label="직종" />
          </section>

          <section role="group" aria-labelledby="title-heading">
            <h3 id="title-heading" className="text-xl font-semibold text-primary mb-4">
              이력서 제목
            </h3>
            <Input
              name="title"
              label=""
              placeholder="이력서 제목을 입력하세요"
              aria-label="이력서 제목"
            />
          </section>

          <section className="space-y-4" role="group" aria-labelledby="education-heading">
            <h3 id="education-heading" className="text-xl font-semibold text-primary">
              학력 사항
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CustomSelect
                label="학교 구분"
                value={selectedSchoolType}
                onChange={(val) =>
                  setValue("schoolType", val, { shouldValidate: true, shouldTouch: true })
                }
                options={SCHOOL_TYPE_OPTIONS}
                error={errors.schoolType?.message}
                aria-label="학교 구분"
              />
              <Input label="학교명" name="schoolName" placeholder="학교명을 입력하세요" />
              <CustomSelect
                label="졸업 상태"
                value={selectedGraduationStatus}
                onChange={(val) =>
                  setValue("graduationStatus", val, { shouldValidate: true, shouldTouch: true })
                }
                options={GRADUATION_STATUS_OPTIONS}
                error={errors.graduationStatus?.message}
                aria-label="졸업 상태"
              />
            </div>
          </section>

          <div role="group" aria-labelledby="experiences-heading">
            <ExperiencesSection
              fields={experiencesField.fields}
              onAdd={experiencesField.handleAdd}
              onRemove={experiencesField.handleRemove}
              isEmpty={experiencesField.isEmpty}
              watch={watch}
              register={register}
            />
          </div>

          <div role="group" aria-labelledby="certifications-heading">
            <CertificationsSection
              fields={certificationsField.fields}
              onAdd={certificationsField.handleAdd}
              onRemove={certificationsField.handleRemove}
              isEmpty={certificationsField.isEmpty}
            />
          </div>

          <section className="space-y-4" role="group" aria-labelledby="introduction-heading">
            <h3 id="introduction-heading" className="text-xl font-semibold text-primary">
              자기소개
            </h3>
            <TextArea
              name="introduction"
              label=""
              placeholder="자기소개는 최대 500자까지 작성하실 수 있습니다."
              aria-label="자기소개"
            />
          </section>

          <button
            type="submit"
            className="w-full h-[60px] rounded bg-primary font-semibold text-white hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={isLoading || isSubmitting}
            aria-label={`이력서 ${mode === "create" ? "작성" : "수정"} 완료`}
            aria-describedby="form-instructions"
          >
            {isLoading || isSubmitting ? (
              <>
                <LoadingSpinner />
                {mode === "create" ? "작성 중..." : "수정 중..."}
              </>
            ) : mode === "create" ? (
              "작성 완료"
            ) : (
              "수정 완료"
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
