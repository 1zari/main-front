export interface EmployerLoginRequest {
  email: string;
  password: string;
}

export interface EmployerLoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: "company";
    created_at: string;
    updated_at: string;
  };
}
