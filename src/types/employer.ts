import { UserBase } from "./user";

export type CompanyRole = "employer" | "admin";

export interface EmployerUser extends UserBase {
  role: "employer";
}

export interface EmployerLoginResponse {
  accessToken: string;
  user: EmployerUser;
}

export interface EmployerProfile {
  companyId: string;
  company_name: string;
  establishment?: string;
  company_address?: string;
  company_logo?: string;
  ceo_name?: string;
  business_registration_number?: string;
  company_introduction?: string;
  certificate_image?: string;
  manager_name?: string;
  manager_email?: string;
  manager_phone_number?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
