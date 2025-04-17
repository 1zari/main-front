"use client"
import Image from "next/image"
import Link from "next/link"
import { User2, Building2 } from "lucide-react"

export default function SignupEntryPage() {
  return (
    <section className="bg-white w-full max-w-[1000px] rounded-lg shadow-md px-6 pt-16 pb-6 mx-auto">
      <div className="w-full flex justify-center mb-10">
        <Image src="/images/logo.png" alt="로고" width={200} height={200} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        <Link href="/auth/signup/user" className="w-full">
          <div className="min-h-[340px] flex flex-col justify-between border border-gray-200 rounded-lg transition-all duration-200 p-6 bg-white hover:border-2 hover:border-lime-400 hover:bg-lime-50">
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <User2 size={44} className="text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-1">개인회원</h2>
              <p className="text-sm text-gray-500">일자리를 찾는 개인회원</p>
            </div>
            <div className="w-full h-[60px] mt-6 bg-primary text-white font-semibold rounded flex items-center justify-center">
              개인회원 가입하기
            </div>
          </div>
        </Link>
        <Link href="/auth/signup/company" className="w-full">
          <div className="min-h-[340px] flex flex-col justify-between border border-gray-200 rounded-lg transition-all duration-200 p-6 bg-white hover:border-2 hover:border-lime-400 hover:bg-lime-50">
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <Building2 size={44} className="text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-1">기업회원</h2>
              <p className="text-sm text-gray-500">직원을 찾는 기업회원</p>
            </div>
            <div className="w-full h-[60px] mt-6 bg-primary text-white font-semibold rounded flex items-center justify-center">
              기업회원 가입하기
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
