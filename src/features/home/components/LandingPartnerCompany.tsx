"use client";
import { useRef } from "react";

export default function LandingPartnerCompany({ className }: { className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };
  const partnerLogos = [
    {
      src: "https://blog.kakaocdn.net/dn/oK4eO/btstG8nGf5o/TrsC4kKH8umv4jJ4BBC4FK/img.png",
      alt: "Company 1",
    },
    {
      src: "https://50plus.or.kr/upload/im/2025/01/03c4a065-5174-4c8a-a313-aedc789a7b2b.png",
      alt: "Company 2",
    },
    { src: "https://www.gjf.or.kr/main/images/common/logo.svg", alt: "Company 3" },
    { src: "https://www.gc.go.kr/design/main/img/common/h1_logo.png", alt: "Company 4" },
    {
      src: "https://wiki1.kr/images/thumb/d/d7/%EC%9D%B8%EC%B2%9C%EA%B4%91%EC%97%AD%EC%8B%9C_%EA%B8%80%EC%9E%90.png/300px-%EC%9D%B8%EC%B2%9C%EA%B4%91%EC%97%AD%EC%8B%9C_%EA%B8%80%EC%9E%90.png",
      alt: "Company 5",
    },
    {
      src: "https://blog.kakaocdn.net/dn/sYIfu/btqwx2UHXws/iYNMv58dIMfX5N9YCw9CKK/img.jpg",
      alt: "Company 6",
    },
    {
      src: "https://blog.kakaocdn.net/dn/DQbaa/btqw9N2wZOK/eIJjqgToPiHg5TnkelZNxK/img.jpg",
      alt: "Company 7",
    },
    {
      src: "https://blog.kakaocdn.net/dn/cOISGX/btqwHqA60Mr/niiVd4C5LV7xarRdXmadgK/img.jpg",
      alt: "Company 8",
    },
    {
      src: "https://blog.kakaocdn.net/dn/IjKNd/btqwT26SoEW/9pKjrfEPalK4oxFtJi6k91/img.jpg",
      alt: "Company 9",
    },
  ];

  return (
    <div className={className}>
      <section className="w-full max-w-7xl  mx-auto my-8 px-4">
        <div className="flex flex-col mb-6 items-center">
          <h2 className="text-2xl font-semibold py-6">함께하는 기업들이에요 😊</h2>
          <div className="relative w-full py-10">
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 flex justify-center items-center rounded-full shadow-md"
            >
              ◀
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 flex justify-center items-center rounded-full shadow-md"
            >
              ▶
            </button>
            <div ref={scrollRef} className="w-full overflow-x-auto scrollbar-hide scroll-smooth">
              <div className="flex gap-6 mt-4 mb-5 min-w-max px-10">
                {partnerLogos.map((logo, index) => (
                  <img key={index} src={logo.src} alt={logo.alt} className="h-12 object-contain" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
