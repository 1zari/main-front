"use client";

import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import CertificationCard from "./CertificationCard";
import ResumeTextArea from "./common/IntroduceTextArea";
import ResumeInput from "./common/ResumeInput";
import ResumeSelect from "./common/ResumeSelect";
import ExperienceCard from "./ExperienceCard";
import ResumeTitle from "./ResumeTitle";

export type Experience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
};

export type ResumeFormValues = {
  resumeTitle: string;
  name: string;
  phone: string;
  email: string;
  emailDomain: string;
  schoolType: string;
  schoolName: string;
  graduationStatus: string;
  experiences: Experience[];
  certifications: Certification[];
  introduction: string;
};

type ResumeFormProps = {
  mode: "new" | "edit";
  resumeId: string;
  defaultValues?: Partial<ResumeFormValues>;
};

const ResumeForm = ({ mode }: ResumeFormProps) => {
  const methods = useForm<ResumeFormValues>({
    defaultValues: {
      resumeTitle: "",
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

  const { control, watch, setValue, handleSubmit, register } = methods;

  const {
    fields: expFields,
    append: addExp,
    remove: removeExp,
  } = useFieldArray({ control, name: "experiences" });

  const {
    fields: certFields,
    append: addCert,
    remove: removeCert,
  } = useFieldArray({ control, name: "certifications" });

  const [customEmail, setCustomEmail] = useState("");
  const emailDomain = watch("emailDomain");
  const fullEmail = watch("email") + (emailDomain === "직접입력" ? `@${customEmail}` : emailDomain);

  const onSubmit = (data) => {
    alert(JSON.stringify({ ...data, email: fullEmail }, null, 2));
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg p-8 mx-auto rounded-lg shadow bg-gray-50"
      >
        {/* 이력서 제목 */}
        <div className="mb-8">
          <ResumeTitle value={watch("resumeTitle")} onChange={(v) => setValue("resumeTitle", v)} />
        </div>

        {/* 기본 정보 */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[#0F8C3B]">
            기본 정보 <span className="text-red-500">*</span>
          </h2>
          <div className="flex gap-4 mb-2">
            <ResumeInput label="이름" name="name" register={register} required width="w-1/2" />
            <ResumeInput
              label="연락처"
              name="phone"
              register={register}
              required
              width="w-1/2"
              placeholder="010-1234-5678"
            />
          </div>
          <div className="flex gap-2 mb-2">
            <ResumeInput
              label="이메일"
              name="email"
              register={register}
              required
              width="w-2/3"
              placeholder="이메일 입력"
            />
            <ResumeSelect
              label=""
              name="emailDomain"
              register={register}
              options={[
                { value: "@gmail.com", label: "@gmail.com" },
                { value: "@naver.com", label: "@naver.com" },
                { value: "직접입력", label: "직접입력" },
              ]}
              width="w-1/3"
              className="mt-10"
            />
          </div>
          {emailDomain === "직접입력" && (
            <input
              className="w-full px-2 py-1 mt-2 border rounded"
              value={customEmail}
              onChange={(e) => setCustomEmail(e.target.value)}
              placeholder="도메인 직접 입력"
            />
          )}
        </section>

        {/* 학력 사항 */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[#0F8C3B]">
            학력 사항 <span className="text-red-500">*</span>
          </h2>
          <div className="flex gap-2 mb-2">
            <ResumeSelect
              label="학교 구분"
              name="schoolType"
              register={register}
              options={[
                { value: "고등학교", label: "고등학교" },
                { value: "대학교(2,3년)", label: "대학교(2,3년)" },
                { value: "대학교(4년)", label: "대학교(4년)" },
                { value: "대학원", label: "대학원" },
              ]}
              width="w-1/3"
            />
            <ResumeInput
              label="학교명"
              name="schoolName"
              placeholder=""
              register={register}
              width="w-1/3"
            />
            <ResumeSelect
              label="졸업상태"
              name="graduationStatus"
              register={register}
              options={[
                { value: "졸업", label: "졸업" },
                { value: "재학", label: "재학" },
                { value: "중퇴", label: "중퇴" },
                { value: "휴학", label: "휴학" },
              ]}
              width="w-1/3"
            />
          </div>
        </section>

        {/* 경력 사항 */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#0F8C3B]">경력 사항</h2>
            <button
              type="button"
              onClick={() =>
                addExp({
                  company: "",
                  position: "",
                  startDate: "",
                  endDate: "",
                  isCurrent: false,
                })
              }
              className="font-semibold text-[#0F8C3B]"
            >
              + 추가하기
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {expFields.map((field, index) => (
              <ExperienceCard
                key={field.id}
                index={index}
                register={register}
                control={control}
                onDelete={() => removeExp(index)}
              />
            ))}
          </div>
        </section>

        {/* 자격증 */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#0F8C3B]">자격증</h2>
            <button
              type="button"
              onClick={() => addCert({ name: "", issuer: "", date: "" })}
              className="font-semibold text-[#0F8C3B]"
            >
              + 추가하기
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {certFields.map((field, index) => (
              <CertificationCard
                key={field.id}
                index={index}
                register={register}
                onDelete={() => removeCert(index)}
              />
            ))}
          </div>
        </section>

        {/* 자기소개 */}
        <section className="mb-8">
          <ResumeTextArea />
        </section>

        {/* 저장 버튼 */}
        <button
          type="submit"
          className="w-full py-3 mt-4 font-bold text-white bg-[#0F8C3B] rounded"
        >
          {mode === "edit" ? "수정하기" : "저장하기"}
        </button>
      </form>
    </FormProvider>
  );
};

export default ResumeForm;
