import { FadeInUp } from "@/components/motion/FadeInUp";
import { Heading } from "@/components/ui/Heading";

export default function WelcomeBanner() {
  return (
    <>
      <div className="w-full h-[250px] relative overflow-hidden">
        <img src="images/home-bg-1.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/80 to-black/10 flex justify-center items-center">
          <div className="w-full max-w-7xl p-4 flex flex-col items-start justify-start">
            <FadeInUp delay={0.1}>
              <Heading sizeOffset={4} className="text-white text-2xl font-semibold break-keep">
                내가 다시 빛나는 순간!
              </Heading>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <h3 className="text-white  font-normal mt-2 opacity-80 break-keep">
                <span className="">경험</span>과 <span className="">가치</span>를 이어가는 새로운
                일자리 매칭
              </h3>
            </FadeInUp>
            <FadeInUp delay={0.3}>
              <h3 className="text-white  font-normal mt-2 opacity-80 break-keep">
                <span className="relative inline-block">
                  <span className="z-10 relative">일자리</span>
                  <span className="absolute left-0 bottom-0 w-full h-3 bg-green-500 z-0"></span>
                </span>
                , 커뮤니티,
                <span className="relative inline-block">
                  <span className="z-10 relative">성장의 기회</span>
                  <span className="absolute left-0 bottom-0 w-full h-3 bg-green-500 z-0"></span>
                </span>
              </h3>
            </FadeInUp>
          </div>
        </div>
      </div>
    </>
  );
}
