import { UserBase } from "./commonUser";
export interface UserUser extends UserBase {
  role: "user";
  name: string;
}

export interface UserProfile {
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
