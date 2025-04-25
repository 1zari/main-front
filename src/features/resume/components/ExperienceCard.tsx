import { Control, FieldValues, UseFormRegister, useWatch } from "react-hook-form";
import ResumeCheckbox from "./common/ResumeCheckbox";
import ResumeDateInput from "./common/ResumeDateInput";
import ResumeInput from "./common/ResumeInput";

interface ExperienceCardProps {
  index: number;
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
  onDelete: () => void;
}

const ExperienceCard = ({ index, register, control, onDelete }: ExperienceCardProps) => {
  const isCurrent = useWatch({ control, name: `experiences.${index}.isCurrent` });

  return (
    <div className="relative p-4 border rounded-lg bg-gray-50">
      <button
        type="button"
        className="absolute font-bold text-red-500 top-2 right-2"
        onClick={onDelete}
      >
        삭제
      </button>
      <div className="flex gap-2 mb-2">
        <ResumeInput
          label="회사명"
          name={`experiences.${index}.company`}
          register={register}
          width="w-1/2"
        />
        <ResumeInput
          label="직책"
          name={`experiences.${index}.position`}
          register={register}
          width="w-1/2"
        />
      </div>
      <div className="flex gap-2 mb-2">
        <ResumeDateInput
          label="입사일"
          name={`experiences.${index}.startDate`}
          register={register}
          width="w-1/2"
        />
        <ResumeDateInput
          label="퇴사일"
          name={`experiences.${index}.endDate`}
          register={register}
          width="w-1/2"
          disabled={isCurrent}
        />
      </div>
      <ResumeCheckbox label="재직중" name={`experiences.${index}.isCurrent`} register={register} />
    </div>
  );
};
export default ExperienceCard;
