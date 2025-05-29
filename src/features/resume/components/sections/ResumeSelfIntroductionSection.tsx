import { Heading } from "@/components/ui/Heading";

interface ResumeSelfIntroductionSectionProps {
  title: string;
  content: string;
}

export default function ResumeSelfIntroductionSection({
  title,
  content,
}: ResumeSelfIntroductionSectionProps) {
  return (
    <>
      <div className="flex flex-col justify-start pb-2  items-start">
        <Heading sizeOffset={2} className="font-semibold text-primary min-w-30 pb-2 w-full mb-2">
          {title}
        </Heading>
        <span>{content}</span>
      </div>
    </>
  );
}
