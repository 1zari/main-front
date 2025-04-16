import { useState } from "react";
import { VerificationMessage } from "../types/auth";
import { AUTH_MESSAGES } from "../constants/messages";

export function useVerification() {
  const [isVerified, setIsVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState<VerificationMessage>(null);

  const handleVerification = (isValid: boolean) => {
    setIsVerified(isValid);
    setVerificationMessage({
      type: isValid ? "success" : "error",
      text: isValid ? AUTH_MESSAGES.verification.success : AUTH_MESSAGES.verification.error,
    });
  };

  return {
    isVerified,
    verificationMessage,
    handleVerification,
  };
}
