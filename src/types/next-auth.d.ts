import { DefaultSession, DefaultUser } from "next-auth";
import { JoinType } from "./commonUser";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      join_type: JoinType;
    };
    accessToken?: string;
    refreshToken?: string;
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    join_type: JoinType;
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    join_type: JoinType;
    accessToken?: string;
    refreshToken?: string;
  }
}
