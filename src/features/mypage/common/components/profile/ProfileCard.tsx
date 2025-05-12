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
  userId: string;
  title: string;
  children: React.ReactNode;
}

function ProfileCard({ role, userId, title, children }: ProfileCardProps) {
  const router = useRouter();
  const handleEditClick = () => {
    router.push(`/${role}/mypage/${userId}/edit`);
  };
  const displayTitle = role === "normal" ? `${title} 님` : title;
  return (
    <ProfileCardContext.Provider value={{ role }}>
      <div className="mx-auto w-[calc(100%-2rem)] overflow-hidden rounded-2xl bg-white sm:w-[36rem] md:w-[48rem] lg:w-[64rem]">
        <div className="flex items-center justify-between p-4 border-b sm:p-6">
          <Heading sizeOffset={3} className="font-bold text-gray-900 break-all">
            {displayTitle}
          </Heading>
          <button
            onClick={handleEditClick}
            className="bg-primary hover:bg-primary/90 ml-3 flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 font-medium text-white shadow-sm transition-colors duration-200 sm:px-3"
          >
            <PenSquare className="h-3.5 w-3.5" />
            <Heading sizeOffset={1} className="hidden text-white sm:inline">
              정보 수정
            </Heading>
            <Heading sizeOffset={1} className="text-white sm:hidden">
              수정
            </Heading>
          </button>
        </div>
        <div className="p-3 m-3 break-words rounded-xl bg-gray-50/50 sm:m-4 sm:p-4 md:m-5 md:p-5">
          <div className="space-y-5">{children}</div>
        </div>
      </div>
    </ProfileCardContext.Provider>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center px-4 py-3 transition-colors rounded-lg group hover:bg-white/80">
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  const context = useContext(ProfileCardContext);
  const isEmployer = context?.role === "company";
  return (
    <span
      className={`${isEmployer ? "mr-8 min-w-32" : "w-32"} flex flex-wrap items-center gap-1 font-medium text-gray-500`}
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
      className={`flex-1 font-normal text-gray-900 ${isDescription ? "leading-relaxed whitespace-pre-wrap" : ""}`}
    >
      {children}
    </Heading>
  );
}

ProfileCard.Item = Item;
ProfileCard.Label = Label;
ProfileCard.Value = Value;

export default ProfileCard;
