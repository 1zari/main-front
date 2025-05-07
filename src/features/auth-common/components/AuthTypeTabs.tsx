import { useRouter } from "next/navigation";

interface AuthTypeTabsProps {
  type: "normal" | "company";
  pageType: "find-email" | "find-password";
}

export default function AuthTypeTabs({ type, pageType }: AuthTypeTabsProps) {
  const router = useRouter();

  const handleTabChange = (selectedType: "normal" | "company") => {
    router.push(`/auth/${selectedType}/${pageType}`);
  };

  return (
    <div className="relative mb-8 flex rounded-lg bg-gray-100 p-1">
      <button
        type="button"
        className={`relative flex-1 py-3 text-center text-base font-medium transition-all duration-200 ${
          type === "normal"
            ? "text-primary rounded-md bg-white shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
        onClick={() => handleTabChange("normal")}
      >
        개인회원
      </button>
      <button
        type="button"
        className={`relative flex-1 py-3 text-center text-base font-medium transition-all duration-200 ${
          type === "company"
            ? "text-primary rounded-md bg-white shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
        onClick={() => handleTabChange("company")}
      >
        기업회원
      </button>
    </div>
  );
}
