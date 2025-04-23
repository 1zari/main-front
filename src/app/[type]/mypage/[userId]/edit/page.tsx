"use client"
import { useParams } from "next/navigation"
import CompanyInformationEdit from "@/features/mypage/company/ui/edit/CompanyInformationEdit"
import UserInformationEdit from "@/features/mypage/user/ui/edit/UserInformationEdit"
import {
  MOCK_USER_SESSION,
  MOCK_COMPANY_SESSION,
} from "@/features/auth-common/mock/auth.mock"

const VALID_TYPES = ["user", "company"] as const

export default function InformationEditPage() {
  const params = useParams()
  const type = params?.type as string
  const userId = params?.userId as string

  if (!VALID_TYPES.includes(type as any)) {
    return <p className="text-red-500 text-center">잘못된 접근입니다. (type 오류)</p>
  }

  const session = type === "company" ? MOCK_COMPANY_SESSION : MOCK_USER_SESSION
  const role = session.user.role

  if (type !== role) {
    return <p className="text-red-500 text-center">접근 권한이 없습니다. (role mismatch)</p>
  }

  if (userId !== session.user.id) {
    return <p className="text-red-500 text-center">잘못된 접근입니다. (userId mismatch)</p>
  }

  return (
    <>
      {role === "company" && (
        <CompanyInformationEdit defaultValues={session.user} />
      )}
      {role === "user" && (
        <UserInformationEdit defaultValues={session.user} />
      )}
    </>
  )
}
