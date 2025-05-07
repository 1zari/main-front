"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AUTH_ROUTES, LOGIN_CONFIG } from "@/features/auth-common/constants/auth.config";
import { useLoginTab } from "@/features/auth-common/hooks/useLoginTab";
import LoginBaseForm from "@/features/auth-common/ui/baseForms/LoginBaseForm";

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  position: "left" | "right";
  children: React.ReactNode;
}

function TabButton({ isActive, onClick, position, children }: TabButtonProps) {
  return (
    <button
      className={`flex-1 border-b-2 py-5 text-lg font-semibold transition-all duration-200 ease-in-out sm:text-xl ${position === "left" ? "rounded-tl-lg" : "rounded-tr-lg"} ${
        isActive
          ? "text-primary border-primary bg-white"
          : "border-transparent bg-gray-50 text-gray-400 hover:border-gray-200 hover:text-gray-600"
      } `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function LoginTabs() {
  const router = useRouter();
  const { activeTab, handleTabChange } = useLoginTab();

  const config = LOGIN_CONFIG[activeTab];
  const routes = AUTH_ROUTES[activeTab];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-start bg-gray-50 px-4 py-6 sm:py-10">
      <div className="animate-fadeIn w-full max-w-[min(600px,90vw)] sm:max-w-[500px] md:max-w-[550px] lg:max-w-[600px]">
        <div className="overflow-hidden bg-white rounded-lg shadow-lg">
          <div className="flex border-b border-gray-100">
            <TabButton
              isActive={activeTab === "normal"}
              onClick={() => handleTabChange("normal")}
              position="left"
            >
              개인회원
            </TabButton>
            <TabButton
              isActive={activeTab === "company"}
              onClick={() => handleTabChange("company")}
              position="right"
            >
              기업회원
            </TabButton>
          </div>
          <LoginBaseForm
            key={activeTab}
            join_type={activeTab}
            {...config}
            onEmailFind={() => router.push(routes.emailFind)}
            onPasswordFind={() => router.push(routes.passwordFind)}
          />
        </div>
      </div>
    </div>
  );
}
