"use client";

import { useEffect, useState } from "react";

import FormTitle from "./FormTitle";
import InputPlace from "./WorkPlace";
import CheckDays from "./CheckWorkDay";
import WorkTime from "./WorkTime";
import PayType from "./Pay";
import TextArea from "./TextArea";
import Summary from "./Summary";
import Employee from "./Employee";
import Career from "./Career";
import Education from "./Education";
import Volume from "./Volume";
import Deadline from "./Deadline";
import Agreement from "./Agree";
import SelectJobs from "./JobCategories";
import SubmitButton from "./SubmitButton";
import DeleteModal from "./DelModal";

interface RecruitFormProps {
  mode: "new" | "edit";
  jobPostingId?: string;
}

const RecruitForm = ({ mode, jobPostingId }: RecruitFormProps) => {
  const [title, setTitle] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [workDays, setWorkDays] = useState<string[]>([]);
  const [workStartTime, setWorkStartTime] = useState("");
  const [workEndTime, setWorkEndTime] = useState("");
  const [workTimeNegotiable, setWorkTimeNegotiable] = useState(false);
  const [payType, setPayType] = useState("");
  const [textArea, setTextArea] = useState("");
  const [summary, setSummary] = useState("");
  const [employee, setEmployee] = useState("");
  const [career, setCareer] = useState("");
  const [education, setEducation] = useState("");
  const [volume, setVolume] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [selectJobs, setSelectJobs] = useState<string[]>([]);

  const [showDelModal, setShowDelModal] = useState(false);

  useEffect(() => {
    if (mode === "edit") {
    }
  }, [mode]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      공고제목: title,
      근무지: workPlace,
      근무요일: workDays,
      근무시간: workTimeNegotiable ? "협의 가능" : `${workStartTime} ~ ${workEndTime}`,
      급여형태: payType,
      상세내용: textArea,
      요약내용: summary,
      고용형태: employee,
      경력: career,
      학력: education,
      모집인원: volume,
      마감일: deadline,
      직종: selectJobs,
    };

    if (mode === "new") {
      console.log("신규공고등록:", formData);
    } else {
      console.log("공고수정:", formData);
    }
  };
  const handleDelete = () => {
    console.log("공고 삭제 요청");
    setShowDelModal(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <FormTitle value={title} onChange={setTitle} />
        </div>

        <div className="mt-5">
          <label className="text-lg text-[#0F8C3B] font-bold">
            공고 기본 정보
          </label>

          <div className="mt-5">
            <InputPlace value={workPlace} onChange={setWorkPlace} />
          </div>

          <div className="mt-2 flex items-center justify-between">
            <PayType value={payType} onChange={setPayType} />
            <Employee value={employee} onChange={setEmployee} />
          </div>

          <div className="mt-2 flex items-center justify-between">
            <Career value={career} onChange={setCareer} />
            <Education value={education} onChange={setEducation} />
          </div>

          <div className="mt-2">
            <SelectJobs value={selectJobs} onChange={setSelectJobs} />
          </div>

          <div className="mt-2 flex items-center justify-between">
            <WorkTime
              valueStart={workStartTime}
              valueEnd={workEndTime}
              negotiable={workTimeNegotiable}
              onChangeStart={setWorkStartTime}
              onChangeEnd={setWorkEndTime}
              onChangeNegotiable={setWorkTimeNegotiable}
            />
            <CheckDays value={workDays} onChange={setWorkDays} />
          </div>

          <div className="mt-2 flex items-center justify-between">
            <Volume value={volume} onChange={setVolume} />
            <Deadline value={deadline} onChange={setDeadline} />
          </div>

          <div>
            <Summary value={summary} onChange={setSummary} />
          </div>

          <div className="mt-5">
            <TextArea value={textArea} onChange={setTextArea} />
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
            <SubmitButton
              disabled={
                !title ||
                !workPlace ||
                !workDays.length ||
                (!workTimeNegotiable && (!workStartTime || !workEndTime)) ||
                !payType ||
                !textArea ||
                !summary ||
                !employee ||
                !career ||
                !education ||
                !volume ||
                !deadline ||
                !selectJobs.length
              } mode={mode}
            />
          </div>
        </div>
      </form>

      <DeleteModal
        isOpen={showDelModal}
        onClose={() => setShowDelModal(false)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default RecruitForm;