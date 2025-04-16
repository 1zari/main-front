export type AuthType = "user" | "company";
export type FindStep = "input" | "verified";
export type VerificationMessage = {
  type: "success" | "error";
  text: string;
} | null;
