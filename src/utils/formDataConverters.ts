import type { CompanyStepTwoValues } from "@/features/auth-company/ui/signup/CompanySignupStepTwoForm";
import type { UserStepTwoValues } from "@/features/auth-user/ui/signup/UserSignupStepTwoForm";
import type { SignupCompleteRequestDto } from "@/types/api/auth";

// 기업 회원가입 폼 데이터 변환
export interface CompanySignupPayload {
  common_user_id: string;
  company_name: string;
  establishment: string;
  company_address: string;
  business_registration_number: string;
  company_introduction: string;
  certificate_image: File;
  company_logo?: File;
  ceo_name: string;
  manager_name: string;
  manager_phone_number: string;
  manager_email: string;
}

export const convertToCompanyFormData = (payload: CompanySignupPayload): FormData => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value == null) return;

    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
};

// 기업 회원가입 데이터 변환
export const convertCompanySignupData = (
  data: CompanyStepTwoValues,
  commonUserId: string,
): CompanySignupPayload => {
  // 날짜 변환
  const dateObj = new Date(data.startDate);
  const isoDate = dateObj.toISOString();

  // 파일 검증
  const businessFile = data.businessFile?.[0];
  if (!businessFile) {
    throw new Error("사업자등록증이 필요합니다.");
  }

  return {
    common_user_id: commonUserId,
    company_name: data.companyName,
    establishment: isoDate,
    company_address: `${data.companyAddress} ${data.detailAddress}`,
    business_registration_number: data.businessNumber,
    company_introduction: data.companyIntro,
    certificate_image: businessFile,
    company_logo: data.companyLogo?.[0],
    ceo_name: data.representativeName,
    manager_name: data.managerName,
    manager_phone_number: data.managerPhone,
    manager_email: data.managerEmail,
  };
};

// 일반 회원가입 데이터 변환
export const convertUserSignupData = (
  data: UserStepTwoValues,
  commonUserId: string,
): SignupCompleteRequestDto => {
  // 날짜 변환
  const birthDate = new Date(data.birth);
  if (isNaN(birthDate.getTime())) {
    throw new Error("올바르지 않은 생년월일입니다.");
  }
  const isoBirth = birthDate.toISOString();

  return {
    common_user_id: commonUserId,
    name: data.name,
    phone_number: data.phone,
    gender: data.gender!,
    birthday: isoBirth,
    interest: data.interests || [],
    purpose_subscription: data.purposes,
    route: data.channels,
  };
};

// 날짜 유효성 검증 유틸리티
export const validateDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

// 파일 검증 유틸리티
export const validateRequiredFile = (file: File[] | undefined, fieldName: string): File => {
  const uploadedFile = file?.[0];
  if (!uploadedFile) {
    throw new Error(`${fieldName}이(가) 필요합니다.`);
  }
  return uploadedFile;
};
