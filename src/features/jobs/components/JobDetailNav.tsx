"use client";

import ScrapBtn from "@/components/ScrapBtn";
import { FaChevronLeft } from "react-icons/fa6";

export default function JobDetailNav({ join_type }: { join_type: string }) {
  return (
    <>
      <nav className="sticky top-0 z-10 p-4 text-black bg-white border-b border-gray-200">
        <ul className="flex flex-wrap items-center justify-between w-full gap-5 mx-auto max-w-7xl">
          <li onClick={() => window.history.back()} className="font-bold cursor-pointer">
            <FaChevronLeft className="inline-block mr-2" />
            뒤로가기
          </li>

          <li>
            <div className="flex items-center gap-2">
              {join_type === "normal" && <ScrapBtn showLabel />}
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
