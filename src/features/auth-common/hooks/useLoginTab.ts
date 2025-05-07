"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LOGIN_CONFIG } from "@/features/auth-common/constants/auth.config";

export type LoginTab = keyof typeof LOGIN_CONFIG;

export function useLoginTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<LoginTab>("normal");

  useEffect(() => {
    const tab = searchParams.get("tab");
    const newTab = (tab === "company" ? "company" : "normal") as LoginTab;
    setActiveTab(newTab);
  }, [searchParams]);

  const handleTabChange = (tab: LoginTab) => {
    setActiveTab(tab);
    router.push(`/auth/login?tab=${tab}`);
  };

  return {
    activeTab,
    handleTabChange,
  };
}
