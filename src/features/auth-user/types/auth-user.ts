export interface JobSeekerLoginRequest {
  email: string;
  password: string;
}

export interface JobSeekerLoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: "user";
    created_at: string;
    updated_at: string;
  };
}
