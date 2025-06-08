// 2025.06.08)admin 타입 추가하여 middleware 타입 에러 해결
export type JoinType = "normal" | "company" | "admin";

// 기존 UserRole 타입을 JoinType으로 대체
export type UserRole = JoinType; // 하위 호환성을 위해 UserRole 타입 유지

export interface UserBase {
  id: string;
  email: string;
  join_type: JoinType;
  name: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}
