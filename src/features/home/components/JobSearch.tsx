"use client";

import SearchPage from "@/components/SearchPage";
import { Heading } from "@/components/ui/Heading";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
export default function JobSearch() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="w-full max-w-7xl  mx-auto my-8 px-4">
        <div className="flex flex-col mb-6 items-center">
          <Heading sizeOffset={3} className="text-2xl font-semibold py-6">
            일자리, 손쉽게 찾아볼까요?⚡️
          </Heading>
          <div className="w-full max-w-2xl flex gap-2 mt-4 justify-between items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="w-full max-w-2xl border border-gray-300 px-4 py-3 rounded-md flex justify-between items-center text-gray-500 hover:shadow-md transition-shadow"
            >
              관심있는 일자리를 알려주세요.
              <span className="text-lg">
                <IoSearchSharp />
              </span>
            </button>
          </div>
          <div className="max-w-2xl flex gap-2 mt-4 justify-between items-center">
            <div className="flex flex-wrap gap-x-2 gap-y-3 mt-4">
              <button className="bg-gray-z-light text-gray-700 px-4 py-1 rounded-2xl">
                공공 일자리
              </button>
              <button className="bg-gray-z-light text-gray-700 px-4 py-1 rounded-2xl">사무</button>
              <button className="bg-gray-z-light text-gray-700 px-4 py-1 rounded-2xl">
                서비스
              </button>
              <button className="bg-gray-z-light text-gray-700 px-4 py-1 rounded-2xl">
                기술직
              </button>
              <button className="bg-gray-z-light text-gray-700 px-4 py-1 rounded-2xl">
                교육/강사
              </button>
              <button className="bg-gray-z-light text-gray-700 px-4 py-1 rounded-2xl">
                운전/배송
              </button>
              <button className="bg-gray-z-light text-gray-700 px-4 py-1 rounded-2xl">
                그 외 일자리
              </button>
            </div>
          </div>
        </div>
      </section>
      {isOpen && (
        <div className="fixed inset-0 z-9999 flex justify-center items-end bg-black/40 backdrop-blur-sm">
          <div className="w-full h-full  bg-white rounded-t-2xl p-4 animate-slide-up shadow-lg">
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm text-gray-400 mb-4 float-right"
            >
              닫기 ✕
            </button>
            <SearchPage />
          </div>
        </div>
      )}
    </>
  );
}
