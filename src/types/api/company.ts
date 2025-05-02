// 기업 회원 정보 관리 관련 타입

// 기업 회원 정보 수정 요청 DTO
export interface UpdateCompanyInfoRequestDto {
  company_name?: string;
  representative_name?: string;
  phone_number?: string;
  business_number?: string;
  company_address?: string;
  company_logo?: string;
}

// 기업 회원 정보 수정 응답 DTO
export interface UpdateCompanyInfoResponseDto {
  id: string;
  email: string;
  company_name: string;
  representative_name: string;
  phone_number: string;
  business_number: string;
  company_address: string | null;
  company_logo: string | null;
  is_verified: boolean;
  updated_at: string;
}

// 기업 회원 이메일 찾기 요청 DTO
export interface CompanyFindEmailRequestDto {
  representative_name: string;
  business_number: string;
  phone_number: string;
}

// 기업 회원 이메일 찾기 응답 DTO
export interface CompanyFindEmailResponseDto {
  email: string;
  company_name: string;
  message: string;
}

// 기업 회원 비밀번호 재설정 요청 DTO
export interface CompanyResetPasswordRequestDto {
  email: string;
  business_number: string;
  new_password: string;
  verification_code: string;
}

// 기업 회원 비밀번호 재설정 응답 DTO
export interface CompanyResetPasswordResponseDto {
  message: string;
  email: string;
  company_name: string;
  updated_at: string;
}
