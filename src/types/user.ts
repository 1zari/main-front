export type UserRole = "jobseeker" | "employer" | "admin";

export interface UserBase {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
