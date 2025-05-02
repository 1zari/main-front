import { fetcher } from "@/lib/fetcher";
import { API_ENDPOINTS } from "@/constants/apiEndPoints";
import type { UserProfile } from "@/types/user";
import type {
  UpdateUserInfoRequestDto,
  UpdateUserInfoResponseDto,
  UserFindEmailRequestDto,
  UserFindEmailResponseDto,
  UserResetPasswordRequestDto,
  UserResetPasswordResponseDto,
} from "@/types/api/user";

export const userApi = {
  getProfile: () => {
    return fetcher.get<UserProfile>(API_ENDPOINTS.USER.PROFILE, { secure: true });
  },

  updateProfile: (data: Partial<UserProfile>) => {
    return fetcher.patch<UserProfile>(API_ENDPOINTS.USER.UPDATE_PROFILE, data, { secure: true });
  },

  findEmail: (data: UserFindEmailRequestDto) => {
    return fetcher.post<UserFindEmailResponseDto>(API_ENDPOINTS.USER.FIND_EMAIL, data);
  },

  resetPassword: (data: UserResetPasswordRequestDto) => {
    return fetcher.post<UserResetPasswordResponseDto>(API_ENDPOINTS.USER.RESET_PASSWORD, data);
  },

  updateInfo: (userId: string, data: UpdateUserInfoRequestDto) => {
    return fetcher.patch<UpdateUserInfoResponseDto>(
      `${API_ENDPOINTS.USER.UPDATE_PROFILE}/${userId}`,
      data,
      { secure: true },
    );
  },

  deleteAccount: () => {
    return fetcher.delete(API_ENDPOINTS.AUTH.DELETE_ACCOUNT, { secure: true });
  },
};
