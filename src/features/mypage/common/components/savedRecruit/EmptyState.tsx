import { useRouter } from "next/navigation";
import { BookmarkPlus, ArrowRight } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { SAVED_RECRUIT_TEXT } from "@/features/mypage/common/constants/savedRecruit";

export default function EmptyState() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center px-12 py-24 mt-6 bg-white border border-gray-100 rounded-xl">
      <BookmarkPlus className="w-16 h-16 mb-6 text-gray-300" strokeWidth={1.5} />
      <Heading sizeOffset={2} className="mb-2 font-semibold text-gray-900">
        {SAVED_RECRUIT_TEXT.EMPTY.TITLE}
      </Heading>
      <p className="mb-6 text-gray-500">{SAVED_RECRUIT_TEXT.EMPTY.MESSAGE}</p>
      <button
        onClick={() => router.push("/jobs")}
        className="px-6 py-2.5 text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-1"
      >
        {SAVED_RECRUIT_TEXT.EMPTY.BUTTON}
        <ArrowRight className="w-5 h-5" strokeWidth={2} />
      </button>
    </div>
  );
}
