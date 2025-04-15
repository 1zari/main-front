import { UserRole } from "@/features/auth-user/model/types";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  }
}
