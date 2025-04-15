import { useRouter } from "next/navigation";
import { AUTH_ROUTES, LOGIN_CONFIG } from "@/features/auth-common/model/constants/auth.config";

export function useLoginConfig(role: "user" | "company") {
  const router = useRouter();
  const routes = AUTH_ROUTES[role];
  const baseConfig = LOGIN_CONFIG[role];

  return {
    ...baseConfig,
    onEmailFind: () => router.push(routes.emailFind),
    onPasswordFind: () => router.push(routes.passwordFind),
    onSignup: () => router.push(routes.signup),
  };
}
