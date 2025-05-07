// 일반 회원 정보 수정 요청 DTO
export interface UpdateUserInfoRequestDto {
  name?: string;
  phone_number?: string;
  profile_image?: string;
  address?: string;
}

// 일반 회원 정보 수정 응답 DTO
export interface UpdateUserInfoResponseDto {
  id: string;
  email: string;
  name: string;
  phone_number: string;
  profile_image: string | null;
  address: string | null;
  updated_at: string;
}

// 일반 회원 이메일 찾기 요청 DTO
export interface UserFindEmailRequestDto {
  name: string;
  phone_number: string;
}

// 일반 회원 이메일 찾기 응답 DTO
export interface UserFindEmailResponseDto {
  email: string;
  join_type: string;
  message: string;
}

// 일반 회원 비밀번호 재설정 요청 DTO
export interface UserResetPasswordRequestDto {
  email: string;
  new_password: string;
  verification_code: string;
}

// 일반 회원 비밀번호 재설정 응답 DTO
export interface UserResetPasswordResponseDto {
  message: string;
  email: string;
  updated_at: string;
}

// 회원가입 전화번호 인증 요청 DTO
export interface PhoneVerificationRequestDto {
  phone_number: string;
  join_type: "normal" | "company";
}

// 인증번호 요청 응답 DTO
export interface PhoneVerificationResponseDto {
  message: string;
}

// 인증번호 검증 요청 DTO
export interface VerifyCodeRequestDto {
  phone_number: string;
  code: string;
  join_type: "normal" | "company";
}

// 인증번호 검증 응답 DTO
export interface VerifyCodeResponseDto {
  message: string;
}

// 기본 인증 관련 타입
// 회원가입 공통 이메일 중복체크 추가 2025.5.3 안
export interface EmailCheckRequestDto {
  email: string;
}
export interface EmailCheckResponseDto {
  exists: boolean;
}

// 공통 회원가입 요청
export interface SignupRequestDto {
  email: string;
  join_type: string;
  password: string;
}

// 공통 회원가입 응답
export interface SignupResponseDto {
  common_user_id: string;
  email: string;
  join_type: string;
  is_active: boolean;
  is_staff: boolean;
  last_login: string | null;
  signup_status: SignupStatus;
}

// 최종 개인회원가입 요청
export type UserCompleteSignupRequestDto = {
  common_user_id: string;
  name: string;
  phone_number: string;
  gender: string;
  birthday: string | null;
  interest: string[];
  purpose_subscription: string[];
  route: string[];
};

// 회원가입 상태 타입
export type SignupStatus = "PENDING" | "COMPLETED";

// 일반 회원 로그인 요청 DTO
export interface LoginRequestDto {
  email: string;
  password: string;
}

// 일반 회원 로그인 응답 DTO
export interface LoginResponseDto {
  message: "로그인 성공";
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  user: {
    id: string;
    email: string;
    name: string;
    role: "normal";
    created_at: string;
    updated_at: string;
  };
}

// 기업 회원 회원가입 요청 DTO
export interface CompanySignupRequestDto {
  email: string;
  password: string;
  company_name: string;
  business_number: string;
  representative_name: string;
  phone_number: string;
  join_type: "company";
}

// 기업 회원 회원가입 응답 DTO
export interface CompanySignupResponseDto {
  company_id: string;
  email: string;
  company_name: string;
  business_number: string;
  representative_name: string;
  phone_number: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  signup_status: SignupStatus;
  common_user_id: string;
}

// 기업 회원 로그인 요청 DTO
export interface CompanyLoginRequestDto {
  email: string;
  password: string;
}

// 기업 회원 로그인 응답 DTO
export interface CompanyLoginResponseDto {
  message: "기업 로그인 성공";
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  company: {
    id: string;
    email: string;
    company_name: string;
    role: "company";
    is_verified: boolean;
    created_at: string;
    updated_at: string;
  };
}

// 토큰 갱신 요청 DTO
export interface TokenRefreshRequestDto {
  refresh_token: string;
}

// 토큰 갱신 응답 DTO
export interface TokenRefreshResponseDto {
  access: string;
}

// 로그아웃 요청 DTO
export interface LogoutRequestDto {
  refresh_token: string;
}

// 로그아웃 응답 DTO
export interface LogoutResponseDto {
  message: string;
}

// 소셜 로그인 응답 DTO
export interface SocialLoginResponseDto {
  message: string;
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  user: {
    id: string;
    email: string;
    name: string;
    role: "user";
    social_provider: "kakao" | "naver";
    created_at: string;
    updated_at: string;
  };
}
