export interface EmployerLoginRequest {
  email: string;
  password: string;
}

export interface EmployerLoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: "employer";
    createdAt: string;
    updatedAt: string;
  };
}
