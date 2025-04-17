import { handleKakaoShare } from "@/utils/kakaoShare";

export default function KakaoShareButton() {
  return (
    <>
      <div className="text-center bg-white z-10">
        <button
          onClick={handleKakaoShare}
          className="w-full bg-[#FEE500] font-bold py-4 px-6 rounded-sm"
        >
          <img
            src="/images/kakao-logo.png"
            alt="카카오 로고"
            className="inline-block w-5 h-5 mr-2 align-middle"
          />
          카톡 공유
        </button>
      </div>
    </>
  );
}
