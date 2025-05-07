import { useRouter } from "next/navigation";
import { AUTH_ROUTES, LOGIN_CONFIG } from "@/features/auth-common/constants/auth.config";

export function useLoginConfig(join_type: "normal" | "company") {
  const router = useRouter();
  const routes = AUTH_ROUTES[join_type];
  const baseConfig = LOGIN_CONFIG[join_type];

  return {
    ...baseConfig,
    onEmailFind: () => router.push(routes.emailFind),
    onPasswordFind: () => router.push(routes.passwordFind),
    onSignup: () => router.push(routes.signup),
  };
}
