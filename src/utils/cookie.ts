export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null; // 서버사이드 대응
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};
