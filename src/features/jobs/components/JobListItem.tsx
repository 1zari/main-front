"use client";

import ScrapBtn from "@/components/ScrapBtn";

export default function JobListItem() {
  return (
    <>
      <div className="relative">
        <div className="absolute right-0 top-5">
          <ScrapBtn />
        </div>
        <div
          className="flex flex-col items-start justify-between gap-6 border border-t-0 border-l-0 border-r-0 border-gray-300 cursor-pointer md:flex-row py-7 border-b-1"
          onClick={() => (window.location.href = "/jobs/detail")}
        >
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-xl font-semibold">넥스트러너스</h2>
            <p className="text-gray-600">서울 강남구</p>
          </div>
          <div className="flex flex-col flex-wrap items-start gap-1 grow ">
            <h2 className="text-xl font-semibold">
              안성/샌드위치/주간350/야간400/주6일/쉬운포장/중장년층
            </h2>
            <p className="text-gray-600">
              주간통근버스/중장년층가능/남여모집/근무환경쾌적/식사제공
            </p>
            <p className="text-gray-600">2025.05.25 마감</p>
          </div>
        </div>
      </div>
    </>
  );
}
