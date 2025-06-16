// src/lib/auth/helpers.ts
import CredentialsProvider from "next-auth/providers/credentials";

export function createCredentialsProvider(id: string, name: string, loginFn: any) {
  return CredentialsProvider({
    id,
    name,
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials) return null;

      const result = await loginFn({
        email: credentials.email,
        password: credentials.password,
      });

      if (!result || !result.user) return null;

      return {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        join_type: result.user.join_type,
        accessToken: result.access_token,
        refreshToken: result.refresh_token,
      };
    },
  });
}
