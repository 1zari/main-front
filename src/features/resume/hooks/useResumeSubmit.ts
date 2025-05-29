import { useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { UseFormTrigger } from "react-hook-form";

import { ResumeFormData } from "@/features/resume/validation/resumeSchema";
import { ResumeApiResponse } from "@/features/resume/types";
import { useCreateResume } from "@/features/resume/api/useCreateResume";
import { useUpdateResume } from "@/features/resume/api/useUpdateResume";
import { mapToCreateDto } from "@/features/resume/utils/mapToCreateDto";
import { mapToUpdateDto } from "@/features/resume/utils/mapToUpdateDto";
import { handleResumeError, clearResumeError } from "@/features/resume/utils/errorHandler";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "@/features/resume/constants/messages";

interface UseResumeSubmitProps {
  mode: "create" | "edit";
  resumeId?: string;
  trigger: UseFormTrigger<ResumeFormData>;
  setSubmitError: (error: string | null) => void;
}

export function useResumeSubmit({ mode, resumeId, trigger, setSubmitError }: UseResumeSubmitProps) {
  const router = useRouter();
  const params = useParams<{ type: string; userId: string }>();
  const qc = useQueryClient();

  const { createResume, isLoading: isCreating, error: createError } = useCreateResume();
  const { updateResume, isUpdating, error: updateError } = useUpdateResume();

  const handleSuccess = useCallback(
    (res: ResumeApiResponse) => {
      clearResumeError(setSubmitError);

      if (mode === "create") {
        const newId = res.resume.resume_id;
        qc.invalidateQueries({ queryKey: ["resumeList"] });
        qc.invalidateQueries({ queryKey: ["resumeDetail", newId] });
        toast.success(SUCCESS_MESSAGES.RESUME_CREATED);
        router.push(`/${params.type}/mypage/${params.userId}/resume/${newId}`);
      } else {
        qc.invalidateQueries({ queryKey: ["resumeDetail", resumeId] });
        toast.success(SUCCESS_MESSAGES.RESUME_UPDATED);
        router.push(`/${params.type}/mypage/${params.userId}/resume/${resumeId}`);
      }
    },
    [mode, qc, params, resumeId, router, setSubmitError],
  );

  const handleError = useCallback(
    (error: unknown) => {
      handleResumeError(error, {
        mode,
        setError: setSubmitError,
      });
    },
    [mode, setSubmitError],
  );

  const onSubmit = useCallback(
    async (data: ResumeFormData) => {
      try {
        clearResumeError(setSubmitError);

        const isValid = await trigger();
        if (!isValid) {
          setSubmitError(ERROR_MESSAGES.VALIDATION_FAILED);
          return;
        }

        if (mode === "create") {
          const dto = mapToCreateDto(data);
          createResume(dto, {
            onSuccess: handleSuccess,
            onError: handleError,
          });
        } else {
          if (!resumeId) {
            setSubmitError(ERROR_MESSAGES.MISSING_RESUME_ID);
            return;
          }

          const dto = mapToUpdateDto(data, resumeId);
          updateResume(
            { id: resumeId, dto },
            {
              onSuccess: handleSuccess,
              onError: handleError,
            },
          );
        }
      } catch (error) {
        handleError(error);
      }
    },
    [
      mode,
      resumeId,
      trigger,
      createResume,
      updateResume,
      handleSuccess,
      handleError,
      setSubmitError,
    ],
  );

  const isLoading = mode === "create" ? isCreating : isUpdating;
  const apiError = mode === "create" ? createError : updateError;

  return {
    onSubmit,
    isLoading,
    apiError,
  };
}
