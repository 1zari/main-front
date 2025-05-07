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
  join_type?: "normal" | "company";
}

// 인증번호 요청 응답 DTO
export interface PhoneVerificationResponseDto {
  message: string;
}

// 인증번호 검증 요청 DTO
export interface VerifyCodeRequestDto {
  phone_number: string;
  code: string;
  join_type?: "normal" | "company";
}

// 인증번호 검증 응답 DTO
export interface VerifyCodeResponseDto {
  message: string;
}
