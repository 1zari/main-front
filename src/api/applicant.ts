import { API_ENDPOINTS } from "@/constants/apiEndPoints";
import { fetcher } from "@/lib/fetcher";

import type { ApplicantListWithJobPostingsResponseDto } from "@/types/api/applicant";

export const applicantListApi = {
  getApplicant: () => {
    return fetcher.get<ApplicantListWithJobPostingsResponseDto>(API_ENDPOINTS.APPLICANT.LIST, {
      secure: true,
    });
  },
};
