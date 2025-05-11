"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { FontSizeProvider } from "@/hooks/useFontSize";
import { SessionProvider } from "next-auth/react";
import { CookiesProvider } from "react-cookie";

export function Providers({ children }: { children: ReactNode }) {
  const queryConfig = {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 1000 * 60 * 5,
      },
    },
  };
  // React Query 클라이언트 초기화
  const [queryClient] = useState(() => new QueryClient(queryConfig));

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <FontSizeProvider>{children}</FontSizeProvider>
        </CookiesProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
