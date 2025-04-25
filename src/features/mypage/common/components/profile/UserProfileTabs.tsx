import React, { useState } from "react";
import { Heading } from "@/components/ui/Heading";
import ResumeList from "../resume/ResumeList";
import type { Resume } from "@/types/resume";
import AppliedJobList from "../applied/AppliedJobList";
import { dummyAppliedJobs } from "../../mock/appliedJobs";

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

export default function UserProfileTabs({ resumes }: UserProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("resumes");

  const tabStyle = "flex-1 px-4 py-2 cursor-pointer transition-colors text-center";
  const activeTabStyle = `${tabStyle} text-primary font-semibold border-b-2 border-primary`;
  const inactiveTabStyle = `${tabStyle} text-gray-600 hover:text-gray-800`;

  const getTabContent = (tab: TabType) => {
    switch (tab) {
      case "resumes":
        return <ResumeList resumes={resumes || []} />;
      case "applied":
        return <AppliedJobList jobs={dummyAppliedJobs} />;
      case "saved":
        return <EmptyContent title="저장한 공고 목록" message="아직 저장한 공고가 없습니다." />;
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
