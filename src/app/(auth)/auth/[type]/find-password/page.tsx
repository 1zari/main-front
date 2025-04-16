import { notFound } from "next/navigation";
import UserFindPasswordForm from "@/features/auth-user/ui/login/UserFindPasswordForm";
import CompanyFindPasswordForm from "@/features/auth-company/ui/login/CompanyFindPasswordForm";

interface FindPasswordPageProps {
  params: {
    type: string;
  };
}

export default function FindPasswordPage({ params: { type } }: FindPasswordPageProps) {
  if (type !== "user" && type !== "company") {
    notFound();
  }

  return <>{type === "user" ? <UserFindPasswordForm /> : <CompanyFindPasswordForm />}</>;
}
