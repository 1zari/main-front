"use client";

import { useRouter } from "next/navigation";
import ScrapBtn from "@/components/ScrapBtn";

const JOBSINFOS = [
  {
    id: 1,
    companyName: "맥도날드 서울역점",
    title: "[시니어 환영] 유연한 근무시간, 함께하는 매장 보조 모집",
    location: "서울 용산구",
    deadline: "2025.05.25",
    logo: "https://blog.kakaocdn.net/dn/w1UK3/btqwTx0mNVX/ki6E4Mva5YavwrOFJQkCP1/img.jpg",
  },
  {
    id: 2,
    companyName: "스타벅스 강남점",
    title: "[시니어 바리스타] 간단한 음료 서비스 업무, 교육 제공",
    location: "서울 강남구",
    deadline: "2025.04.30",
    logo: "https://i.namu.wiki/i/9p8OVxJTce_f2HnuZF1QOU6qMSHqXBHdkcx3q_hlGxvhcyaOXKxBVyoDkeg-Cb4Nx2p60W0AUh6RzjAH59vHwQ.svg",
  },
  {
    id: 3,
    companyName: "이마트24 신촌점",
    title: "[시니어 야간근무] 편의점 단순 업무, 초보자도 가능",
    location: "서울 서대문구",
    deadline: "2025.05.15",
    logo: "https://blog.kakaocdn.net/dn/vHype/btqx0rSqhQa/uWkY1s5eKaoqpvgOk5iRC1/img.jpg",
  },
  {
    id: 4,
    companyName: "배스킨라빈스 홍대점",
    title: "[시니어 환영] 아이스크림 매장 단순 보조 업무",
    location: "서울 마포구",
    deadline: "2025.05.20",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Baskin-Robbins_logo.svg/640px-Baskin-Robbins_logo.svg.png",
  },
  {
    id: 5,
    companyName: "CU 건대점",
    title: "[주말 단기] 시니어 대상 편의점 안내 및 정리",
    location: "서울 광진구",
    deadline: "2025.04.28",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/CU_BI_%282017%29.svg/2560px-CU_BI_%282017%29.svg.png",
  },
  {
    id: 6,
    companyName: "롯데리아 종로점",
    title: "[시니어 크루] 기본 매장 보조, 가벼운 업무 중심",
    location: "서울 종로구",
    deadline: "2025.05.18",
    logo: "https://www.brandb.net/_next/image?url=https%3A%2F%2Fapi.brandb.net%2Fapi%2Fv2%2Fcommon%2Fimage%2F%3FfileId%3D19945&w=1920&q=75",
  },
  {
    id: 7,
    companyName: "GS25 잠실점",
    title: "[시니어 아르바이트] 오후 시간대 단순 업무",
    location: "서울 송파구",
    deadline: "2025.05.10",
    logo: "https://i.namu.wiki/i/5pf9ppFKCQV9VWb6vpQ4OTmpfwOUuRmiS1hYoKujRLhcFLQCi_6XpRJB0RiH-SMaJvr6s4Ube6Up3A9Yhmm9Dg.svg",
  },
  {
    id: 8,
    companyName: "파리바게뜨 목동점",
    title: "[제과 보조] 시니어 우대, 가벼운 제빵 준비 업무",
    location: "서울 양천구",
    deadline: "2025.05.22",
    logo: "https://i.namu.wiki/i/V64heeWZi7VOIjDe3eROHMF9etkfZO0zWS6VX1ZsdMIl68-wKtxhQIxAieZM8-AhzzAfy7fLOi1X7XuJyHQuiQ.svg",
  },
  {
    id: 9,
    companyName: "버거킹 수유점",
    title: "[시니어 크루] 오전 시간대 매장 정리 및 안내",
    location: "서울 강북구",
    deadline: "2025.05.12",
    logo: "https://blog.kakaocdn.net/dn/K9xlJ/btq6gLcC7Tz/KKEl6uQEKpD6sB5uCiTzPK/img.jpg",
  },
  {
    id: 10,
    companyName: "던킨 강동점",
    title: "[시니어 환영] 매장 내 청결 유지 및 간단한 보조",
    location: "서울 강동구",
    deadline: "2025.05.08",
    logo: "https://i.namu.wiki/i/tZjBdPB6G2WoxSbQB2e1tSc92vQ14Tnx_mro8SkPMRKUQqDhA38Od5kqdHVx3ali6n8Nh5jc977UNsBlPOvd9g.svg",
  },
];

function JobCard({ job }: { job: (typeof JOBSINFOS)[number] }) {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/jobs/${job.id}`)} className="cursor-pointer">
      <div className="bg-white shadow-sm rounded-lg p-4 transition duration-200 hover:shadow-md hover:-translate-y-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={job.logo}
              alt={`${job.companyName} 로고`}
              className="w-6 h-6 object-contain"
            />
            <p className="text-black/70">{job.companyName}</p>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <ScrapBtn />
          </div>
        </div>
        <h3 className="text-2 font-semibold py-2">{job.title}</h3>
        <div className="flex justify-between items-center mt-4">
          <p className="text-black/70">{job.location}</p>
          <p className="text-black/70">{job.deadline} 마감</p>
        </div>
      </div>
    </div>
  );
}

export default function JobCards() {
  return (
    <>
      {JOBSINFOS.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </>
  );
}
