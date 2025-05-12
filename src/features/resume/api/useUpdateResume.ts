import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { resumeApi } from "@/api/resume";
import type { ApiError } from "@/lib/fetcher";
import type { UpdateResumeRequestDto, ResumeResponseDto } from "@/types/api/resume";

export function useUpdateResume() {
  const { data: session } = useSession();

  const {
    mutate: updateResume,
    status,
    error,
  } = useMutation<ResumeResponseDto, ApiError, { id: string; dto: UpdateResumeRequestDto }>({
    mutationFn: ({ id, dto }) => resumeApi.update(id, dto, session?.accessToken ?? ""),
  });

  const isUpdating = status === "pending";

  return { updateResume, isUpdating, error };
}
