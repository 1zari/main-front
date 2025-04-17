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
    role: "jobseeker";
    createdAt: string;
    updatedAt: string;
  };
}
