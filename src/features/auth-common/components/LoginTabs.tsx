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
      className={`
        flex-1 py-5 text-lg sm:text-xl font-semibold transition-all duration-200 ease-in-out border-b-2
        ${position === "left" ? "rounded-tl-lg" : "rounded-tr-lg"}
        ${
          isActive
            ? "bg-white text-primary border-primary"
            : "text-gray-400 border-transparent hover:text-gray-600 hover:border-gray-200 bg-gray-50"
        }
      `}
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
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start bg-gray-50 py-6 sm:py-10 px-4">
      <div className="w-full max-w-[min(600px,90vw)] sm:max-w-[500px] md:max-w-[550px] lg:max-w-[600px] animate-fadeIn">
        <div className="overflow-hidden bg-white rounded-lg shadow-lg">
          <div className="flex border-b border-gray-100">
            <TabButton
              isActive={activeTab === "user"}
              onClick={() => handleTabChange("user")}
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
