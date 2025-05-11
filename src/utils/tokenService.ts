import { Cookies } from "react-cookie";
import { CookieSetOptions } from "universal-cookie";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

// 클라이언트 사이드 쿠키 인스턴스
const clientCookies = typeof window !== "undefined" ? new Cookies() : null;

// 쿠키 이름 상수
const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

export interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

// 내부 헬퍼 함수
const getCookieHelper = (name: string): string | null => {
  // 클라이언트 사이드
  if (clientCookies) {
    return clientCookies.get(name) || null;
  }
  // 서버 사이드는 null 반환 (서버 컴포넌트에서는 parseServerCookie 사용 필요)
  return null;
};

const setCookieHelper = (name: string, value: string, options?: CookieSetOptions): void => {
  if (!clientCookies) {
    console.warn("쿠키 설정은 클라이언트 사이드에서만 가능합니다.");
    return;
  }

  clientCookies.set(name, value, {
    path: "/",
    sameSite: "lax",
    ...options,
  });
};

const removeCookieHelper = (name: string, options?: CookieSetOptions): void => {
  if (!clientCookies) {
    console.warn("쿠키 삭제는 클라이언트 사이드에서만 가능합니다.");
    return;
  }

  clientCookies.remove(name, {
    path: "/",
    ...options,
  });
};

/**
 * 토큰 및 인증 관련 쿠키 관리 서비스
 * - 쿠키를 통한 토큰 동기화
 * - 토큰 관리 및 인증 상태 처리
 * - 클라이언트/서버 양쪽 지원
 */
export const tokenService = {
  /**
   * 쿠키 값을 가져옵니다.
   */
  getCookie: getCookieHelper,

  /**
   * 쿠키를 설정합니다.
   */
  setCookie: setCookieHelper,

  /**
   * 쿠키를 삭제합니다.
   */
  removeCookie: removeCookieHelper,

  /**
   * 쿠키에서 토큰 가져오기
   */
  getTokens: (): AuthTokens => {
    const accessToken = getCookieHelper(ACCESS_TOKEN_COOKIE);
    const refreshToken = getCookieHelper(REFRESH_TOKEN_COOKIE);
    return { accessToken, refreshToken };
  },

  /**
   * 현재 토큰 상태 가져오기 (쿠키에서만 가져옴)
   */
  getTokensFromCookie: (): AuthTokens => {
    return tokenService.getTokens();
  },

  /**
   * 액세스 토큰 가져오기 (쿠키에서만 가져옴)
   */
  getAccessToken: async (): Promise<string | null> => {
    // 쿠키에서만 확인
    return getCookieHelper(ACCESS_TOKEN_COOKIE);
  },

  /**
   * 리프레시 토큰 가져오기 (쿠키에서만 가져옴)
   */
  getRefreshToken: (): string | null => {
    return getCookieHelper(REFRESH_TOKEN_COOKIE);
  },

  /**
   * 쿠키에 토큰 설정
   */
  setTokens: (accessToken: string, refreshToken: string): void => {
    console.log("토큰 쿠키에 저장됨");

    // 쿠키에 저장 (클라이언트만)
    if (typeof window !== "undefined") {
      // 액세스 토큰: 세션 쿠키 (브라우저 닫으면 만료)
      setCookieHelper(ACCESS_TOKEN_COOKIE, accessToken, {
        path: "/",
        sameSite: "lax",
        secure: window.location.protocol === "https:",
      });

      // 리프레시 토큰: 7일 만료
      const refreshExpires = new Date();
      refreshExpires.setDate(refreshExpires.getDate() + 7);
      setCookieHelper(REFRESH_TOKEN_COOKIE, refreshToken, {
        path: "/",
        expires: refreshExpires,
        sameSite: "lax",
        secure: window.location.protocol === "https:",
      });
    }
  },

  /**
   * 쿠키에서 토큰 제거
   */
  clearTokens: (): void => {
    console.log("토큰 쿠키에서 삭제됨");

    // 쿠키에서 제거 (클라이언트만)
    if (typeof window !== "undefined") {
      removeCookieHelper(ACCESS_TOKEN_COOKIE);
      removeCookieHelper(REFRESH_TOKEN_COOKIE);
    }
  },
};

/**
 * 서버 컴포넌트에서 쿠키를 읽기 위한 유틸리티
 */
export const parseServerCookie = (
  cookieStore: ReadonlyRequestCookies,
  name: string,
): string | undefined => {
  return cookieStore.get(name)?.value;
};

// 하위 호환성을 위한 내보내기
export const authHelpers = tokenService;
export const getCookie = tokenService.getCookie;
export const setCookie = tokenService.setCookie;
export const deleteCookie = tokenService.removeCookie;
