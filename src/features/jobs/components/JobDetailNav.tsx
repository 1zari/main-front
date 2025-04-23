"use client";

import { FaChevronLeft } from "react-icons/fa6";
import SaveBtn from "../../../components/SaveBtn";

export default function JobDetailNav() {
  return (
    <>
      <nav className="bg-white text-black p-4 sticky top-0 z-10 border-b border-gray-200">
        <ul className="w-full max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-5">
          <li onClick={() => window.history.back()} className="font-bold cursor-pointer">
            <FaChevronLeft className="inline-block mr-2" />
            뒤로가기
          </li>

          <li>
            <div className="flex items-center  gap-2">
              <SaveBtn showLabel />
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}
