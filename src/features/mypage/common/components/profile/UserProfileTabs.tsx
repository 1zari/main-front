import React, { useState } from "react";
import { Heading } from "@/components/ui/Heading";
import ResumeList from "@/features/mypage/common/components/myResume/ResumeList";
import SavedJobList from "@/features/mypage/common/components/savedRecruit/SavedRecruitList";
import type { Resume } from "@/types/resume";
import { DUMMY_JOBS } from "@/features/mypage/common/data/dummy-jobs";
import { TABS, TAB_STYLES, type TabType } from "@/features/mypage/common/constants/myPageTab";

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

export default function UserProfileTabs({ resumes }: UserProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("resumes");
  const [currentPage, setCurrentPage] = useState(1);
  const [SavedRecruit, setSavedRecruit] = useState(DUMMY_JOBS);

  const handleToggleSave = (jobId: string) => {
    setSavedRecruit((prev) =>
      prev.map((job) => (job.job_posting_id === jobId ? { ...job, isSaved: !job.isSaved } : job)),
    );
  };

  const getTabContent = (tab: TabType) => {
    switch (tab) {
      case "resumes":
        return <ResumeList resumes={resumes || []} />;
      case "applied":
        return <AppliedJobList jobs={dummyAppliedJobs} />;
      case "saved":
        return (
          <SavedJobList
            jobs={SavedRecruit}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onToggleSave={handleToggleSave}
          />
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
              className={`${TAB_STYLES.base} ${
                activeTab === tab.id ? TAB_STYLES.active : TAB_STYLES.inactive
              }`}
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
