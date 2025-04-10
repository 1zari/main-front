import SaveBtn from "../../../components/\bSaveBtn"

export default function JobListItem() {
  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row items-start gap-6 justify-between py-7 border border-t-0 border-l-0 border-r-0 border-b-1 border-gray-300">
          <div className="flex flex-col gap-1 items-start">
            <h2 className="text-xl font-semibold">넥스트러너스</h2>
            <p className="text-gray-600">서울 강남구</p>
          </div>
          <div className="flex gap-1 flex-wrap flex-col items-start flex-grow ">
            <h2 className="text-xl font-semibold">
              안성/샌드위치/주간350/야간400/주6일/쉬운포장/중장년층
            </h2>
            <p className="text-gray-600">
              주간통근버스/중장년층가능/남여모집/근무환경쾌적/식사제공
            </p>
            <p className="text-gray-600">2025.05.25 마감</p>
          </div>
          <div className="mt-4 md:mt-0 ">
            <SaveBtn />
          </div>
        </div>
      </div>
    </>
  )
}
