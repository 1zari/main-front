"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeFormSchema, ResumeFormSchema } from "../schema/resumeSchema";

import ResumeInput from "./common/ResumeInput";
import ResumeSelect from "./common/ResumeSelect";
import ExperienceCard from "./ExperienceCard";
import CertificationCard from "./CertificationCard";

const ResumeForm = () => {
  const { register, handleSubmit, control } = useForm<ResumeFormSchema>({
    resolver: zodResolver(resumeFormSchema),
    mode: "onChange",
    defaultValues: {
      experiences: [],
      certifications: [],
    },
  });

  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({ control, name: "experiences" });

  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({ control, name: "certifications" });

  const onSubmit = (data: ResumeFormSchema) => {
    console.log("제출 데이터:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ResumeSelect
        label="직종 카테고리"
        name="category"
        options={[
          { value: "", label: "선택하세요" },
          { value: "서비스", label: "서비스" },
        ]}
        register={register}
      />
      <ResumeInput label="이력서 제목" name="title" register={register} />

      <div className="flex gap-2">
        <ResumeInput label="이름" name="name" register={register} />
        <ResumeInput label="연락처" name="phone" register={register} />
      </div>

      <div className="flex gap-2">
        <ResumeInput label="이메일" name="email" register={register} />
        <ResumeSelect
          label=""
          name="emailDomain"
          options={[
            { value: "@naver.com", label: "@naver.com" },
            { value: "@gmail.com", label: "@gmail.com" },
            { value: "@daum.net", label: "@daum.net" },
          ]}
          register={register}
        />
      </div>

      <div className="flex gap-2">
        <ResumeSelect
          label="학교 구분"
          name="schoolType"
          options={[
            { value: "고등학교", label: "고등학교" },
            { value: "대학교", label: "대학교" },
          ]}
          register={register}
        />
        <ResumeInput label="학교명" name="schoolName" register={register} />
        <ResumeSelect
          label="졸업 상태"
          name="graduateStatus"
          options={[
            { value: "졸업", label: "졸업" },
            { value: "재학", label: "재학" },
            { value: "중퇴", label: "중퇴" },
          ]}
          register={register}
        />
      </div>

      {/* 경력 사항 */}
      <div>
        <label className="font-bold text-[#0F8C3B] text-sm">경력 사항</label>
        {expFields.map((field, idx) => (
          <ExperienceCard
            key={field.id}
            index={idx}
            register={register}
            onDelete={() => removeExp(idx)}
          />
        ))}
        <button
          type="button"
          onClick={() =>
            appendExp({ company: "", position: "", startDate: "", endDate: "", isCurrent: false })
          }
          className="text-sm text-[#0F8C3B] mt-1"
        >
          + 경력 추가
        </button>
      </div>

      {/* 자격증 */}
      <div>
        <label className="font-bold text-[#0F8C3B] text-sm">자격증</label>
        {certFields.map((field, idx) => (
          <CertificationCard
            key={field.id}
            index={idx}
            register={register}
            onDelete={() => removeCert(idx)}
          />
        ))}
        <button
          type="button"
          onClick={() => appendCert({ name: "", issuer: "", date: "" })}
          className="text-sm text-[#0F8C3B] mt-1"
        >
          + 자격증 추가
        </button>
      </div>

      {/* 자기소개 */}
      <textarea
        {...register("summary")}
        rows={5}
        placeholder="자기소개를 입력하세요"
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F8C3B]"
      />

      <button type="submit" className="w-full bg-[#0F8C3B] text-white py-2 rounded-md">
        저장하기
      </button>
    </form>
  );
};

export default ResumeForm;
