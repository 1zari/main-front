// CertificationCard.tsx

import { UseFormRegister } from "react-hook-form";
import ResumeDateInput from "./common/ResumeDateInput";
import ResumeInput from "./common/ResumeInput";

interface CertificationCardProps {
  index: number;
  register: UseFormRegister<any>;
  onDelete: () => void;
}

const CertificationCard = ({ index, register, onDelete }: CertificationCardProps) => {
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
          label="자격증명"
          name={`certifications.${index}.name`}
          register={register}
          width="w-1/2"
        />
        <ResumeInput
          label="발급기관"
          name={`certifications.${index}.issuer`}
          register={register}
          width="w-1/2"
        />
      </div>
      <ResumeDateInput
        label="취득일"
        name={`certifications.${index}.date`}
        register={register}
        width="w-full"
      />
    </div>
  );
};
export default CertificationCard;
