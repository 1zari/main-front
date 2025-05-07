// 일반 회원 정보 수정 요청 DTO
export interface UpdateUserInfoRequestDto {
  name: string;
  phone_number: string;
  gender: string;
  birthday: string | null;
  interest: string[];
  purpose_subscription: string[];
  route: string[];
}

// 일반 회원 정보 수정 응답 DTO
export interface UpdateUserInfoResponseDto {
  message: "User info updated successfully.";
  name: string;
  phone_number: string;
  gender: string;
  birthday: string | null;
  interest: string[];
  purpose_subscription: string[];
  route: string[];
}

// 일반 회원 이메일 찾기 요청 DTO
export interface UserFindEmailRequestDto {
  phone_number: string;
}

// 일반 회원 이메일 찾기 응답 DTO
export interface UserFindEmailResponseDto {
  email: string;
}

// 일반 회원 비밀번호 재설정 요청 DTO
export interface UserResetPasswordRequestDto {
  email: string;
  phone_number: string;
  new_password: string;
}

// 일반 회원 비밀번호 재설정 응답 DTO
export interface UserResetPasswordResponseDto {
  message: "Password reset successful.";
}

// 일반 회원 정보 조회 응답 DTO
export interface UserProfileResponseDto {
  message: "User info retrieved successfully.";
  common_user_id: string;
  email: string;
  join_type: string;
  name: string;
  phone_number: string;
  gender: string;
  birthday: string | null;
  interest: string[];
  purpose_subscription: string[];
  route: string[];
}

// 일반 회원 정보 수정 요청 DTO
export interface UpdateUserProfileDto {
  name: string;
  phone_number: string;
  gender: string;
  birthday: string | null;
  interest: string[];
  purpose_subscription: string[];
  route: string[];
}

// 일반 회원 정보 수정 응답 DTO
export interface UpdateUserProfileResponseDto {
  message: "User info updated successfully.";
  name: string;
  phone_number: string;
  gender: string;
  birthday: string | null;
  interest: string[];
  purpose_subscription: string[];
  route: string[];
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
