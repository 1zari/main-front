import { JOB_DETAIL_TEXT } from "@/features/jobs/model/constants/jobDetailText";
//api 연결후 실제 데이터로 넣어야함
export const handleKakaoShare = () => {
  if (typeof window !== "undefined" && window.Kakao) {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "채용 공고를 확인해보세요!",
        description: JOB_DETAIL_TEXT.title,
        imageUrl: JOB_DETAIL_TEXT.company_image_url,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "공고 보기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  }
};
