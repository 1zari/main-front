// 기본 인증 관련 타입
// 일반 회원 회원가입 요청 DTO
export interface SignupRequestDto {
  email: string;
  join_type: string;
  password: string;
}

// 회원가입 상태 타입
export type SignupStatus = "PENDING" | "COMPLETED";

// 일반 회원 회원가입 응답 DTO
export interface SignupResponseDto {
  common_user_id: string;
  email: string;
  join_type: string;
  is_active: boolean;
  is_staff: boolean;
  last_login: string | null;
  signup_status: SignupStatus;
}

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
    role: "user";
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
