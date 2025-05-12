import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { resumeApi } from "@/api/resume";
import type { CreateResumeRequestDto, ResumeResponseDto } from "@/types/api/resume";
import type { ApiError } from "@/lib/fetcher";

export function useCreateResume() {
  const { data: session } = useSession();

  const { mutate, status, error } = useMutation<
    ResumeResponseDto,
    ApiError,
    CreateResumeRequestDto
  >({
    mutationFn: (dto) => resumeApi.create(dto, session?.accessToken ?? ""),
  });

  return {
    createResume: mutate,
    isLoading: status === "pending",
    error,
  };
}
