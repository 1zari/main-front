import { fetcher } from "@/lib/fetcher";
import { API_ENDPOINTS } from "@/constants/apiEndPoints";
import type { CompanyProfile } from "@/types/company";
import type {
  UpdateCompanyInfoRequestDto,
  UpdateCompanyInfoResponseDto,
  CompanyFindEmailRequestDto,
  CompanyFindEmailResponseDto,
  CompanyResetPasswordRequestDto,
  CompanyResetPasswordResponseDto,
} from "@/types/api/company";

export const companyApi = {
  getProfile: () => {
    return fetcher.get<CompanyProfile>(API_ENDPOINTS.COMPANY.PROFILE, { secure: true });
  },

  updateProfile: (data: Partial<CompanyProfile>) => {
    return fetcher.patch<CompanyProfile>(API_ENDPOINTS.COMPANY.UPDATE_PROFILE, data, {
      secure: true,
    });
  },

  findEmail: (data: CompanyFindEmailRequestDto) => {
    return fetcher.post<CompanyFindEmailResponseDto>(API_ENDPOINTS.COMPANY.FIND_EMAIL, data);
  },

  resetPassword: (data: CompanyResetPasswordRequestDto) => {
    return fetcher.post<CompanyResetPasswordResponseDto>(
      API_ENDPOINTS.COMPANY.RESET_PASSWORD,
      data,
    );
  },

  updateInfo: (companyId: string, data: UpdateCompanyInfoRequestDto) => {
    return fetcher.patch<UpdateCompanyInfoResponseDto>(
      `${API_ENDPOINTS.COMPANY.UPDATE_PROFILE}/${companyId}`,
      data,
      { secure: true },
    );
  },

  deleteAccount: () => {
    return fetcher.delete(API_ENDPOINTS.AUTH.DELETE_ACCOUNT, { secure: true });
  },
};
