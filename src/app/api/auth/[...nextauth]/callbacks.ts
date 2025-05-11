import { JoinType } from "@/types/commonUser";
import { tokenService } from "@/utils/tokenService";

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
            // 카카오에서 발급한 액세스 토큰을 백엔드로 전송하면,
            // 백엔드에서 이 토큰을 통해 필요한 사용자 정보를 조회할 수 있음
            access_token: account.access_token,
            refresh_token: account.refresh_token,
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

          // 백엔드에서 받은 토큰을 NextAuth 토큰에 저장
          if (data.accessToken) {
            token.accessToken = data.accessToken;
            token.refreshToken = data.refreshToken;

            // 백엔드 JWT 토큰을 쿠키에도 저장
            // 클라이언트 사이드에서만 실행됨 (서버 사이드에서는 무시됨)
            try {
              tokenService.setTokens(data.accessToken, data.refreshToken);
            } catch (error) {
              console.error("토큰 쿠키 저장 실패:", error);
            }

            // 사용자 정보가 있으면 토큰에 저장
            if (data.user) {
              token.id = data.user.id;
              token.name = data.user.name;
              token.email = data.user.email;
              token.join_type = data.user.join_type;
            }
          }

          console.log("Login successful:", data);
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
