import type { UseFormSetError, FieldValues, Path } from "react-hook-form";
import { useModalStore } from "@/store/useModalStore";
import { SIGNUP_CONSTANTS } from "@/constants/signup";
import { handleBusinessVerificationError } from "@/utils/errorHandlers";
import { authApi } from "@/api/auth";

interface UseBusinessVerificationProps<T extends FieldValues> {
  setError: UseFormSetError<T>;
  representativeNameField: Path<T>;
  businessNumberField: Path<T>;
  startDateField: Path<T>;
}

export const useBusinessVerification = <T extends FieldValues>({
  setError,
  representativeNameField,
  businessNumberField,
  startDateField,
}: UseBusinessVerificationProps<T>) => {
  const showModal = useModalStore((s) => s.showModal);

  const verifyBusiness = async (
    representativeName: string,
    businessNumber: string,
    startDate: string,
  ) => {
    let hasError = false;

    if (!representativeName) {
      setError(representativeNameField, {
        type: "manual",
        message: "대표자 성함을 입력해주세요.",
      });
      hasError = true;
    }

    if (!businessNumber) {
      setError(businessNumberField, {
        type: "manual",
        message: "사업자등록번호를 입력해주세요.",
      });
      hasError = true;
    }

    if (!startDate) {
      setError(startDateField, {
        type: "manual",
        message: "개업년월일을 선택해주세요.",
      });
      hasError = true;
    }

    if (hasError) return;

    try {
      const dateObj = new Date(startDate);
      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date");
      }
      const formattedDate = dateObj.toISOString().split("T")[0];

      console.log("사업자 인증 요청 payload:", {
        b_no: businessNumber,
        p_nm: representativeName,
        start_dt: formattedDate,
      });

      const response = await authApi.verify.checkBusiness(
        businessNumber,
        representativeName,
        formattedDate,
      );

      console.log("사업자등록 인증 응답:", response);

      showModal({
        title: response.valid ? "인증 성공" : "⚠️ 인증 실패",
        message: response.valid
          ? SIGNUP_CONSTANTS.MESSAGES.INFO.BUSINESS_VALID
          : SIGNUP_CONSTANTS.MESSAGES.INFO.BUSINESS_INVALID,
        confirmText: SIGNUP_CONSTANTS.MODAL_BUTTONS.CONFIRM,
        onConfirm: () => {},
      });

      return response.valid;
    } catch (error) {
      handleBusinessVerificationError(error, showModal);
      return false;
    }
  };

  return {
    verifyBusiness,
  };
};
