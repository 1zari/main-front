// 로그인 폼, 응답 데이터 타입
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User & {
    createdAt: string;
    updatedAt: string;
  };
}

export type UserRole = "jobseeker" | "employer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
