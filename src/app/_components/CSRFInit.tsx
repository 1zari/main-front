"use client";
import { useEffect } from "react";

export default function CSRFInit() {
  useEffect(() => {
    // 앱 진입 시 CSRF 쿠키 받아오기
    fetch("https://senior-naeil.life/api/csrf/", {
      method: "GET",
      credentials: "include", // 쿠키 저장 허용
    });
  }, []);

  return null;
}
