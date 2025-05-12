import { fetcher } from "@/lib/fetcher";
import { API_ENDPOINTS } from "@/constants/apiEndPoints";
import type {
  LoginRequestDto,
  LoginResponseDto,
  SignupRequestDto,
  SignupResponseDto,
  SignupCompleteRequestDto,
  SignupCompleteResponseDto,
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
  //SendVerificationRequestDto,
  //SendVerificationResponseDto,
  //VerifyCodeRequestDto,
  //VerifyCodeResponseDto,
} from "@/types/api/auth";
import type { CompanyProfileResponseDto } from "@/types/api/company";
import type {
  //UpdateUserInfoRequestDto,
  UserFindEmailRequestDto,
  UserFindEmailResponseDto,
  UserResetPasswordRequestDto,
  UserResetPasswordResponseDto,
} from "@/types/api/user";
/*import type {
  UpdateCompanyInfoRequestDto,
  CompanyFindEmailRequestDto,
  CompanyFindEmailResponseDto,
  CompanyResetPasswordRequestDto,
  CompanyResetPasswordResponseDto,
} from "@/types/api/company";*/
import { useAuthStore } from "@/store/useAuthStore";

export const authApi = {
  // ─── 공통 인증 ───────────────────────────────────────────────
  // 액세스·리프레시 토큰 저장
  setTokens: (accessToken: string, refreshToken: string) => {
    useAuthStore.getState().setAuth(accessToken, refreshToken, null);
  },

  // 로그아웃
  logout: (refreshToken: string) => {
    const data: LogoutRequestDto = { refresh_token: refreshToken };
    return fetcher.post<LogoutResponseDto>(API_ENDPOINTS.AUTH.LOGOUT, data, { secure: true });
  },

  // 토큰 리프레시
  refreshToken: (refreshToken: string) => {
    const data: TokenRefreshRequestDto = { refresh_token: refreshToken };
    return fetcher.post<TokenRefreshResponseDto>(API_ENDPOINTS.AUTH.REFRESH_TOKEN, data);
  },

  // 계정 삭제
  deleteAccount: () => {
    return fetcher.delete(API_ENDPOINTS.AUTH.DELETE_ACCOUNT, { secure: true });
  },

  // ─── 개인회원 인증 ────────────────────────────────────────────
  user: {
    // 로그인
    login: (email: string, password: string) => {
      const data: LoginRequestDto = { email, password };
      return fetcher.post<LoginResponseDto>(API_ENDPOINTS.AUTH.USER.LOGIN, data);
    },

    // 내 프로필 조회
    getProfile: () => {
      return fetcher.get(API_ENDPOINTS.USER.PROFILE, { secure: true });
    },

    // 1단계 회원가입
    signup: (data: SignupRequestDto) => {
      return fetcher.post<SignupResponseDto>(API_ENDPOINTS.AUTH.USER.SIGNUP, data, {
        secure: true,
      });
    },

    // 2단계 회원가입 완료
    completeSignup: (data: SignupCompleteRequestDto) => {
      return fetcher.post<SignupCompleteResponseDto>(
        API_ENDPOINTS.AUTH.USER.COMPLETE_SIGNUP,
        data,
        { secure: true }, // CSRF 토큰 자동 포함
      );
    },

    // 이메일 찾기
    findEmail: (phoneNumber: string) => {
      const data: UserFindEmailRequestDto = { phone_number: phoneNumber };
      return fetcher.post<UserFindEmailResponseDto>(API_ENDPOINTS.USER.FIND_EMAIL, data);
    },

    // 비밀번호 재설정
    resetPassword: (email: string, phoneNumber: string, newPassword: string) => {
      const data: UserResetPasswordRequestDto = {
        email,
        phone_number: phoneNumber,
        new_password: newPassword,
      };
      return fetcher.post<UserResetPasswordResponseDto>(API_ENDPOINTS.USER.RESET_PASSWORD, data);
    },

    // 소셜 로그인
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

  // ─── 기업회원 인증 ────────────────────────────────────────────
  company: {
    // 기업 로그인
    login: (email: string, password: string) => {
      const data: CompanyLoginRequestDto = { email, password };
      return fetcher.post<CompanyLoginResponseDto>(API_ENDPOINTS.AUTH.COMPANY.LOGIN, data);
    },

    // 기업 프로필 조회
    getProfile: () => {
      return fetcher.get<CompanyProfileResponseDto>(API_ENDPOINTS.COMPANY.PROFILE, {
        secure: true,
      });
    },

    // 1단계 회원가입
    signup: (data: CompanySignupRequestDto) => {
      return fetcher.post<CompanySignupResponseDto>(API_ENDPOINTS.AUTH.COMPANY.SIGNUP, data, {
        secure: true,
      });
    },

    // 2단계 회원가입 완료
    completeSignup: (formData: FormData) => {
      return fetcher.post<CompanySignupResponseDto>(
        API_ENDPOINTS.AUTH.COMPANY.COMPLETE_SIGNUP,
        formData,
        { secure: true },
      );
    },
  },

  // ─── 문자 인증 ─────────────────────────────────────────────────
  verify: {
    checkBusiness: (b_no: string, p_nm: string, start_dt: string) =>
      fetcher.post<{ valid: boolean; message: string }>(
        API_ENDPOINTS.AUTH.VERIFY.CHECK_BUSINESS,
        { b_no, p_nm, start_dt },
        { secure: true },
      ),
  },
};
