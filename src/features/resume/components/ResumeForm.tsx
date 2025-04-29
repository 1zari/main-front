"use client";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema, ResumeFormData } from "@/features/resume/validation/resumeSchema";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Input from "@/features/resume/components/common/ui/Input";
import TextArea from "@/features/resume/components/common/ui/TextArea";
import DatePickerField from "@/features/resume/components/common/ui/DatePicker";
import CustomSelect from "@/features/resume/components/common/ui/Select";

interface ResumeFormProps {
  mode: "create" | "edit";
  resumeId?: string;
}

const ResumeForm = ({ mode, resumeId }: ResumeFormProps) => {
  const router = useRouter();

  const methods = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      name: "",
      phone: "",
      email: "",
      emailDomain: "@gmail.com",
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
    reset,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  const selectedSchoolType = watch("schoolType");
  const selectedGraduationStatus = watch("graduationStatus");

  const {
    fields: expFields,
    append: addExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experiences",
  });

  const {
    fields: certFields,
    append: addCertification,
    remove: removeCertification,
  } = useFieldArray({
    control,
    name: "certifications",
  });

  useEffect(() => {
    if (mode === "edit" && resumeId) {
      const fetchResume = async () => {
        const mockData: ResumeFormData = {
          title: "기존 이력서 제목",
          name: "홍길동",
          phone: "010-1234-5678",
          email: "gildong",
          emailDomain: "@gmail.com",
          schoolType: "대학교(4년)",
          schoolName: "서울대학교",
          graduationStatus: "졸업",
          experiences: [],
          certifications: [],
          introduction: "자기소개 내용입니다.",
        };
        reset(mockData);
      };
      fetchResume();
    }
  }, [mode, resumeId, reset]);

  const onSubmit = async (data: ResumeFormData) => {
    try {
      console.log("폼 제출 데이터:", data);
      if (mode === "create") {
        // 작성 API 호출
      } else {
        // 수정 API 호출
      }
      router.push("/resume");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-8">
        <div className="w-full max-w-[700px] space-y-6">
          <h3 className="text-xl font-semibold text-primary">이력서 제목</h3>
          <Input label="" name="title" placeholder="이력서 제목을 입력하세요" />

          <hr className="my-10" />

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">기본 정보</h3>
            <Input label="이름" name="name" placeholder="홍길동" />
            <Input label="전화번호" name="phone" placeholder="010-1234-5678" />
            <Input label="이메일" name="email" placeholder="이메일 입력" />
          </section>

          <hr className="my-10" />

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">학력 사항</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <CustomSelect
                label="학교 구분"
                placeholder="학교 구분을 선택하세요"
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
                error={errors.schoolType?.message as string}
              />
              <Input label="학교명" name="schoolName" placeholder="학교명을 입력하세요" />
              <CustomSelect
                label="졸업 상태"
                placeholder="졸업 상태를 선택하세요"
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
                error={errors.graduationStatus?.message as string}
              />
            </div>
          </section>

          <hr className="my-10" />

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">경력 사항</h3>
            {expFields.map((field, index) => (
              <div key={field.id} className="relative space-y-4 p-4 rounded-xl border bg-gray-50">
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="absolute top-4 right-4 font-semibold text-sm rounded-2xl border border-red-500 pl-2 pr-2 text-red-500"
                >
                  삭제 하기
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="회사명"
                    name={`experiences.${index}.company`}
                    placeholder="회사명을 입력하세요"
                  />
                  <Input
                    label="직무"
                    name={`experiences.${index}.position`}
                    placeholder="직무를 입력하세요"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DatePickerField
                    label="근무 시작일"
                    name={`experiences.${index}.startDate`}
                    placeholder="YYYY-MM-DD"
                  />
                  <DatePickerField
                    label="근무 종료일"
                    name={`experiences.${index}.endDate`}
                    placeholder="YYYY-MM-DD"
                    disabled={methods.watch(`experiences.${index}.isCurrent`)}
                    className={
                      methods.watch(`experiences.${index}.isCurrent`)
                        ? "bg-gray-100 cursor-not-allowed"
                        : ""
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    {...methods.register(`experiences.${index}.isCurrent`)}
                    id={`experiences.${index}.isCurrent`}
                  />
                  <label htmlFor={`experiences.${index}.isCurrent`}>현재 근무 중</label>
                </div>
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
              className="w-full h-16 border border-primary text-primary rounded-lg font-semibold"
            >
              + 경력 추가하기
            </button>
          </section>

          <hr className="my-10" />

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">자격증</h3>
            {certFields.map((field, index) => (
              <div key={field.id} className="relative space-y-4 p-4 rounded-xl border bg-gray-50">
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="absolute top-4 right-4 font-semibold rounded-2xl text-sm border border-red-500 pl-2 pr-2 text-red-500 hover:text-red-600"
                >
                  삭제 하기
                </button>
                <Input
                  label="자격증명"
                  name={`certifications.${index}.name`}
                  placeholder="자격증명을 입력하세요"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="발급기관"
                    name={`certifications.${index}.issuer`}
                    placeholder="발급기관을 입력하세요"
                  />
                  <DatePickerField
                    label="취득일자"
                    name={`certifications.${index}.date`}
                    placeholder="YYYY-MM-DD"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addCertification({ name: "", issuer: "", date: "" })}
              className="w-full h-16 border border-primary text-primary rounded-lg font-semibold"
            >
              + 자격증 추가하기
            </button>
          </section>

          <hr className="my-10" />

          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">자기소개</h3>
            <TextArea name="introduction" placeholder="본인을 소개해주세요 (최대 500자)" label="" />
          </section>

          <button
            type="submit"
            className="w-full h-[60px] font-semibold rounded bg-primary text-white hover:opacity-90 transition"
            disabled={isSubmitting}
          >
            {mode === "create" ? "작성 완료" : "수정 완료"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ResumeForm;
