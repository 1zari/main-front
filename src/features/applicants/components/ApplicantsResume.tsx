import ResumeContactSection from "@/features/resume/components/ResumeContactSection";
import ResumeSelfIntroductionSection from "@/features/resume/components/ResumeSelfIntroductionSection";
import ResumeTableSection from "@/features/resume/components/ResumeTableSection";

export default function ApplicantsResume() {
  return (
    <>
      <div className="max-w-3xl my-7 m-auto">
        <div className="border b-gray-300 py-9 px-6 h-full flex flex-col gap-8 rounded-md">
          <ResumeContactSection name="김오즈" phone="010-1234-1245" email="user1234@naver.com" />
          <ResumeTableSection
            sectionTitle="학력 사항"
            items={[
              { label: "학교 구분", value: "대학교(4년)" },
              { label: "학교명", value: "연세대학교" },
              { label: "졸업 상태", value: "졸업" },
            ]}
          />
          <ResumeTableSection
            sectionTitle="경력 사항"
            items={[
              { label: "회사명", value: "넥스트러너스" },
              { label: "직무", value: "웹디자인" },
              { label: "근무 기간", value: "14.04.09 ~ 24.04.09" },
            ]}
          />
          <ResumeTableSection
            sectionTitle="자격증"
            items={[
              { label: "자격증명", value: "웹디자인 기능사" },
              { label: "발급 기관", value: "한국산업인력공단" },
              { label: "취득 일자", value: "24.04.09" },
            ]}
          />

          <ResumeSelfIntroductionSection
            title="자기 소개"
            content="나이는 숫자일 뿐, 디자인에 대한 열정은 여전히 뜨겁습니다.
                          저는 시니어 디자이너로서, 경험에서 오는 통찰력과 꾸준한 학습으로 성장하고 있는 김오즈입니다.
                          UI/UX 디자인을 통해 사용자의 삶에 긍정적인 변화를 만드는 데 집중하고 있습니다.
                          새로운 기술과 트렌드를 두려워하지 않고, 오히려 즐기며 흡수해 나갑니다.
                          디자인은 문제를 해결하는 도구이며, 저는 그 중심에서 사용자와 진심으로 소통하는 것을 중요하게 생각합니다.
                          프로젝트에서는 늘 협업을 우선하며, 서로의 다름을 존중하는 태도로 임하고 있습니다.
                          Figma, Notion, GitHub 등 협업 툴에도 익숙하며, 개발자와의 원활한 커뮤니케이션을 위해 노력합니다.
                          끊임없이 배우고, 변화를 받아들이며, 나 자신을 새롭게 리디자인하고자 합니다.
                          나이는 장점이 될 수 있다는 걸 디자인으로 증명하고 싶습니다.
                          앞으로도 세대를 넘어 공감할 수 있는 디자인을 만들어가고자 합니다."
          />
        </div>
      </div>
    </>
  );
}
