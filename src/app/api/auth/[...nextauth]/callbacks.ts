import { JoinType } from "@/types/commonUser";

export const callbacks = {
  async jwt({ token, account }) {
    // Only proceed if we have an account with tokens
    if (account?.access_token) {
      try {
        // NEXT_PUBLIC_API_URL 환경 변수의 설정값 확인
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://senior-naeil.life/api";

        // 카카오 액세스 토큰으로 백엔드에 요청
        const response = await fetch(`${apiUrl}/user/oauth/kakao/login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            // 카카오에서 발급한 액세스 토큰을 백엔드로 전송하면,
            // 백엔드에서 이 토큰을 통해 필요한 사용자 정보를 조회할 수 있음
          }),
        });

        // Check if response is ok before parsing
        if (!response.ok) {
          const text = await response.text();
          console.error("API Error:", response.status, text.substring(0, 200));

          // 로그만 남기고 흐름은 계속하도록 함
          console.error(`API error: ${response.status}`);
        } else {
          const data = await response.json();
          return data;
        }
      } catch (error) {
        console.error("JWT Callback Error:", error);
        // Don't throw the error, just log it to prevent breaking the auth flow
      }
    }

    return token;
  },

  async session({ session, token }) {
    session.user.id = token.id as string;
    session.user.name = token.name as string;
    session.user.email = token.email as string;
    session.user.join_type = (token.join_type as JoinType) || "normal";
    session.accessToken = token.accessToken as string;
    session.refreshToken = token.refreshToken as string;
    return session;
  },
};
