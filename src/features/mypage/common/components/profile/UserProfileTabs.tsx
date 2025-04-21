import { useState } from "react";

interface TabProps {
  resumes: React.ReactNode;
  appliedJobs: React.ReactNode;
  savedJobs: React.ReactNode;
}

export default function UserProfileTabs({ resumes, appliedJobs, savedJobs }: TabProps) {
  const [activeTab, setActiveTab] = useState<"resumes" | "applied" | "saved">("resumes");

  const tabStyle = "px-4 py-2 cursor-pointer";
  const activeTabStyle = `${tabStyle} text-primary font-semibold border-b-2 border-primary`;
  const inactiveTabStyle = `${tabStyle} text-gray-600 hover:text-gray-800`;

  return (
    <div className="mt-8">
      <div className="border-b">
        <div className="flex space-x-8">
          <button
            className={activeTab === "resumes" ? activeTabStyle : inactiveTabStyle}
            onClick={() => setActiveTab("resumes")}
          >
            내 이력서
          </button>
          <button
            className={activeTab === "applied" ? activeTabStyle : inactiveTabStyle}
            onClick={() => setActiveTab("applied")}
          >
            지원한 공고
          </button>
          <button
            className={activeTab === "saved" ? activeTabStyle : inactiveTabStyle}
            onClick={() => setActiveTab("saved")}
          >
            저장한 공고
          </button>
        </div>
      </div>

      <div className="py-6">
        {activeTab === "resumes" && resumes}
        {activeTab === "applied" && appliedJobs}
        {activeTab === "saved" && savedJobs}
      </div>
    </div>
  );
}
