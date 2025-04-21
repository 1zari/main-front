export type UserRole = "user" | "company" | "admin";

export interface UserBase {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
