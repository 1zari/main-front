export default function JobsNav() {
  return (
    <>
      <nav className="bg-gray-z text-black p-4 sticky top-0 z-10">
        <ul className="flex flex-wrap justify-center gap-5">
          <li>
            <a href="#" className="font-bold">
              추천 공고
            </a>
          </li>
          <li>
            <a href="#">공공일자리</a>
          </li>
          <li>
            <a href="#">지역별</a>
          </li>
          <li>
            <a href="#">직종별</a>
          </li>
        </ul>
      </nav>
    </>
  )
}
