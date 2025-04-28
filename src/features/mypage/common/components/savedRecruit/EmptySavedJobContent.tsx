import { useRouter } from "next/navigation";
import { BookmarkPlus, ArrowRight } from "lucide-react";
import { Heading } from "@/components/ui/Heading";

export default function EmptySavedJobContent() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center px-12 py-24 mt-6 bg-white border border-gray-100 rounded-xl">
      <BookmarkPlus className="w-16 h-16 mb-6 text-gray-300" strokeWidth={1.5} />
      <Heading sizeOffset={2} className="mb-2 font-semibold text-gray-900">
        저장한 공고가 없습니다
      </Heading>
      <p className="mb-6 text-gray-500">관심있는 공고를 저장하고 모아보세요!</p>
      <button
        onClick={() => router.push("/jobs")}
        className="px-6 py-2.5 text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-1"
      >
        채용공고 보러가기
        <ArrowRight className="w-5 h-5" strokeWidth={2} />
      </button>
    </div>
  );
}
