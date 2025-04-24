import React, { useState } from "react";
import { Heading } from "@/components/ui/Heading";
import ResumeList from "../resume/ResumeList";
import SavedJobList from "@/features/mypage/common/components/recruit/SavedJobList";
import type { Resume } from "@/types/resume";

interface EmptyContentProps {
  title: string;
  message: string;
}

const EmptyContent = ({ title, message }: EmptyContentProps) => (
  <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-xl">
    <Heading sizeOffset={2} className="mb-4 font-semibold text-gray-800">
      {title}
    </Heading>
    <Heading sizeOffset={2} className="text-gray-500">
      {message}
    </Heading>
  </div>
);

interface UserProfileTabsProps {
  resumes: Resume[] | null;
}

type TabType = "resumes" | "applied" | "saved";

const TABS = [
  { id: "resumes", label: "내 이력서" },
  { id: "applied", label: "지원한 공고" },
  { id: "saved", label: "저장한 공고" },
] as const;

// 저장한 공고 더미 데이터
const DUMMY_SAVED_JOBS = [
  {
    id: "1",
    companyName: "스타벅스",
    title: "스타벅스 바리스타 모집",
    location: "서울 강남구",
    salary: 2800000,
    deadline: "2024-04-30",
    isSaved: true,
  },
  {
    id: "2",
    companyName: "파리바게뜨",
    title: "제과제빵 경력직 채용",
    location: "서울 서초구",
    salary: 3000000,
    deadline: "2024-03-15",
    isSaved: true,
  },
  {
    id: "3",
    companyName: "맥도날드",
    title: "맥도날드 매니저 채용",
    location: "서울 송파구",
    salary: 2900000,
    deadline: "2024-05-01",
    isSaved: true,
  },
];

export default function UserProfileTabs({ resumes }: UserProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("resumes");
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobs, setSavedJobs] = useState(DUMMY_SAVED_JOBS);

  const tabStyle = "flex-1 px-4 py-2 cursor-pointer transition-colors text-center";
  const activeTabStyle = `${tabStyle} text-primary font-semibold border-b-2 border-primary`;
  const inactiveTabStyle = `${tabStyle} text-gray-600 hover:text-gray-800`;

  const handleToggleSave = (jobId: string) => {
    setSavedJobs((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, isSaved: !job.isSaved } : job)),
    );
  };

  const getTabContent = (tab: TabType) => {
    switch (tab) {
      case "resumes":
        return <ResumeList resumes={resumes || []} />;
      case "applied":
        return <EmptyContent title="지원한 공고 목록" message="아직 지원한 공고가 없습니다." />;
      case "saved":
        return savedJobs.length > 0 ? (
          <SavedJobList
            jobs={savedJobs}
            currentPage={currentPage}
            totalPages={Math.ceil(savedJobs.length / 5)}
            onPageChange={setCurrentPage}
            onToggleSave={handleToggleSave}
          />
        ) : (
          <EmptyContent title="저장한 공고 목록" message="아직 저장한 공고가 없습니다." />
        );
    }
  };

  return (
    <div className="w-[calc(100%-2rem)] sm:w-[36rem] md:w-[48rem] lg:w-[64rem] mx-auto mt-8">
      <div className="border-b">
        <div className="flex">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? activeTabStyle : inactiveTabStyle}
              onClick={() => setActiveTab(tab.id as TabType)}
            >
              <Heading sizeOffset={2} className="font-semibold break-keep">
                {tab.label}
              </Heading>
            </button>
          ))}
        </div>
      </div>
      <div className="py-6">{getTabContent(activeTab)}</div>
    </div>
  );
}
