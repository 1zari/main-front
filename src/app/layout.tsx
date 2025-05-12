import ConfirmModal from "@/components/common/ConfirmModal";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import QueryProvider from "../components/providers/QueryProvider";
import ClientLayout from "./ClientLayout";
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
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services&autoload=false`}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <QueryProvider>
          <ClientLayout>
            <Toaster position="top-center" reverseOrder={false} />
            <main>{children}</main>
            <ConfirmModal />
          </ClientLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
