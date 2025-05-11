import { JoinType } from "@/types/commonUser";
import { tokenService } from "@/utils/tokenService";

export const callbacks = {
  async jwt({ token, account }) {
    // Only proceed if we have an account with tokens
    if (account?.access_token) {
      try {
        // NEXT_PUBLIC_API_URL 환경 변수의 설정값 확인
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://senior-naeil.life/api";

        // provider에 따라 엔드포인트 분기
        let providerEndpoint = "";
        if (account.provider === "kakao") {
          providerEndpoint = "/user/oauth/kakao/login/";
        } else if (account.provider === "naver") {
          providerEndpoint = "/user/oauth/naver/login/";
        }

        if (providerEndpoint) {
          // fetch 요청 전 값 출력
          console.log(`[fetch 요청 전][${account.provider}]`, {
            apiUrl,
            access_token: account.access_token,
            refresh_token: account.refresh_token,
          });

          // 소셜 액세스 토큰으로 백엔드에 요청
          const response = await fetch(`${apiUrl}${providerEndpoint}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              access_token: account.access_token,
              refresh_token: account.refresh_token,
            }),
          });

          // fetch 요청 후 응답 상태 출력
          console.log(`[fetch 응답][${account.provider}]`, response.status, response.statusText);

          // Check if response is ok before parsing
          if (!response.ok) {
            const text = await response.text();
            console.error("API Error:", response.status, text.substring(0, 200));
            // 로그만 남기고 흐름은 계속하도록 함
            console.error(`API error: ${response.status}`);
          } else {
            const data = await response.json();
            // 응답 데이터 출력
            console.log(`[fetch 응답 데이터][${account.provider}]`, data);

            // 백엔드에서 받은 토큰을 NextAuth 토큰에 저장
            if (data.access_token) {
              token.accessToken = data.access_token;
              token.refreshToken = data.refresh_token;
              token.id = data.common_user_id;
              token.name = data.name;
              token.email = data.email;
              token.join_type = data.join_type;

              // 백엔드 JWT 토큰을 쿠키에도 저장
              // 클라이언트 사이드에서만 실행됨 (서버 사이드에서는 무시됨)
              try {
                tokenService.setTokens(data.access_token, data.refresh_token);
              } catch (error) {
                console.error("토큰 쿠키 저장 실패:", error);
              }
            }

            console.log("Login successful:", data);
          }
        }
      } catch (error) {
        console.error("JWT Callback Error:", error);
        // Don't throw the error, just log it to prevent breaking the auth flow
      }
    }

    return token;
  },

  async session({ session, token }) {
    session.user = {
      id: token.id as string,
      name: token.name as string,
      email: token.email as string,
      join_type: (token.join_type as JoinType) || "normal",
      accessToken: token.accessToken as string,
      refreshToken: token.refreshToken as string,
    };
    return session;
  },
};
