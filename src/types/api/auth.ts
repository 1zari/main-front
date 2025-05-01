// 회원가입 요청 DTO
export interface SignupRequestDto {
  email: string;
  join_type: string;
  password: string;
}

// 회원가입 응답 DTO
export interface SignupResponseDto {
  common_user_id: string;
  email: string;
  join_type: string;
  is_active: boolean;
  is_staff: boolean;
  last_login: string | null;
}

// 로그인 요청 DTO
export interface LoginRequestDto {
  email: string;
  password: string;
}

// 로그인 응답 DTO
export interface LoginResponseDto {
  message: "로그인 성공";
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
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
