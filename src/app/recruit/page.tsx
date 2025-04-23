"use client";

import BackButton from "@/features/resume/components/common/BackButton";
import RecruitForm from "../../features/recruit/components/Form";

const NewRecruitPage = () => {
  return (
    <main className="max-w-2xl p-4 mx-auto">
      <BackButton />
      <h1 className="flex items-center justify-center m-10 text-2xl font-bold">채용공고 등록</h1>

      <RecruitForm mode="new" />
    </main>
  );
};

export default NewRecruitPage;
