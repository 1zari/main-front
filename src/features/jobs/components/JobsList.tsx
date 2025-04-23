import JobListItem from "./JobListItem";

export default function JobsList() {
  return (
    <>
      <h1 className="mt-20 mb-10 text-2xl font-bold">인기 채용 공고</h1>
      <div className="border border-t-1 border-b-0 border-l-0 border-r-0 border-gray-300 pb-20">
        <JobListItem />
        <JobListItem />
        <JobListItem />
        <JobListItem />
        <JobListItem />
        <JobListItem />
        <JobListItem />
        <JobListItem />
        <JobListItem />
        <JobListItem />
      </div>
    </>
  );
}
