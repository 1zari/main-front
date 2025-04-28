import React, { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { PenSquare } from "lucide-react";
import { Heading } from "@/components/ui/Heading";
import { UserRole } from "@/types/commonUser";

interface ProfileCardContextType {
  role: UserRole;
}
const ProfileCardContext = createContext<ProfileCardContextType | undefined>(undefined);

interface ProfileCardProps {
  role: UserRole;
  title: string;
  children: React.ReactNode;
}

function ProfileCard({ role, title, children }: ProfileCardProps) {
  const router = useRouter();
  const handleEditClick = () => {
    router.push(`/${role}/mypage/edit`);
  };
  const displayTitle = role === "user" ? `${title} 님` : title;
  return (
    <ProfileCardContext.Provider value={{ role }}>
      <div className="w-[calc(100%-2rem)] sm:w-[36rem] md:w-[48rem] lg:w-[64rem] mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b sm:p-6">
          <Heading sizeOffset={3} className="font-bold text-gray-900 break-all">
            {displayTitle}
          </Heading>
          <button
            onClick={handleEditClick}
            className="bg-primary hover:bg-primary/90 text-white px-2.5 sm:px-3 py-1 rounded-lg transition-colors duration-200 font-medium flex items-center gap-1.5 shadow-sm shrink-0 ml-3"
          >
            <PenSquare className="w-3.5 h-3.5" />
            <Heading sizeOffset={1} className="hidden text-white sm:inline">
              정보 수정
            </Heading>
            <Heading sizeOffset={1} className="text-white sm:hidden">
              수정
            </Heading>
          </button>
        </div>
        <div className="p-3 m-3 break-words bg-gray-50/50 rounded-xl sm:m-4 md:m-5 sm:p-4 md:p-5">
          <div className="space-y-5">{children}</div>
        </div>
      </div>
    </ProfileCardContext.Provider>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center px-4 py-3 transition-colors rounded-lg hover:bg-white/80 group">
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  const context = useContext(ProfileCardContext);
  const isEmployer = context?.role === "company";
  return (
    <span
      className={`${isEmployer ? "min-w-32 mr-8" : "w-32"} text-gray-500 font-medium flex flex-wrap items-center gap-1`}
    >
      {Array.isArray(children) ? (
        React.Children.map(children, (child, idx) => (
          <Heading key={idx} sizeOffset={2} className="inline-block">
            {child}
          </Heading>
        ))
      ) : (
        <Heading sizeOffset={2} className="inline-block">
          {children}
        </Heading>
      )}
    </span>
  );
}

function Value({
  children,
  isDescription = false,
}: {
  children: React.ReactNode;
  isDescription?: boolean;
}) {
  return (
    <Heading
      sizeOffset={2}
      className={`flex-1 text-gray-900 font-normal ${isDescription ? "whitespace-pre-wrap leading-relaxed" : ""}`}
    >
      {children}
    </Heading>
  );
}

ProfileCard.Item = Item;
ProfileCard.Label = Label;
ProfileCard.Value = Value;

export default ProfileCard;
