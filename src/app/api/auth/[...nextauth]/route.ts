import NextAuth, { NextAuthOptions } from "next-auth";
import { providers } from "./providers";
import { callbacks } from "./callbacks";
import { pages } from "./config";

export const authOptions: NextAuthOptions = {
  providers,
  pages,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks,
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
