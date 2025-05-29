import Input from "@/features/resume/components/common/ui/Input";
import DatePickerField from "@/features/resume/components/common/ui/DatePicker";

interface CertificationsSectionProps {
  fields: Record<"id", string>[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  isEmpty: boolean;
}

export default function CertificationsSection({
  fields,
  onAdd,
  onRemove,
  isEmpty,
}: CertificationsSectionProps) {
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold text-primary">자격증</h3>
      {isEmpty && (
        <p className="text-gray-500 text-sm">자격증이 없습니다. 자격증을 추가해보세요.</p>
      )}
      {fields.map((field, idx) => (
        <div key={field.id} className="relative space-y-4 p-4 rounded-xl border bg-gray-50">
          <button
            type="button"
            onClick={() => onRemove(idx)}
            className="absolute top-4 right-4 text-red-500 border border-red-500 rounded-2xl px-2 text-sm hover:bg-red-50 transition-colors"
            aria-label={`${idx + 1}번째 자격증 삭제`}
          >
            삭제
          </button>
          <Input
            name={`certifications.${idx}.name`}
            label="자격증명"
            placeholder="자격증명을 입력하세요"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name={`certifications.${idx}.issuer`}
              label="발급기관"
              placeholder="발급기관을 입력하세요"
            />
            <DatePickerField
              name={`certifications.${idx}.date`}
              label="취득일자"
              placeholder="YYYY-MM-DD"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="w-full h-16 border border-primary rounded-lg font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
        aria-label="자격증 추가"
      >
        + 자격증 추가하기
      </button>
    </section>
  );
}
