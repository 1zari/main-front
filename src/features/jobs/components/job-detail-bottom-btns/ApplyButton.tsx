import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ApplyButton() {
  const pathname = usePathname();
  return (
    <>
      <div className="text-center py-6 bg-white z-10 mb-2">
        <Link href={`${pathname}/apply`} passHref>
          <button className="w-full bg-primary hover:bg-green-700 text-white font-bold py-4 px-6 rounded-sm">
            지원하기
          </button>
        </Link>
      </div>
    </>
  );
}
