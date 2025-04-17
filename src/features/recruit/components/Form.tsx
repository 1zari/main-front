"use client";

import { useEffect } from "react";

import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { recruitFormSchema, RecruitFormSchema } from "../schemas/recruitSchema";
import FormInput from "./common/FormInput";
import FormSelect from "./common/FormSelect";
import DeleteModal from "./DelModal";
import SubmitButton from "./SubmitButton";
import FormNumberInput from "./common/FormInputNumber";
import Agreement from "./TermsAgreementField";
import WorkTime from "./WorkTime";
import CheckDays from "./CheckWorkDay";
import TextArea from "./common/TextArea";
import Deadline from "./DeadlineDatePicker";
import SelectJobs from "./JobCategories";
import { useRecruitForm } from "../hooks/useRecruitForm";

interface RecruitFormProps {
  mode: "new" | "edit";
  jobPostingId?: string;
}

const RecruitForm = ({ mode, jobPostingId }: RecruitFormProps) => {
  const [showDelModal, setShowDelModal] = useState(false);

  const methods = useRecruitForm();

  const {
    handleSubmit,
    formState: { errors, isValid },
  } = methods;


  const onSubmit = (data: RecruitFormSchema) => {
    console.log("제출 데이터", data);
  };

  const handleDelete = () => {
    console.log("삭제 요청");
    setShowDelModal(false);
  };

  return (
    <FormProvider {...methods}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-lg text-[#0F8C3B] font-bold">공고 제목</label>
            <div className="mt-2">
              <FormInput
                label=""
                name="title"
                register={methods.register}
                error={errors.title}
                width="w-full"
                labelWidth="w-0"
                placeholder="공고 제목을 50자 이내로 입력해주세요."
              />
            </div>
          </div>
          <div className="mt-5">
            <label className="text-lg text-[#0F8C3B] font-bold">공고 기본 정보</label>
            <div className="mt-5">
              <FormInput
                label="근무지"
                name="workPlace"
                register={methods.register}
                width="w-full"
                placeholder="근무지를 입력해주세요."
              />
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex">
                <FormSelect
                  label="급여"
                  name="payType"
                  register={methods.register}
                  options={[
                    { value: "시급", label: "시급" },
                    { value: "일급", label: "일급" },
                    { value: "월급", label: "월급" },
                  ]}
                  selectWidth="w-18"
                />
                <FormNumberInput
                  label=""
                  name="payAmount"
                  register={methods.register}
                  control={methods.control}
                  labelWidth="w-1"
                  unit="원"
                />
              </div>

              <FormSelect
                label="고용 형태"
                name="employeeType"
                register={methods.register}
                options={[
                  { value: "정규직", label: "정규직" },
                  { value: "계약직", label: "계약직" },
                ]}
                error={errors.employeeType}
                selectWidth="w-50"
              />
            </div>

            <div className="mt-2 flex items-center justify-between">
              <FormSelect
                label="경력 여부"
                name="careerType"
                register={methods.register}
                options={[
                  { value: "경력무관", label: "경력무관" },
                  { value: "경력직", label: "경력직" },
                ]}
                error={errors.careerType}
                selectWidth="w-50"
              />
              <FormSelect
                label="학력"
                name="educationType"
                register={methods.register}
                options={[
                  { value: "고졸", label: "고졸" },
                  { value: "대졸", label: "대졸" },
                  { value: "무관", label: "무관" },
                ]}
                error={errors.educationType}
                selectWidth="w-50"
              />
            </div>

            <div className="mt-2">
              <SelectJobs />
            </div>

            <div className="mt-2 flex items-center justify-between">
              <WorkTime />
              <CheckDays />
            </div>

            <div className="mt-2 flex items-center justify-between">
              <FormNumberInput
                label="모집인원"
                name="volume"
                register={methods.register}
                control={methods.control}
                labelWidth="w-16"
                inputWidth="w-50"
                unit="명"
              />
              <Deadline />
            </div>

            <div>
              <div className="mt-2">
                <FormInput
                  label="근무 요약"
                  name="summary"
                  register={methods.register}
                  error={errors.summary}
                  width="w-full"
                  placeholder="근무 요약을 50자 이내로 입력해주세요."
                />
              </div>

              <div className="mt-5">
                <TextArea />
              </div>

              <Agreement />

              <div className="mt-5 flex justify-between items-center">
                {mode === "edit" && (
                  <button
                    type="button"
                    onClick={() => setShowDelModal(true)}
                    className="text-sm text-red-500 underline hover:text-red-700"
                  >
                    공고 삭제하기
                  </button>
                )}
                <SubmitButton mode={mode} disabled={!isValid} />
              </div>
            </div>
          </div>
        </form>

        {mode === "edit" && (
          <DeleteModal
            isOpen={showDelModal}
            onClose={() => setShowDelModal(false)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </FormProvider>
  );
};

export default RecruitForm;
