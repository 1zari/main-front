import Script from "next/script";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import QueryProvider from "../components/providers/QueryProvider";
import { FontSizeProvider } from "../hooks/useFontSize";
import "./globals.css";

export const metadata = {
  title: "시니어내일",
  description: "시니어를 위한 채용 플랫폼",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* ✅ Kakao SDK 스크립트 삽입 */}
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <QueryProvider>
          <FontSizeProvider>
            <Navigation />
            <main>{children}</main>
            <Footer />
          </FontSizeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
