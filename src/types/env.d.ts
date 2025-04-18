declare namespace NodeJS {
  interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    KAKAO_CLIENT_ID: string;
    KAKAO_CLIENT_SECRET: string;
    NAVER_CLIENT_ID: string;
    NAVER_CLIENT_SECRET: string;
    NEXT_PUBLIC_API_URL: string;
  }
}
