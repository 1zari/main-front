"use client";

import { Heading } from "@/components/ui/Heading";
import JobPostForm from "@/features/recruit/components/JobPostForm";

import { FaChevronLeft } from "react-icons/fa";

const EditRecruitPage = () => {
  return (
    <div className="bg-gray-z-light pb-10">
      <main className="w-full mx-auto">
        <nav className="bg-white text-black sticky top-0 z-10">
          <ul className="w-full max-w-7xl mx-auto flex flex-wrap justify-between items-center p-4  gap-5">
            <li onClick={() => window.history.back()} className="font-bold cursor-pointer">
              <FaChevronLeft className="inline-block mr-2" />
            </li>
            <li className="grow text-center font-bold ml-[-30px]">
              <Heading sizeOffset={2} className="font-bold">
                채용공고 수정
              </Heading>
            </li>
          </ul>
        </nav>
        <JobPostForm mode="edit" id="1" />
        {/* <RecruitForm mode="Edit" /> */}
      </main>
    </div>
  );
};
export default EditRecruitPage;
