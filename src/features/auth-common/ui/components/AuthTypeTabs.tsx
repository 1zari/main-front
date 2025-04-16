import { useRouter } from "next/navigation";

interface AuthTypeTabsProps {
  type: "user" | "company";
  pageType: "find-email" | "find-password";
}

export default function AuthTypeTabs({ type, pageType }: AuthTypeTabsProps) {
  const router = useRouter();

  const handleTabChange = (selectedType: "user" | "company") => {
    router.push(`/auth/${selectedType}/${pageType}`);
  };

  return (
    <div className="flex border-b border-gray-200 mb-8">
      <button
        type="button"
        className={`flex-1 pb-4 text-center font-medium text-lg ${
          type === "user"
            ? "text-primary border-b-2 border-primary"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => handleTabChange("user")}
      >
        개인회원
      </button>
      <button
        type="button"
        className={`flex-1 pb-4 text-center font-medium text-lg ${
          type === "company"
            ? "text-primary border-b-2 border-primary"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => handleTabChange("company")}
      >
        기업회원
      </button>
    </div>
  );
}
