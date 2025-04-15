"use client";

import RecruitForm from "../../../features/recruit/components/Form";

const NewRecruitPage = () => {
  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 flex justify-center items-center">채용공고 등록</h1>
      <RecruitForm mode="new"/>
    </main>
  );
};

export default NewRecruitPage;
