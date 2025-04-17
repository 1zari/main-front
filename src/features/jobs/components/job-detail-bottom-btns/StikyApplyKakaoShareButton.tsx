import { handleKakaoShare } from "@/utils/kakaoShare";

export default function StikyApplyKakaoShareButton({ isBottomVisible }) {
  return (
    <>
      {!isBottomVisible && (
        <div className="text-center py-6 sticky bottom-0 bg-white z-10">
          <div className="flex gap-2">
            <button
              onClick={handleKakaoShare}
              className="bg-[#FEE500] font-bold py-4 px-6 rounded-sm"
            >
              <img
                src="/images/kakao-logo.png"
                alt="카카오 로고"
                className="inline-block w-5 h-5 mr-2 align-middle"
              />
              카톡 공유
            </button>
            <button className="grow bg-primary hover:bg-green-700 text-white font-bold py-4 px-6 rounded-sm">
              지원하기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
