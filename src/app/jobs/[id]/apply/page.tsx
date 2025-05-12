"use client";
import { applyApi } from "@/api/apply";
import { resumeApi } from "@/api/resume";
import { Heading } from "@/components/ui/Heading";
import ResumeContainer from "@/features/resume/components/ResumeContainer";
import { mapToResumeFormData } from "@/features/resume/utils/mapToResumeFormData";
import { ResumeFormData } from "@/features/resume/validation/resumeSchema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaAngleDown, FaChevronLeft } from "react-icons/fa";

export default function ApplyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const accessToken = session?.accessToken || "";
  const { data: resumes = [] } = useQuery({
    queryKey: ["resumeList"],
    queryFn: () => resumeApi.getList(accessToken).then((res) => res.resume_list),
    enabled: !!accessToken,
  });
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [resume, setResume] = useState<ResumeFormData | null>(null);

  const params = useParams();
  const jobPostingId = params.id as string;

  const mutation = useMutation({
    mutationFn: () =>
      applyApi.getApplicant({
        job_posting_id: jobPostingId,
        resume_id: selectedResumeId,
      }),
    onSuccess: (res) => {
      console.log("지원 성공:", res);
    },
    onError: (err) => {
      console.error("지원 실패:", err);
    },
  });

  useEffect(() => {
    if (resumes.length > 0) {
      setSelectedResumeId(resumes[0]?.resume_id || "");
    }
  }, [resumes]);

  useEffect(() => {
    if (selectedResumeId && session?.user.email) {
      resumeApi.getDetail(selectedResumeId, accessToken).then((res) => {
        setResume(mapToResumeFormData(res.resume, session.user.email ?? ""));
      });
    }
  }, [selectedResumeId, accessToken, session?.user.email]);

  return (
    <>
      <nav className="bg-white text-black sticky top-0 z-10">
        <ul className="w-full max-w-3xl mx-auto flex flex-wrap justify-between items-center p-4  gap-5">
          <li onClick={() => window.history.back()} className="font-bold cursor-pointer">
            <FaChevronLeft className="inline-block mr-2" />
          </li>
          <li className="grow text-center font-bold">
            <Heading sizeOffset={2} className="font-bold">
              채용 공고 지원하기
            </Heading>
          </li>
        </ul>
      </nav>
      <div className="p-4  flex flex-col gap-y-4 w-full max-w-3xl mx-auto">
        <Heading sizeOffset={1} className="font-bold">
          제출 할 이력서를 골라주세요
        </Heading>

        <div
          className="relative border rounded-lg px-4 py-3 shadow-sm cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-bold">
            {resumes.find((r) => r.resume_id === selectedResumeId)?.resume_title || ""}
          </span>
          <span
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-primary transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <FaAngleDown />
          </span>
          {isOpen && (
            <ul className="absolute top-full left-0 mt-1 w-full bg-white border rounded-lg shadow-lg z-10">
              {resumes.map((resume) => (
                <li
                  key={resume.resume_id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedResumeId(resume.resume_id);
                    setIsOpen(false);
                  }}
                >
                  {resume.resume_title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {resume && (
          <>
            <div className="w-full text-left">
              <ResumeContainer resume={resume} />
            </div>
            <div className="flex w-full gap-5">
              <button
                className="w-full border border-gray-300 p-4 rounded-md"
                onClick={() => {
                  if (session?.user.id && selectedResumeId) {
                    window.location.href = `/normal/mypage/${session.user.id}/resume/${selectedResumeId}/edit`;
                  }
                }}
              >
                수정하기
              </button>
              <button
                className="w-full bg-primary text-white p-4 rounded-md"
                onClick={() => {
                  mutation.mutate(undefined, {
                    onSuccess: () => {
                      toast.success("지원이 완료되었습니다!", {
                        duration: 3000,
                      });
                      setTimeout(() => {
                        window.location.href = "/jobs";
                      }, 3000);
                    },
                  });
                }}
              >
                지원 완료하기
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
