"use client";
import { useForm, FormProvider, useFieldArray, SubmitHandler } from "react-hook-form";
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
import { useState, useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

interface ResumeFormProps {
  mode: "create" | "edit";
  resumeId?: string;
  defaultValues?: ResumeFormData;
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{message}</div>
);

// API 응답 타입 정의
interface ResumeApiResponse {
  resume: {
    resume_id: string;
    [key: string]: unknown;
  };
}

// API 에러 타입 정의
interface ApiError {
  message?: string;
  [key: string]: unknown;
}

export default function ResumeForm({ mode, resumeId, defaultValues }: ResumeFormProps) {
  const router = useRouter();
  const params = useParams<{ type: string; userId: string }>();
  const qc = useQueryClient();

  // 에러 상태 관리
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 파라미터 검증 개선
  const isValidParams = useMemo(() => {
    return params?.type && params?.userId;
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
      name: "",
      phone: "",
      email: "",
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
    formState: { isSubmitting, errors },
    trigger,
  } = methods;

  const { createResume, isLoading: isCreating, error: createError } = useCreateResume();
  const { updateResume, isUpdating, error: updateError } = useUpdateResume();

  const {
    fields: expFields,
    append: addExperience,
    remove: removeExperience,
  } = useFieldArray({ control, name: "experiences" });

  const {
    fields: certFields,
    append: addCertification,
    remove: removeCertification,
  } = useFieldArray({ control, name: "certifications" });

  // watch 최적화
  const watchedValues = watch(["schoolType", "graduationStatus"]);
  const [selectedSchoolType, selectedGraduationStatus] = watchedValues;

  // 성공/실패 핸들러 개선
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

  // 폼 제출 로직 개선 - SubmitHandler 타입 사용
  const onSubmit: SubmitHandler<ResumeFormData> = useCallback(
    async (data: ResumeFormData) => {
      try {
        setSubmitError(null);

        // 클라이언트 사이드 검증
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

  // 경력 추가 최적화
  const handleAddExperience = useCallback(() => {
    addExperience({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
    });
  }, [addExperience]);

  // 자격증 추가 최적화
  const handleAddCertification = useCallback(() => {
    addCertification({
      name: "",
      issuer: "",
      date: "",
    });
  }, [addCertification]);

  // 경력 삭제 확인
  const handleRemoveExperience = useCallback(
    (index: number) => {
      if (confirm("이 경력을 삭제하시겠습니까?")) {
        removeExperience(index);
      }
    },
    [removeExperience],
  );

  // 자격증 삭제 확인
  const handleRemoveCertification = useCallback(
    (index: number) => {
      if (confirm("이 자격증을 삭제하시겠습니까?")) {
        removeCertification(index);
      }
    },
    [removeCertification],
  );

  const isLoading = mode === "create" ? isCreating : isUpdating;
  const apiError = mode === "create" ? createError : updateError;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-8">
        <div className="w-full max-w-[700px] space-y-6">
          {(submitError || apiError) && (
            <ErrorMessage message={submitError || apiError?.message || "오류가 발생했습니다."} />
          )}

          <section>
            <h3 className="text-xl font-semibold text-primary mb-4">직종</h3>
            <Input name="jobCategory" label="" placeholder="ex) 웹디자이너" aria-label="직종" />
          </section>

          <section>
            <h3 className="text-xl font-semibold text-primary mb-4">이력서 제목</h3>
            <Input
              name="title"
              label=""
              placeholder="이력서 제목을 입력하세요"
              aria-label="이력서 제목"
            />
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">기본 정보</h3>
            <Input label="이름" name="name" placeholder="홍길동" />
            <Input label="전화번호" name="phone" placeholder="010-1234-5678" type="tel" />
            <Input label="이메일" name="email" placeholder="이메일 입력" type="email" />
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">학력 사항</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CustomSelect
                label="학교 구분"
                value={selectedSchoolType}
                onChange={(val) =>
                  setValue("schoolType", val, { shouldValidate: true, shouldTouch: true })
                }
                options={[
                  { label: "고등학교", value: "고등학교" },
                  { label: "대학교(2,3년)", value: "대학교(2,3년)" },
                  { label: "대학교(4년)", value: "대학교(4년)" },
                  { label: "대학원", value: "대학원" },
                ]}
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
                options={[
                  { label: "졸업", value: "졸업" },
                  { label: "재학", value: "재학" },
                  { label: "중퇴", value: "중퇴" },
                  { label: "휴학", value: "휴학" },
                ]}
                error={errors.graduationStatus?.message}
                aria-label="졸업 상태"
              />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">경력 사항</h3>
            {expFields.length === 0 && (
              <p className="text-gray-500 text-sm">경력 사항이 없습니다. 경력을 추가해보세요.</p>
            )}
            {expFields.map((field, idx) => (
              <div key={field.id} className="relative space-y-4 p-4 rounded-xl border bg-gray-50">
                <button
                  type="button"
                  onClick={() => handleRemoveExperience(idx)}
                  className="absolute top-4 right-4 text-red-500 border border-red-500 rounded-2xl px-2 text-sm hover:bg-red-50 transition-colors"
                  aria-label={`${idx + 1}번째 경력 삭제`}
                >
                  삭제
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name={`experiences.${idx}.company`}
                    label="회사명"
                    placeholder="회사명 입력"
                  />
                  <Input
                    name={`experiences.${idx}.position`}
                    label="직무"
                    placeholder="직무 입력"
                  />
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
                    disabled={watch(`experiences.${idx}.isCurrent`)}
                  />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...methods.register(`experiences.${idx}.isCurrent`)}
                    className="w-5 h-5 accent-primary"
                  />
                  <span>현재 근무 중</span>
                </label>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddExperience}
              className="w-full h-16 border border-primary rounded-lg font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="경력 추가"
            >
              + 경력 추가하기
            </button>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">자격증</h3>
            {certFields.length === 0 && (
              <p className="text-gray-500 text-sm">자격증이 없습니다. 자격증을 추가해보세요.</p>
            )}
            {certFields.map((field, idx) => (
              <div key={field.id} className="relative space-y-4 p-4 rounded-xl border bg-gray-50">
                <button
                  type="button"
                  onClick={() => handleRemoveCertification(idx)}
                  className="absolute top-4 right-4 text-red-500 border border-red-500 rounded-2xl px-2 text-sm hover:bg-red-50 transition-colors"
                  aria-label={`${idx + 1}번째 자격증 삭제`}
                >
                  삭제
                </button>
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
            <button
              type="button"
              onClick={handleAddCertification}
              className="w-full h-16 border border-primary rounded-lg font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
              aria-label="자격증 추가"
            >
              + 자격증 추가하기
            </button>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">자기소개</h3>
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
