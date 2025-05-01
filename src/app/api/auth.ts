import { fetcher } from "@/lib/fetcher";
import {
  SignupRequestDto,
  SignupResponseDto,
  TokenRefreshRequestDto,
  TokenRefreshResponseDto,
  LogoutRequestDto,
  LogoutResponseDto,
  LoginRequestDto,
  LoginResponseDto,
} from "@/types/api/auth";

export const authApi = {
  signup: (data: SignupRequestDto) => {
    return fetcher.post<SignupResponseDto>("/user/common_user/signup", data);
  },

  login: (email: string, password: string) => {
    const data: LoginRequestDto = { email, password };
    return fetcher.post<LoginResponseDto>("/user/login", data);
  },

  refreshToken: (refreshToken: string) => {
    const data: TokenRefreshRequestDto = { refresh_token: refreshToken };
    return fetcher.post<TokenRefreshResponseDto>("/user/token/refresh", data, { secure: true });
  },

  logout: (refreshToken: string) => {
    const data: LogoutRequestDto = { refresh_token: refreshToken };
    return fetcher.post<LogoutResponseDto>("/user/logout", data, { secure: true });
  },
};
