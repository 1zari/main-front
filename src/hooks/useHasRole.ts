import { useAuthStore } from "@/store/useAuthStore";
import { UserRole } from "@/types/commonUser";

export const useHasRole = (roles: UserRole[]) => {
  const user = useAuthStore((state) => state.user);

  if (!user) return false;
  return roles.includes(user.role);
};
