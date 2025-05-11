"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>("인증 과정에서 오류가 발생했습니다.");

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      switch (error) {
        case "OAuthSignin":
          setErrorMessage("소셜 로그인 시작 중 오류가 발생했습니다.");
          break;
        case "OAuthCallback":
          setErrorMessage("소셜 로그인 콜백 처리 중 오류가 발생했습니다.");
          break;
        case "OAuthCreateAccount":
          setErrorMessage("소셜 계정으로 사용자 생성 중 오류가 발생했습니다.");
          break;
        case "EmailCreateAccount":
          setErrorMessage("이메일 계정 생성 중 오류가 발생했습니다.");
          break;
        case "Callback":
          setErrorMessage("콜백 처리 중 오류가 발생했습니다.");
          break;
        case "AccessDenied":
          setErrorMessage("접근이 거부되었습니다.");
          break;
        case "Configuration":
          setErrorMessage("인증 설정에 문제가 있습니다.");
          break;
        default:
          setErrorMessage(`인증 중 오류가 발생했습니다: ${error}`);
      }
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-red-500">인증 오류</h1>
        <p className="mb-6 text-gray-700">{errorMessage}</p>
        <div className="flex gap-4">
          <Link
            href="/auth/login"
            className="px-4 py-2 text-white transition-colors bg-primary rounded hover:bg-primary/90"
          >
            로그인 페이지로 돌아가기
          </Link>
          <Link
            href="/"
            className="px-4 py-2 text-primary transition-colors border border-primary rounded hover:bg-gray-50"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
