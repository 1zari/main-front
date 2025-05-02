import { DefaultSession } from "next-auth";
import { JoinType } from "./commonUser";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name?: string;
      join_type: JoinType;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    image?: string | null;
    join_type: JoinType;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    provider?: string;
    join_type: JoinType;
  }
}
