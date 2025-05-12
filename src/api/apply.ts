import { API_ENDPOINTS } from "@/constants/apiEndPoints";
import { fetcher } from "@/lib/fetcher";

import { ApplyRequestDto, ApplyResponseDto } from "@/types/api/apply";

export const applyApi = {
  getApplicant: (data: ApplyRequestDto) => {
    return fetcher.post<ApplyResponseDto>(API_ENDPOINTS.APPLY.POST, data, {
      secure: true,
    });
  },
};
