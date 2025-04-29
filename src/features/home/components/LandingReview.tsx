"use client";

import { useRef } from "react";
export default function LandingReview({ className }: { className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const reviews = [
    {
      id: 1,
      content: "정말 좋은 경험이었어요!",
      author: "김영수",
      image: "/avatars/senior-man-1.jpg",
    },
    {
      id: 2,
      content: "다음에도 꼭 이용하고 싶어요.",
      author: "이정은",
      image: "/avatars/senior-woman-1.jpg",
    },
    {
      id: 3,
      content: "친절하게 안내해주셔서 감사했어요.",
      author: "박철수",
      image: "/avatars/senior-man-2.jpg",
    },
    {
      id: 4,
      content: "시니어를 위한 좋은 서비스예요.",
      author: "최민지",
      image: "/avatars/senior-woman-2.jpg",
    },
    {
      id: 5,
      content:
        "서비스를 받고 나서 삶의 질이 달라졌어요. 시니어를 위한 맞춤형 접근이 정말 인상 깊었습니다.",
      author: "이순자",
      image: "/avatars/senior-woman-1.jpg",
    },
    {
      id: 6,
      content:
        "복잡한 절차 없이 쉽게 이용할 수 있어서 너무 편리했어요. 덕분에 불편함 없이 진행할 수 있었어요.",
      author: "한상철",
      image: "/avatars/senior-man-1.jpg",
    },
    {
      id: 7,
      content:
        "필요했던 정보들이 잘 정리되어 있어서 도움이 많이 되었어요. 주변 지인들에게도 적극 추천했어요.",
      author: "정명희",
      image: "/avatars/senior-woman-2.jpg",
    },
    {
      id: 8,
      content: "처음에는 반신반의했는데 직접 이용해보니 너무 만족스러웠습니다. 좋은 경험이었어요.",
      author: "오병철",
      image: "/avatars/senior-man-2.jpg",
    },
  ];

  return (
    <div className={className}>
      <section className="w-full max-w-7xl  mx-auto my-8 px-4">
        <div className="flex flex-col mb-6 items-center">
          <h2 className="text-2xl font-semibold py-6">생생한 후기가 있어요 🙂</h2>
          <div className="relative w-full pt-10">
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
            <div
              ref={scrollRef}
              className="w-full overflow-x-auto pt-10 scrollbar-hide scroll-smooth"
            >
              <div className="flex gap-4 min-w-max px-1">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex-shrink-0 w-55 mb-5 bg-white shadow-sm p-4 rounded-md flex flex-col items-center text-center"
                  >
                    <img
                      src={review.image}
                      alt={`${review.author} 아바타`}
                      className="w-30 h-30 object-cover rounded-full mt-2 mb-5"
                    />
                    <p className="text-sm text-gray-700 mb-2">"{review.content}"</p>
                    <p className="text-xs text-gray-500">- {review.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
