import { Heading } from "@/components/ui/Heading";
import RecruiteList from "@/features/recruit/components/RecruiteList";

async function NewRecruitPage() {
  return (
    <div className="bg-gray-z-light pb-10">
      <main className="w-full mx-auto">
        <nav className="bg-white text-black sticky top-0 z-10">
          <ul className="w-full max-w-7xl mx-auto flex flex-wrap justify-between items-center p-4  gap-5">
            <li className="grow text-center font-bold ml-[-30px]">
              <Heading sizeOffset={2} className="font-bold">
                채용공고 등록
              </Heading>
            </li>
          </ul>
        </nav>
        <RecruiteList />
      </main>
    </div>
  );
}
export default NewRecruitPage;
