"use client";

import { UseFormRegister } from "react-hook-form";

interface CertificationCardProps {
  index: number;
  register: UseFormRegister<any>;
  onDelete: () => void;
}

const CertificationCard = ({ index, register, onDelete }: CertificationCardProps) => {
  return (
    <div className="p-4 mb-2 border rounded-md bg-gray-50">
      <input {...register(`certifications.${index}.name`)} placeholder="자격증명" />
      <input {...register(`certifications.${index}.issuer`)} placeholder="발급기관" />
      <input {...register(`certifications.${index}.date`)} type="date" />
      <button type="button" onClick={onDelete} className="mt-2 text-red-500">
        삭제
      </button>
    </div>
  );
};

export default CertificationCard;
