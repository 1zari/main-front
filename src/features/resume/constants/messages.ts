export const SUCCESS_MESSAGES = {
  RESUME_CREATED: "이력서가 성공적으로 등록되었습니다.",
  RESUME_UPDATED: "이력서가 성공적으로 수정되었습니다.",
  RESUME_DELETED: "이력서가 삭제되었습니다.",
} as const;

export const ERROR_MESSAGES = {
  VALIDATION_FAILED: "입력한 정보를 다시 확인해주세요.",
  MISSING_RESUME_ID: "이력서 ID가 필요합니다.",
  CREATE_FAILED: "이력서 등록에 실패했습니다.",
  UPDATE_FAILED: "이력서 수정에 실패했습니다.",
  NETWORK_ERROR: "네트워크 오류가 발생했습니다. 다시 시도해주세요.",
  SERVER_ERROR: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  UNKNOWN_ERROR: "알 수 없는 오류가 발생했습니다.",
} as const;
