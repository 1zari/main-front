import { Heading } from "@/components/ui/Heading";
import Link from "next/link";

import { FaChevronLeft } from "react-icons/fa";
export default function BackNavOnApplicatns() {
  return (
    <>
      <nav className="bg-white text-black sticky top-0 z-10">
        <ul className="w-full max-w-7xl mx-auto flex flex-wrap justify-between items-center p-4  gap-5">
          <li className="font-bold cursor-pointer">
            <Link href="/applicants">
              <FaChevronLeft className="inline-block mr-2" />
            </Link>
          </li>
          <li className="grow text-center font-bold">
            <Heading sizeOffset={2} className="font-bold">
              지원서
            </Heading>
          </li>
        </ul>
      </nav>
    </>
  );
}
