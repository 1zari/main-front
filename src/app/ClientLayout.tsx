"use client";

import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { FontSizeProvider } from "../hooks/useFontSize";
import { Providers } from "./providers";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <FontSizeProvider>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </FontSizeProvider>
    </Providers>
  );
}
