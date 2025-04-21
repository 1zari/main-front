"use client";
import { Heading } from "@/components/ui/Heading";
import ResumeContainer from "@/features/resume/components/ResumeContainer";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

export default function ApplyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const resumes = ["이력서 1", "이력서 2", "이력서 3"];
  const [selectedResume, setSelectedResume] = useState(resumes[0]);

  return (
    <>
      <nav className="bg-white text-black sticky top-0 z-10">
        <ul className="w-full max-w-7xl mx-auto flex flex-wrap justify-between items-center p-4  gap-5">
          <li onClick={() => window.history.back()} className="font-bold cursor-pointer">
            <FaChevronLeft className="inline-block mr-2" />
          </li>
          <li className="grow text-center font-bold">
            <Heading sizeOffset={2} className="font-bold">
              채용 공고 지원하기
            </Heading>
          </li>
        </ul>
      </nav>
      <div className="p-4  flex flex-col gap-y-4 w-full max-w-7xl mx-auto">
        <Heading sizeOffset={1} className="font-bold">
          제출 할 이력서를 골라주세요
        </Heading>

        <div
          className="relative border rounded-lg px-4 py-3 shadow-sm cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-bold">{selectedResume}</span>
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className={`w-4 h-4 text-green-700 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          {isOpen && (
            <ul className="absolute top-full left-0 mt-1 w-full bg-white border rounded-lg shadow-lg z-10">
              {resumes.map((resume) => (
                <li
                  key={resume}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedResume(resume);
                    setIsOpen(false);
                  }}
                >
                  {resume}
                </li>
              ))}
            </ul>
          )}
        </div>

        <ResumeContainer />
        <div className="flex w-full gap-5">
          <button className="w-full bg-gray-100 p-4 rounded-md">수정하기</button>
          <button className="w-full bg-primary text-white p-4 rounded-md">지원 완료하기</button>
        </div>
      </div>
    </>
  );
}
