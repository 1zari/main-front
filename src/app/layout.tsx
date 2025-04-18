"use client";

import Script from "next/script";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { FontSizeProvider } from "../hooks/useFontSize";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <Script
          src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <SessionProvider>
          <FontSizeProvider>
            <Navigation />
            <main>{children}</main>
            <Footer />
          </FontSizeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
