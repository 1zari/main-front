import React, { useState } from "react";
import { Heading } from "@/components/ui/Heading";
import ResumeList from "@/features/mypage/common/components/myResume/ResumeList";
import SavedJobList from "@/features/mypage/common/components/savedRecruit/SavedRecruitList";
import type { Resume } from "@/types/resume";
import { dummySavedJobs } from "@/features/mypage/common/mock/savedJobs";
import { TABS, TAB_STYLES, type TabType } from "@/features/mypage/common/constants/myPageTab";
import AppliedJobList from "../applied/AppliedJobList";
import { dummyAppliedJobs } from "../../mock/appliedJobs";

interface UserProfileTabsProps {
  resumes?: Resume[];
}

export default function UserProfileTabs({ resumes }: UserProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("resumes");
  const [currentPage, setCurrentPage] = useState(1);
  const [SavedRecruit, setSavedRecruit] = useState(dummySavedJobs);

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
