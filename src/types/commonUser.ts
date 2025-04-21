export type UserRole = "user" | "company" | "admin";

export interface UserBase {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}
