import { useQuery } from "@tanstack/react-query";
import { resumeApi } from "@/api/resume";
import { useSession } from "next-auth/react";
import type { ResumeResponseDto } from "@/types/api/resume";
import type { ApiError } from "@/lib/fetcher";

export function useGetResumeDetail(resumeId: string) {
  const { data: session } = useSession();

  return useQuery<ResumeResponseDto, ApiError>({
    queryKey: ["resumeDetail", resumeId, session?.accessToken],
    queryFn: () => resumeApi.getDetail(resumeId, session?.accessToken ?? ""),
    enabled: !!session?.accessToken && !!resumeId,
  });
}
