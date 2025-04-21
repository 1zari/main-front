import React from "react";
import { useRouter } from "next/navigation";
import { PenSquare } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { UserRole } from "@/types/commonUser";

export interface ProfileItem {
  labels: string[];
  value: React.ReactNode;
  isCustom?: boolean;
  isDescription?: boolean;
}

interface ProfileCardProps {
  role: UserRole;
  title: string;
  items: ProfileItem[];
}

const ProfileLabel = ({
  labels,
  isEmployer = false,
}: {
  labels: string[];
  isEmployer?: boolean;
}) => {
  return (
    <span
      className={`${isEmployer ? "min-w-32 mr-8" : "w-32"} text-gray-500 font-medium flex flex-wrap items-center gap-1`}
    >
      {labels.map((label, index) => (
        <Heading key={index} sizeOffset={2} className="inline-block">
          {label}
        </Heading>
      ))}
    </span>
  );
};

export default function ProfileCard({ role, title, items }: ProfileCardProps) {
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
        <div className="space-y-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center py-3 hover:bg-white/80 transition-colors rounded-lg px-4 group"
            >
              <ProfileLabel labels={item.labels} isEmployer={role === "company"} />
              {item.isCustom ? (
                <div className="flex-1">{item.value}</div>
              ) : (
                <Heading
                  sizeOffset={2}
                  className={`flex-1 text-gray-900 font-normal ${item.isDescription ? "whitespace-pre-wrap leading-relaxed" : ""}`}
                >
                  {item.value}
                </Heading>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
