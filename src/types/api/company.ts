// 기업 회원 정보 수정 요청 DTO
export interface UpdateCompanyInfoRequestDto {
  company_name: string;
  establishment: string;
  company_address: string;
  business_registration_number: string;
  company_introduction: string;
  ceo_name: string;
  manager_name: string;
  manager_phone_number: string;
  manager_email: string;
}

// 기업 회원 정보 수정 응답 DTO
export interface UpdateCompanyInfoResponseDto {
  message: "Company info updated successfully.";
  company_name: string;
  establishment: string;
  company_address: string;
  business_registration_number: string;
  company_introduction: string;
  ceo_name: string;
  manager_name: string;
  manager_phone_number: string;
  manager_email: string;
}

// 기업 회원 이메일 찾기 요청 DTO
export interface CompanyFindEmailRequestDto {
  phone_number: string;
  business_registration_number: string;
}

// 기업 회원 이메일 찾기 응답 DTO
export interface CompanyFindEmailResponseDto {
  email: string;
}

// 기업 회원 비밀번호 재설정 요청 DTO
export interface CompanyResetPasswordRequestDto {
  email: string;
  phone_number: string;
  business_registration_number: string;
  new_password: string;
}

// 기업 회원 비밀번호 재설정 응답 DTO
export interface CompanyResetPasswordResponseDto {
  message: "Password reset successful.";
}

export interface CompanyProfileResponseDto {
  message: "Company info retrieved successfully.";
  common_user_id: string;
  email: string;
  join_type: string;
  company_name: string;
  establishment: string;
  company_address: string;
  business_registration_number: string;
  company_introduction: string;
  ceo_name: string;
  manager_name: string;
  manager_phone_number: string;
  manager_email: string;
  certificate_image: string;
  company_logo: string | null;
}
