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
