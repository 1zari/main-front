"use client";
import { useRouter } from "next/navigation";

type Props = {
  resumeId: string;
};

const ResumeActionButtons = ({ resumeId }: Props) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/user/mypage/123/resume/${resumeId}/edit`);
  };

  const handleDelete = () => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (confirmed) {
      alert("삭제 요청이 완료되었습니다.");
    }
  };

  return (
    <div className="mt-10 flex gap-4 w-full">
      <button
        onClick={handleEdit}
        className="w-1/2 px-5 py-[18px] rounded-md bg-gray-400 text-white hover:bg-gray-500 transition"
      >
        수정하기
      </button>
      <button
        onClick={handleDelete}
        className="w-1/2 px-5 py-[18px] rounded-md bg-primary text-white hover:bg-primary/90 transition"
      >
        삭제하기
      </button>
    </div>
  );
};

export default ResumeActionButtons;
