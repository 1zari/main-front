"use client";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
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

interface ResumeFormProps {
  mode: "create" | "edit";
  resumeId?: string;
  defaultValues?: ResumeFormData;
}

export default function ResumeForm({ mode, resumeId, defaultValues }: ResumeFormProps) {
  const router = useRouter();
  const params = useParams<{ type: string; userId: string }>();
  if (!params) {
    router.replace("/auth/login");
    return null;
  }
  const qc = useQueryClient();

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

  const selectedSchoolType = watch("schoolType");
  const selectedGraduationStatus = watch("graduationStatus");

  const onSubmit = (data: ResumeFormData) => {
    if (mode === "create") {
      const dto = mapToCreateDto(data);
      createResume(dto, {
        onSuccess: (res) => {
          const newId = res.resume.resume_id;
          qc.invalidateQueries({ queryKey: ["resumeList"] });
          qc.invalidateQueries({ queryKey: ["resumeDetail", newId] });
          router.push(`/${params.type}/mypage/${params.userId}/resume/${newId}`);
        },
        onError: (err) => console.error("이력서 생성 실패:", err.message),
      });
    } else {
      const dto = mapToUpdateDto(data, resumeId!);
      updateResume(
        { id: resumeId!, dto },
        {
          onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["resumeDetail", resumeId] });
            router.push(`/${params.type}/mypage/${params.userId}/resume/${resumeId}`);
          },
          onError: (err) => console.error("이력서 수정 실패:", err.message),
        },
      );
    }
  };

  const isLoading = mode === "create" ? isCreating : isUpdating;
  const error = mode === "create" ? createError : updateError;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-8">
        <div className="w-full max-w-[700px] space-y-6">
          {error && <div className="text-red-500">{error.message}</div>}

          <h3 className="text-xl font-semibold text-primary">직종</h3>
          <Input name="jobCategory" label="" placeholder="ex) 웹디자이너" />

          <h3 className="text-xl font-semibold text-primary">이력서 제목</h3>
          <Input name="title" label="" placeholder="이력서 제목을 입력하세요" />

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">기본 정보</h3>
            <Input label="이름" name="name" placeholder="홍길동" />
            <Input label="전화번호" name="phone" placeholder="010-1234-5678" />
            <Input label="이메일" name="email" placeholder="이메일 입력" />
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
              />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">경력 사항</h3>
            {expFields.map((field, idx) => (
              <div key={field.id} className="relative space-y-4 p-4 rounded-xl border bg-gray-50">
                <button
                  type="button"
                  onClick={() => removeExperience(idx)}
                  className="absolute top-4 right-4 text-red-500 border border-red-500 rounded-2xl px-2 text-sm"
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
                <label className="flex items-center gap-2">
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
              onClick={() =>
                addExperience({
                  company: "",
                  position: "",
                  startDate: "",
                  endDate: "",
                  isCurrent: false,
                })
              }
              className="w-full h-16 border border-primary rounded-lg font-semibold text-primary"
            >
              + 경력 추가하기
            </button>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">자격증</h3>
            {certFields.map((field, idx) => (
              <div key={field.id} className="relative space-y-4 p-4 rounded-xl border bg-gray-50">
                <button
                  type="button"
                  onClick={() => removeCertification(idx)}
                  className="absolute top-4 right-4 text-red-500 border border-red-500 rounded-2xl px-2 text-sm"
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
              onClick={() => addCertification({ name: "", issuer: "", date: "" })}
              className="w-full h-16 border border-primary rounded-lg font-semibold text-primary"
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
            />
          </section>

          <button
            type="submit"
            className="w-full h-[60px] rounded bg-primary font-semibold text-white hover:opacity-90 transition"
            disabled={isLoading || isSubmitting}
          >
            {isLoading
              ? mode === "create"
                ? "작성 중..."
                : "수정 중..."
              : mode === "create"
                ? "작성 완료"
                : "수정 완료"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
