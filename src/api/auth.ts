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
  KakaoLoginRequestDto,
  NaverLoginRequestDto,
  SendVerificationRequestDto,
  SendVerificationResponseDto,
  VerifyCodeRequestDto,
  VerifyCodeResponseDto,
} from "@/types/api/auth";
import type {
  UpdateUserInfoRequestDto,
  UserFindEmailRequestDto,
  UserFindEmailResponseDto,
  UserResetPasswordRequestDto,
  UserResetPasswordResponseDto,
} from "@/types/api/user";
import type {
  UpdateCompanyInfoRequestDto,
  CompanyFindEmailRequestDto,
  CompanyFindEmailResponseDto,
  CompanyResetPasswordRequestDto,
  CompanyResetPasswordResponseDto,
} from "@/types/api/company";
import { useAuthStore } from "@/store/useAuthStore";

export const authApi = {
  // 공통 인증
  setTokens: (accessToken: string, refreshToken: string) => {
    useAuthStore.getState().setAuth(accessToken, refreshToken, null);
  },

  logout: (refreshToken: string) => {
    const data: LogoutRequestDto = { refresh_token: refreshToken };
    return fetcher.post<LogoutResponseDto>(API_ENDPOINTS.AUTH.LOGOUT, data, {
      secure: true,
    });
  },

  refreshToken: (refreshToken: string) => {
    const data: TokenRefreshRequestDto = { refresh_token: refreshToken };
    return fetcher.post<TokenRefreshResponseDto>(API_ENDPOINTS.AUTH.REFRESH_TOKEN, data);
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

    getProfile: () => {
      return fetcher.get(API_ENDPOINTS.USER.PROFILE, { secure: true });
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

    findEmail: (phoneNumber: string) => {
      const data: UserFindEmailRequestDto = { phone_number: phoneNumber };
      return fetcher.post<UserFindEmailResponseDto>(API_ENDPOINTS.USER.FIND_EMAIL, data);
    },

    resetPassword: (email: string, phoneNumber: string, newPassword: string) => {
      const data: UserResetPasswordRequestDto = {
        email,
        phone_number: phoneNumber,
        new_password: newPassword,
      };
      return fetcher.post<UserResetPasswordResponseDto>(API_ENDPOINTS.USER.RESET_PASSWORD, data);
    },

    // 소셜 로그인 (개인회원 전용)
    social: {
      kakao: {
        login: () => {
          window.location.href = API_ENDPOINTS.AUTH.USER.SOCIAL.KAKAO.LOGIN;
        },
        callback: (code: string) => {
          const data: KakaoLoginRequestDto = { code };
          return fetcher.post<SocialLoginResponseDto>(
            API_ENDPOINTS.AUTH.USER.SOCIAL.KAKAO.CALLBACK,
            data,
          );
        },
      },
      naver: {
        login: () => {
          window.location.href = API_ENDPOINTS.AUTH.USER.SOCIAL.NAVER.LOGIN;
        },
        callback: (code: string, state: string) => {
          const data: NaverLoginRequestDto = { code, state };
          return fetcher.post<SocialLoginResponseDto>(
            API_ENDPOINTS.AUTH.USER.SOCIAL.NAVER.CALLBACK,
            data,
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

    getProfile: () => {
      return fetcher.get(API_ENDPOINTS.COMPANY.PROFILE, { secure: true });
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

    findEmail: (phoneNumber: string, businessRegistrationNumber: string) => {
      const data: CompanyFindEmailRequestDto = {
        phone_number: phoneNumber,
        business_registration_number: businessRegistrationNumber,
      };
      return fetcher.post<CompanyFindEmailResponseDto>(API_ENDPOINTS.COMPANY.FIND_EMAIL, data);
    },

    resetPassword: (
      email: string,
      phoneNumber: string,
      businessRegistrationNumber: string,
      newPassword: string,
    ) => {
      const data: CompanyResetPasswordRequestDto = {
        email,
        phone_number: phoneNumber,
        business_registration_number: businessRegistrationNumber,
        new_password: newPassword,
      };
      return fetcher.post<CompanyResetPasswordResponseDto>(
        API_ENDPOINTS.COMPANY.RESET_PASSWORD,
        data,
      );
    },
  },

  // 문자 인증
  verification: {
    send: (phoneNumber: string) => {
      const data: SendVerificationRequestDto = { phone_number: phoneNumber };
      return fetcher.post<SendVerificationResponseDto>(API_ENDPOINTS.AUTH.SEND_VERIFICATION, data);
    },

    verify: (phoneNumber: string, code: string) => {
      const data: VerifyCodeRequestDto = { phone_number: phoneNumber, code };
      return fetcher.post<VerifyCodeResponseDto>(API_ENDPOINTS.AUTH.VERIFY_CODE, data);
    },
  },
};
