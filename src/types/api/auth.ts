// 일반 회원 회원가입 요청 DTO
export interface SignupRequestDto {
  email: string;
  join_type: string;
  password: string;
}

// 공통 회원가입 응답 DTO (1단계)
export interface SignupResponseDto {
  common_user_id: string;
  email: string;
  join_type: string;
  is_active: boolean;
  is_staff: boolean;
  last_login: string | null;
  signup_status: SignupStatus;
}

// 최종 개인회원가입 요청 DTO
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

// wrapper에서 사용하는 이름과 매칭
export type SignupCompleteRequestDto = UserCompleteSignupRequestDto;

// 최종 개인회원가입 응답 DTO
export interface SignupCompleteResponseDto {
  message: string;
}

// 회원가입 상태 타입
export type SignupStatus = "PENDING" | "COMPLETED";

// 일반 회원 로그인 요청 DTO
export interface LoginRequestDto {
  email: string;
  password: string;
}

// 일반 회원 로그인 응답 DTO
export interface LoginResponseDto {
  message: "Login successful.";
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  user: {
    common_user_id: string;
    email: string;
    name: string;
    join_type: string;
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

// 기업 회원 회원가입 응답 DTO (1단계)
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
  message: "로그인 성공";
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  user: {
    common_user_id: string;
    email: string;
    company_name: string;
    join_type: string;
  };
}

// 토큰 갱신 요청 DTO
export interface TokenRefreshRequestDto {
  refresh_token: string;
}

// 토큰 갱신 응답 DTO
export interface TokenRefreshResponseDto {
  access_token: string;
  message: "Access token refreshed successfully.";
  token_type: "bearer";
}

// 로그아웃 요청 DTO
export interface LogoutRequestDto {
  refresh_token: string;
}

// 로그아웃 응답 DTO
export interface LogoutResponseDto {
  message: string;
}

// 카카오 로그인 요청 DTO
export interface KakaoLoginRequestDto {
  access_token: string;
}

// 네이버 로그인 요청 DTO
export interface NaverLoginRequestDto {
  access_token: string;
}

// 소셜 로그인 성공 응답 DTO
export interface SocialLoginSuccessResponseDto {
  message: "로그인 성공";
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  common_user_id: string;
  email: string;
  name: string;
  join_type: string;
}

// 소셜 로그인 추가 정보 필요 응답 DTO
export interface SocialLoginAdditionalInfoResponseDto {
  message: "추가 정보 입력 필요";
  email: string;
}

// 소셜 로그인 응답 DTO (성공 또는 추가 정보 필요)
export type SocialLoginResponseDto =
  | SocialLoginSuccessResponseDto
  | SocialLoginAdditionalInfoResponseDto;

// 문자 인증 코드 발송 요청 DTO
export interface SendVerificationRequestDto {
  phone_number: string;
}

// 문자 인증 코드 발송 응답 DTO
export interface SendVerificationResponseDto {
  message: "Verification code sent successfully";
}

// 문자 인증 코드 검증 요청 DTO
export interface VerifyCodeRequestDto {
  phone_number: string;
  code: string;
  join_type: "normal" | "company";
}

// 문자 인증 코드 검증 응답 DTO
export interface VerifyCodeResponseDto {
  message: "Verification successful.";
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

// NextAuthUser 타입은 src/types/next-auth.d.ts에 정의되어 있습니다.
