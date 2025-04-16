"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recruitFormSchema, RecruitFormSchema } from "../schemas/recruitSchema";
import FormInput from "./common/FormInput";
import FormSelect from "./common/FormSelect";
import DeleteModal from "./DelModal";
import SubmitButton from "./SubmitButton";
import FormNumberInput from "./common/FormInputNumber";
import Agreement from "./TermsAgreementField";

import CheckDays from "./CheckWorkDay";
import WorkTime from "./WorkTime";

import TextArea from "./TextArea";

import Deadline from "./Deadline";

import SelectJobs from "./JobCategories";

interface RecruitFormProps {
  mode: "new" | "edit";
  jobPostingId?: string;
}

const RecruitForm = ({ mode, jobPostingId }: RecruitFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecruitFormSchema>({
    resolver: zodResolver(recruitFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: RecruitFormSchema) => {
    console.log("제출 데이터", data);
  };

  const handleDelete = () => {
    console.log("삭제 요청");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-lg text-[#0F8C3B] font-bold">공고 제목</label>
          <FormInput
            label=""
            name="title"
            register={register}
            error={errors.title}
            width="w-full"
            labelWidth="w-0"
            placeholder="공고 제목을 50자 이내로 입력해주세요."
          />
        </div>
        <div className="mt-5">
          <label className="text-lg text-[#0F8C3B] font-bold">공고 기본 정보</label>
          <div className="mt-5">
            <FormInput
              label="근무지"
              name="workPlace"
              register={register}
              width="w-full"
              placeholder="근무지를 입력해주세요."
            />
          </div>

          <div className="mt-2 flex items-center justify-between">
            <div className="flex">
              <FormSelect
                label="급여"
                name="payType"
                register={register}
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
                register={register}
                control={control}
                labelWidth="w-1"
                unit="원"
              />
            </div>

            <FormSelect
              label="고용 형태"
              name="employeeType"
              register={register}
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
              register={register}
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
              register={register}
              options={[
                { value: "고졸", label: "고졸" },
                { value: "대졸", label: "대졸" },
                { value: "무관", label: "무관" },
              ]}
              error={errors.educationType}
              selectWidth="w-50"
            />
          </div>

          <div className="mt-2">{/* <SelectJobs /> */}</div>

          <div className="mt-2 flex items-center justify-between">
            {/* <WorkTime
              valueStart={workStartTime}
              valueEnd={workEndTime}
              negotiable={workTimeNegotiable}
              onChangeStart={setWorkStartTime}
              onChangeEnd={setWorkEndTime}
              onChangeNegotiable={setWorkTimeNegotiable}
            />
            <CheckDays value={workDays} onChange={setWorkDays} /> */}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <FormNumberInput
              label="모집인원"
              name="volumeInput"
              register={register}
              control={control}
              labelWidth="w-16"
              unit="명"
            />
            {/* <Volume value={volume} onChange={setVolume} /> */}
            {/* <Deadline value={deadline} onChange={setDeadline} /> */}
          </div>

          <div>
            <div className="mt-5">
              <FormInput
                label="근무 요약"
                name="summary"
                register={register}
                error={errors.workPlace}
                width="w-full"
                placeholder="근무 요약을 50자 이내로 입력해주세요."
              />
            </div>

            <div className="mt-5">{/* <TextArea value={textArea} onChange={setTextArea} /> */}</div>

            <Agreement />

            <div className="mt-5 flex justify-between items-center">
              {mode === "edit" && (
                <button
                  type="button"
                  // onClick={() => setShowDelModal(true)}
                  className="text-sm text-red-500 underline hover:text-red-700"
                >
                  공고 삭제하기
                </button>
              )}
              {/* <SubmitButton
              // disabled={
              //   !title ||
              //   !workPlace ||
              //   !workDays.length ||
              //   (!workTimeNegotiable && (!workStartTime || !workEndTime)) ||
              //   !payType ||
              //   !summary ||
              //   !employee ||
              //   !career ||
              //   !education ||
              //   !volume ||
              //   !deadline ||
              //   !selectJobs.length
              // }
              mode={mode}
            /> */}
            </div>
          </div>
        </div>
      </form>

      {/* <DeleteModal
        isOpen={showDelModal}
        onClose={() => setShowDelModal(false)}
        onDelete={handleDelete}
      /> */}
    </div>
  );
};

export default RecruitForm;
