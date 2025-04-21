import React from "react";
import { useRouter } from "next/navigation";
import { PenSquare } from "lucide-react";
import { Heading } from "@/components/ui/Heading";

interface ProfileCardProps {
  role: "user" | "company";
  title: string;
  children: React.ReactNode;
}

export default function ProfileCard({ role, title, children }: ProfileCardProps) {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/${role}/mypage/edit`);
  };

  const displayTitle = role === "user" ? `${title} 님` : title;

  return (
    <div className="w-[calc(100%-2rem)] sm:w-[36rem] md:w-[48rem] lg:w-[64rem] mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-4 sm:p-6 border-b">
        <Heading sizeOffset={2} className="font-bold text-gray-900 break-all">
          {displayTitle}
        </Heading>
        <button
          onClick={handleEditClick}
          className="bg-primary hover:bg-primary/90 text-white px-3 sm:px-4 md:px-5 py-1.5 md:py-2 rounded-lg transition-colors duration-200 font-medium flex items-center gap-2 shadow-sm shrink-0 ml-3 sm:ml-4"
        >
          <PenSquare className="h-4 w-4" />
          <Heading sizeOffset={2} className="hidden sm:inline text-white">
            정보 수정
          </Heading>
          <Heading sizeOffset={2} className="sm:hidden text-white">
            수정
          </Heading>
        </button>
      </div>
      <div className="bg-gray-50/50 rounded-xl m-3 sm:m-4 md:m-5 p-3 sm:p-4 md:p-5 break-words">
        {children}
      </div>
    </div>
  );
}
