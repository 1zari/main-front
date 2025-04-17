"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LOGIN_CONFIG } from "@/features/auth-common/constants/auth.config";

export type LoginTab = keyof typeof LOGIN_CONFIG;

export function useLoginTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<LoginTab>(() => {
    const tab = searchParams.get("tab");
    return (tab === "company" ? "company" : "user") as LoginTab;
  });

  useEffect(() => {
    const tab = searchParams.get("tab");
    const newTab = (tab === "company" ? "company" : "user") as LoginTab;
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  }, [searchParams, activeTab]);

  const handleTabChange = (tab: LoginTab) => {
    setActiveTab(tab);
    router.push(`/auth/login?tab=${tab}`);
  };

  return {
    activeTab,
    handleTabChange,
  };
}
