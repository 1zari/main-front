export type JoinType = "normal" | "company";

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
