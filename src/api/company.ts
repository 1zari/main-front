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
  CompanyProfileResponseDto,
} from "@/types/api/company";

export const getCompanyProfile = async (): Promise<CompanyProfileResponseDto> => {
  return fetcher.get<CompanyProfileResponseDto>(API_ENDPOINTS.COMPANY.PROFILE, { secure: true });
};

export const companyApi = {
  getProfile: () => {
    return fetcher.get<CompanyProfileResponseDto>(API_ENDPOINTS.COMPANY.PROFILE, { secure: true });
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

  updateInfo: (data: UpdateCompanyInfoRequestDto) => {
    return fetcher.patch<UpdateCompanyInfoResponseDto>(API_ENDPOINTS.COMPANY.UPDATE_PROFILE, data, {
      secure: true,
    });
  },

  deleteAccount: () => {
    return fetcher.delete(API_ENDPOINTS.AUTH.DELETE_ACCOUNT, { secure: true });
  },
};
