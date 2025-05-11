import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { resumeApi } from "@/api/resume";
import type { ResumeListResponseDto } from "@/types/api/resume";
import type { ApiError } from "@/lib/fetcher";

export function useGetResumeList(type: string, userId: string) {
  const { data: session } = useSession();

  return useQuery<ResumeListResponseDto, ApiError>({
    queryKey: ["resumeList", type, userId],
    queryFn: () => resumeApi.getList(session?.accessToken ?? ""),
    enabled: !!session?.accessToken,
  });
}
