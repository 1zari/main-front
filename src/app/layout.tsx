import Script from "next/script";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
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
        {/* ✅ Kakao SDK 스크립트 삽입 */}
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <FontSizeProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </FontSizeProvider>
      </body>
    </html>
  );
}
