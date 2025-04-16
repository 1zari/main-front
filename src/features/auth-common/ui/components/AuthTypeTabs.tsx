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
    <div className="relative flex rounded-lg bg-gray-100 p-1 mb-8">
      <button
        type="button"
        className={`relative flex-1 py-3 text-center text-base font-medium transition-all duration-200 ${
          type === "user"
            ? "text-primary bg-white rounded-md shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
        onClick={() => handleTabChange("user")}
      >
        개인회원
      </button>
      <button
        type="button"
        className={`relative flex-1 py-3 text-center text-base font-medium transition-all duration-200 ${
          type === "company"
            ? "text-primary bg-white rounded-md shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
        onClick={() => handleTabChange("company")}
      >
        기업회원
      </button>
    </div>
  );
}
