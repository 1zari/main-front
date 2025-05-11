import { useMutation } from "@tanstack/react-query";
import { resumeApi } from "@/api/resume";
import { useSession } from "next-auth/react";
import type { ApiError } from "@/lib/fetcher";

export function useDeleteResume() {
  const { data: session } = useSession();

  const {
    mutate: deleteResume,
    isPending,
    error,
  } = useMutation<{ message: string }, ApiError, string>({
    mutationFn: (id) => resumeApi.delete(id, session?.accessToken ?? ""),
  });

  return {
    deleteResume,
    isDeleting: isPending,
    error,
  };
}
