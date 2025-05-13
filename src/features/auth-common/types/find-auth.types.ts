import { FieldErrors, UseFormRegister } from "react-hook-form";

// Common Types
export type AuthType = "normal" | "company";

export type VerificationMessage = {
  type: "success" | "error";
  text: string;
} | null;

export type CommonFormFields = {
  name?: string;
  companyName?: string;
  businessNumber?: string;
  phone?: string;
  code?: string;
  email: string;
};

// Find Email Types
export type FindEmailStep = "input" | "verified";

export type FindEmailFormFields = CommonFormFields;

export interface FindEmailBaseFormProps {
  type: AuthType;
  email: string;
  name: string;
  step: FindEmailStep;
  isVerified: boolean;
  verificationMessage: VerificationMessage;
  register: UseFormRegister<FindEmailFormFields>;
  errors: FieldErrors<FindEmailFormFields>;
  onVerifyCode: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

// Find Password Types
export type FindPasswordStep = "input" | "verify" | "reset";

export interface FindPasswordFormFields extends CommonFormFields {
  email: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface FindPasswordBaseFormProps {
  type: AuthType;
  step: FindPasswordStep;
  isVerified: boolean;
  verificationMessage: VerificationMessage;
  register: UseFormRegister<FindPasswordFormFields>;
  errors: FieldErrors<FindPasswordFormFields>;
  onVerifyCode: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onPasswordReset: (data: { newPassword: string; confirmPassword: string }) => void;
}
