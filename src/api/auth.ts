import { fetcher } from "@/lib/fetcher";
import { API_ENDPOINTS } from "@/constants/apiEndPoints";
import type {
  LoginRequestDto,
  LoginResponseDto,
  SignupRequestDto,
  SignupResponseDto,
  TokenRefreshRequestDto,
  TokenRefreshResponseDto,
  LogoutRequestDto,
  LogoutResponseDto,
  SocialLoginResponseDto,
  CompanyLoginRequestDto,
  CompanyLoginResponseDto,
  CompanySignupRequestDto,
  CompanySignupResponseDto,
} from "@/types/api/auth";
import type { UpdateUserInfoRequestDto } from "@/types/api/user";
import type { UpdateCompanyInfoRequestDto } from "@/types/api/company";

export const authApi = {
  // 공통 인증
  logout: (refreshToken: string) => {
    const data: LogoutRequestDto = { refresh_token: refreshToken };
    return fetcher.post<LogoutResponseDto>(API_ENDPOINTS.AUTH.LOGOUT, data, {
      secure: true,
    });
  },

  refreshToken: (refreshToken: string) => {
    const data: TokenRefreshRequestDto = { refresh_token: refreshToken };
    return fetcher.post<TokenRefreshResponseDto>(API_ENDPOINTS.AUTH.REFRESH_TOKEN, data, {
      secure: true,
    });
  },

  deleteAccount: () => {
    return fetcher.delete(API_ENDPOINTS.AUTH.DELETE_ACCOUNT, { secure: true });
  },

  // 일반 사용자 인증
  user: {
    login: (email: string, password: string) => {
      const data: LoginRequestDto = { email, password };
      return fetcher.post<LoginResponseDto>(API_ENDPOINTS.AUTH.USER.LOGIN, data);
    },

    signup: (data: SignupRequestDto) => {
      return fetcher.post<SignupResponseDto>(API_ENDPOINTS.AUTH.USER.SIGNUP, data);
    },

    completeSignup: (userId: string, data: UpdateUserInfoRequestDto) => {
      return fetcher.patch<SignupResponseDto>(
        `${API_ENDPOINTS.AUTH.USER.SIGNUP}/complete/${userId}`,
        data,
        { secure: true },
      );
    },

    // 소셜 로그인
    social: {
      kakao: {
        login: () => {
          window.location.href = API_ENDPOINTS.AUTH.USER.SOCIAL.KAKAO.LOGIN;
        },
        callback: (code: string) => {
          return fetcher.get<SocialLoginResponseDto>(
            `${API_ENDPOINTS.AUTH.USER.SOCIAL.KAKAO.CALLBACK}?code=${code}`,
          );
        },
      },
      naver: {
        login: () => {
          window.location.href = API_ENDPOINTS.AUTH.USER.SOCIAL.NAVER.LOGIN;
        },
        callback: (code: string) => {
          return fetcher.get<SocialLoginResponseDto>(
            `${API_ENDPOINTS.AUTH.USER.SOCIAL.NAVER.CALLBACK}?code=${code}`,
          );
        },
      },
    },
  },

  // 기업 회원 인증
  company: {
    login: (email: string, password: string) => {
      const data: CompanyLoginRequestDto = { email, password };
      return fetcher.post<CompanyLoginResponseDto>(API_ENDPOINTS.AUTH.COMPANY.LOGIN, data);
    },

    signup: (data: CompanySignupRequestDto) => {
      return fetcher.post<CompanySignupResponseDto>(API_ENDPOINTS.AUTH.COMPANY.SIGNUP, data);
    },

    completeSignup: (companyId: string, data: UpdateCompanyInfoRequestDto) => {
      return fetcher.patch<CompanySignupResponseDto>(
        `${API_ENDPOINTS.AUTH.COMPANY.SIGNUP}/complete/${companyId}`,
        data,
        { secure: true },
      );
    },
  },
};
