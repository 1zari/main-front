import { DefaultSession, DefaultUser } from "next-auth";
import { UserBase } from "./commonUser";
import { UserRole } from "./user";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    refreshToken: string;
    user: UserBase;
  }

  interface User extends DefaultUser, UserBase {
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: UserRole;
  }
}
