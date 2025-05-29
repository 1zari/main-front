import { ResumeFormData } from "../validation/resumeSchema";

export interface ResumeFormProps {
  mode: "create" | "edit";
  resumeId?: string;
  defaultValues?: ResumeFormData;
}

export interface ResumeApiResponse {
  resume: {
    resume_id: string;
    [key: string]: unknown;
  };
}

export interface ApiError {
  message?: string;
  [key: string]: unknown;
}

export type ExperienceFormData = {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
};

export type CertificationFormData = {
  name: string;
  issuer: string;
  date: string;
};
