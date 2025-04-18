"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"user" | "employer">("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        role: activeTab,
        redirect: false,
      });

      if (result?.error) {
        alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        return;
      }

      // 역할에 따른 리다이렉션
      router.push(activeTab === "employer" ? "/employer/dashboard" : "/user/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, {
      callbackUrl: `/auth/social-signup?provider=${provider}`,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image src="/images/logo.png" alt="로고" width={150} height={150} className="mx-auto" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">로그인</h2>
        </div>

        {/* 탭 버튼 */}
        <div className="flex rounded-md shadow-sm mb-6" role="group">
          <button
            type="button"
            onClick={() => setActiveTab("user")}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-lg border
              ${
                activeTab === "user"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
          >
            개인회원
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("employer")}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-lg border
              ${
                activeTab === "employer"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
          >
            기업회원
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="이메일"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="비밀번호"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </div>
        </form>

        {/* 소셜 로그인 버튼 (개인회원 탭에서만 표시) */}
        {activeTab === "user" && (
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">간편 로그인</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialLogin("kakao")}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-[#FEE500] text-sm font-medium text-gray-700 hover:bg-[#FEE500]/90"
              >
                카카오 로그인
              </button>
              <button
                onClick={() => handleSocialLogin("naver")}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-[#03C75A] text-sm font-medium text-white hover:bg-[#03C75A]/90"
              >
                네이버 로그인
              </button>
            </div>
          </div>
        )}

        <div className="text-center">
          <a href="/auth/signup" className="text-sm text-gray-600 hover:text-primary">
            아직 회원이 아니신가요? 회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
