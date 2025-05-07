import { JoinType } from "./commonUser";
export interface CompanyProfile {
  common_user_id: string;
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

export interface CompanyProfileItem {
  labels: string[];
  value: React.ReactNode;
  isCustom?: boolean;
  isDescription?: boolean;
}

export interface Company {
  join_type: Extract<JoinType, "company">;
}
