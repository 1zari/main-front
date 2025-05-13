"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
//import { useSession } from "next-auth/react";
import AppliedJobList from "@/features/mypage/common/components/applied/AppliedJobList";
import ResumeList from "@/features/mypage/common/components/myResume/ResumeList";
import SavedJobList from "@/features/mypage/common/components/savedRecruit/SavedRecruitList";
import { TABS, TAB_STYLES, type TabType } from "@/features/mypage/common/constants/myPageTab";
import { dummyAppliedJobs } from "@/features/mypage/common/mock/appliedJobs";
import { dummySavedJobs } from "@/features/mypage/common/mock/savedJobs";
import { useGetResumeList } from "@/features/resume/api/useGetResumeList";
//import type { ResumeListResponseDto } from "@/types/api/resume";

export default function UserProfileTabs() {
  //const { data: session } = useSession(); // 세션에서 accessToken 가져오기
  const params = useParams();
  const rawType = params.type;
  const rawUserId = params.userId;
  const userType = Array.isArray(rawType) ? rawType[0] : rawType!;
  const userId = Array.isArray(rawUserId) ? rawUserId[0] : rawUserId!;

  const [activeTab, setActiveTab] = useState<TabType>("resumes");
  const [currentPage, setCurrentPage] = useState(1);
  const [savedRecruit, setSavedRecruit] = useState(dummySavedJobs);

  const {
    data: resumeResponse,
    isLoading: isResumeLoading,
    error: resumeError,
  } = useGetResumeList(userType, userId);
  const resumeList = resumeResponse?.resume_list ?? [];

  const handleToggleSave = (jobId: string) => {
    setSavedRecruit((prev) =>
      prev.map((job) => (job.job_posting_id === jobId ? { ...job, isSaved: !job.isSaved } : job)),
    );
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "resumes":
        if (isResumeLoading) return <p>이력서 로딩 중…</p>;
        if (resumeError) return <p className="text-red-500">이력서 불러오기 실패</p>;
        return <ResumeList type={userType} userId={userId} resumes={resumeList} />;

      case "applied":
        return <AppliedJobList jobs={dummyAppliedJobs} />;

      case "saved":
        return (
          <SavedJobList
            jobs={savedRecruit}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onToggleSave={handleToggleSave}
          />
        );
    }
  };

  return (
    <div className="w-[calc(100%-2rem)] mx-auto mt-8">
      <div className="border-b flex">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`
              ${TAB_STYLES.base}
              ${activeTab === tab.id ? TAB_STYLES.active : TAB_STYLES.inactive}
            `}
            onClick={() => setActiveTab(tab.id as TabType)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-6">{getTabContent()}</div>
    </div>
  );
}
