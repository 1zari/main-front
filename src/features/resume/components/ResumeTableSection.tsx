import { Heading } from "@/components/ui/Heading";

interface sectionItems {
  label: string;
  value: string;
}

interface ResumeSectionProps {
  sectionTitle: string;
  items: sectionItems[];
}

export default function ResumeTableSection({ sectionTitle, items }: ResumeSectionProps) {
  return (
    <div className="flex flex-col justify-start pb-2 items-start">
      <Heading sizeOffset={2} className="font-bold text-primary min-w-30 pb-2 w-full mb-2">
        {sectionTitle}
      </Heading>
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-y-3 mb-3">
          <div className="flex flex-wrap font-bold">
            <span className="min-w-25 font-normal">{item.label}</span>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
