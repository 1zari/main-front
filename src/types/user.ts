import { JoinType } from "./commonUser";

export interface User {
  join_type: Extract<JoinType, "user">;
  name: string;
}

export interface UserProfile {
  user_id: string;
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

export interface UserProfileItem {
  labels: string[];
  value: React.ReactNode;
  isCustom?: boolean;
  isDescription?: boolean;
}
