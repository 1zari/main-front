import Script from "next/script";
import { Providers } from "./providers";
import ConfirmModal from "@/components/common/ConfirmModal";
import NavigationBar from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import { metadata } from "./metadata";
//import CSRFInit from "./_components/CSRFInit";

export { metadata };

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
        <Providers>
          <NavigationBar />
          <main>{children}</main>
          <Footer />
          <ConfirmModal />
        </Providers>
      </body>
    </html>
  );
}
