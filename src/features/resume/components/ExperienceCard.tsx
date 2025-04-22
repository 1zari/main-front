"use client";

import { UseFormRegister, UseFormGetValues } from "react-hook-form";

interface ExperienceCardProps {
  index: number;
  register: UseFormRegister<any>;
  onDelete: () => void;
}

const ExperienceCard = ({ index, register, onDelete }: ExperienceCardProps) => {
  return (
    <div className="p-4 mb-2 border rounded-md bg-gray-50">
      <input {...register(`experiences.${index}.company`)} placeholder="회사명" />
      <input {...register(`experiences.${index}.position`)} placeholder="직무" />
      <input {...register(`experiences.${index}.startDate`)} type="date" />
      <input {...register(`experiences.${index}.endDate`)} type="date" />
      <label>
        <input type="checkbox" {...register(`experiences.${index}.isCurrent`)} />
        현재 재직중
      </label>
      <button type="button" onClick={onDelete} className="mt-2 text-red-500">삭제</button>
    </div>
  );
};

export default ExperienceCard;
