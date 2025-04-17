import { UserBase } from "./user";
export interface JobSeekerUser extends UserBase {
  role: "jobseeker";
  name: string;
}

export interface JobSeekerProfile {
  userId: string;
  name: string;
  gender?: string;
  birthday?: string;
  phone_number?: string;
  interest?: string[];
  wish_work_place?: string[];
  purpose_subscription?: string[];
  route?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
