import { API_ENDPOINTS } from "@/constants/apiEndPoints";
import { fetcher } from "@/lib/fetcher";

import type {
  ApplicantListWithJobPostingsResponseDto,
  ApplicantResumeResponseDto,
} from "@/types/api/applicant";

export const applicantListApi = {
  getApplicant: () => {
    return fetcher.get<ApplicantListWithJobPostingsResponseDto>(API_ENDPOINTS.APPLICANT.LIST, {
      secure: true,
    });
  },
  getApplicantResume: (id: string) => {
    return fetcher.get<ApplicantResumeResponseDto>(API_ENDPOINTS.APPLICANT.READ_RESUME(id), {
      secure: true,
    });
  },
};
