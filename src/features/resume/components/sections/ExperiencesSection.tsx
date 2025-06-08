import { UseFormWatch, UseFormRegister, Path } from "react-hook-form";
import { ResumeFormData } from "@/features/resume/validation/resumeSchema";
import Input from "@/features/resume/components/common/ui/Input";
import DatePickerField from "@/features/resume/components/common/ui/DatePicker";

interface ExperiencesSectionProps {
  fields: Record<"id", string>[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  watch: UseFormWatch<ResumeFormData>;
  register: UseFormRegister<ResumeFormData>;
  isEmpty: boolean;
}

export default function ExperiencesSection({
  fields,
  onAdd,
  onRemove,
  watch,
  register,
  isEmpty,
}: ExperiencesSectionProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold text-primary">경력 사항</h3>
      {isEmpty && (
        <p className="text-gray-500 text-sm">경력 사항이 없습니다. 경력을 추가해보세요.</p>
      )}
      {fields.map((field, idx) => (
        <div key={field.id} className="relative space-y-4 p-4 rounded-xl border bg-gray-50">
          <button
            type="button"
            onClick={() => onRemove(idx)}
            className="absolute top-4 right-4 text-red-500 border border-red-500 rounded-2xl px-2 text-sm hover:bg-red-50 transition-colors"
            aria-label={`${idx + 1}번째 경력 삭제`}
          >
            삭제
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name={`experiences.${idx}.company`} label="회사명" placeholder="회사명 입력" />
            <Input name={`experiences.${idx}.position`} label="직무" placeholder="직무 입력" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePickerField
              name={`experiences.${idx}.startDate`}
              label="근무 시작일"
              placeholder="YYYY-MM-DD"
            />
            <DatePickerField
              name={`experiences.${idx}.endDate`}
              label="근무 종료일"
              placeholder="YYYY-MM-DD"
              disabled={!!watch(`experiences.${idx}.isCurrent` as Path<ResumeFormData>)}
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register(`experiences.${idx}.isCurrent` as Path<ResumeFormData>)}
              className="w-5 h-5 accent-primary"
            />
            <span>현재 근무 중</span>
          </label>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="w-full h-16 border border-primary rounded-lg font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
        aria-label="경력 추가"
      >
        + 경력 추가하기
      </button>
    </section>
  );
}
