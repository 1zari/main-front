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
  UserCompleteSignupRequestDto,
} from "@/types/api/auth";

export const authApi = {
  // 공통 인증
  logout: (refreshToken: string) => {
    const data: LogoutRequestDto = { refresh_token: refreshToken };
    return fetcher.post<LogoutResponseDto>(API_ENDPOINTS.AUTH.LOGOUT, data, { secure: true });
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
      return fetcher.post<SignupResponseDto>(
        API_ENDPOINTS.AUTH.USER.SIGNUP,
        data,
        { secure: true }, // CSRF 토큰 자동 포함
      );
    },

    completeSignup: (data: UserCompleteSignupRequestDto) => {
      return fetcher.post<SignupResponseDto>(API_ENDPOINTS.AUTH.USER.COMPLETE_SIGNUP, data, {
        secure: true,
      });
    },

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

  // 기업 사용자 인증
  company: {
    login: (email: string, password: string) => {
      const data: CompanyLoginRequestDto = { email, password };
      return fetcher.post<CompanyLoginResponseDto>(API_ENDPOINTS.AUTH.COMPANY.LOGIN, data);
    },

    signup: (data: CompanySignupRequestDto) => {
      return fetcher.post<CompanySignupResponseDto>(API_ENDPOINTS.AUTH.COMPANY.SIGNUP, data, {
        secure: true,
      });
    },

    completeSignup: (formData: FormData) => {
      return fetcher.post<CompanySignupResponseDto>(
        API_ENDPOINTS.AUTH.COMPANY.COMPLETE_SIGNUP,
        formData,
        { secure: true },
      );
    },
  },

  // 사업자등록번호 검증
  verify: {
    checkBusiness: (b_no: string, p_nm: string, start_dt: string) => {
      return fetcher.post<{ valid: boolean; message: string }>(
        API_ENDPOINTS.AUTH.VERIFY.CHECK_BUSINESS,
        { b_no, p_nm, start_dt },
        { secure: true },
      );
    },
  },
};
