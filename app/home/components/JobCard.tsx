"use client";

import SaveBtn from "../../../components/SaveBtn";

export default function JobCard() {
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-500">맥도날드 서울역점</p>
          <SaveBtn />
        </div>
        <h3 className="text-lg font-semibold py-2">
          [자유로운 스케줄]맥도날드 서울역점과 함께할 크루를 모집합니다.
        </h3>
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-500">서울 용산구</p>
          <p className="text-gray-500">2025.05.25 마감</p>
        </div>
      </div>
    </>
  );
}
