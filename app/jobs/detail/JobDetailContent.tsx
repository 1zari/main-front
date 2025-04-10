export default function JobDetailContent() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center py-10">
        <div className="w-full max-w-7xl mx-auto px-6">
          <section className="bg-white  space-y-8">
            {/* 회사정보 */}
            <div className="flex flex-col gap-2">
              <p>넥스트러너스</p>
              <h2 className="text-xl font-semibold mb-2">
                안성/샌드위치/주간350/야간400/주6일/쉬운포장/중장년층
              </h2>
            </div>

            {/* 고용조건 */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-primary font-semibold mb-2">
                고용조건
              </h2>
              <div className="grid grid-cols-[auto,1fr] gap-y-4 gap-x-10">
                <p>급여</p>
                <p className="font-bold">2,138,900</p>
                <p>고용형태</p>
                <p className="font-bold">12개월 계약(연장 가능)</p>
                <p>근무요약</p>
                <p className="font-bold">
                  주말근무필수/평일중하루가능/16:00입실/근무중핸드폰X/식사제공
                </p>
              </div>
            </div>

            <div className="h-2 bg-gray-z "></div>

            {/* 모집조건 */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-primary font-semibold mb-2">
                모집조건
              </h2>
              <div className="grid grid-cols-[auto,1fr] gap-y-4 gap-x-10">
                <p>마감일</p>
                <p className="font-bold">2025.03.31</p>
                <p>경력사항</p>
                <p className="font-bold">무관</p>
                <p>최종학력</p>
                <p className="font-bold">무관</p>
                <p>모집인원</p>
                <p className="font-bold">2명</p>
              </div>
            </div>

            <div className="h-2 bg-gray-z "></div>

            {/* 근무지 */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-primary font-semibold mb-2">
                근무지
              </h2>
              <p>경기 안성시 공단1로 87 (삼천리동) 투코리아</p>
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500">
                지도 영역
              </div>
            </div>

            <div className="h-2 bg-gray-z "></div>

            {/* 상세요강 */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-primary font-semibold mb-2">
                상세요강
              </h2>
              <p className="whitespace-pre-line text-sm text-gray-700">
                GS투코리아는 한국 GS25 편의점에 물품을 공급하는 물류센터입니다.
                GS투코리아는 스스로의 만족까지 생각하는 복지중심기업을
                만들어갑니다. GS리테일로 가는 소분센터(투코리아)에서 사원모집
                (지게차, 입고/출고직) 급여: 2,138,900원 (수습3개월 90%, 월~토
                16:00~익일 01:00, 고정연장근무 있음) 고정연장: 1일 1시간씩
                (22:00~23:00) 고용형태: 1년 계약직(근무평가에 따라 연장/정규직
                전환 가능) 복리후생: 4대보험, 퇴직금, 연차, 중식제공,
                기숙사(2인1실, 공과금 포함 본인부담 13만원) 자격조건 - 성별무관
                - 교포 가능 - 장기근무 가능자 - 20대~50대, 6개월 이상 가능자,
                12개월 선호함, 주말근무 근무시간 준수할 수 있는 자 모집직종 1.
                입출고팀(사입): GS25 편의점 택배박스 작업 - 15kg이내 1) 검수팀:
                고객센터 물건을 확인해서 피킹리스트에 체크 2) 패킹팀: 검수된
                물품을 박스포장 후 배차 2. 소분팀(리테일센터): 소분물류센터에서
                편의점배송 물건 박스피킹, 검수, 정리작업 - 작업예정일: 2025년
                4월부터~ (일정은 조정될 수 있음) - 작업장소: 경기 안성시 공단1로
                87 (삼천리동) GS25 소분센터 * 숙소제공 (2인1실, TV 냉장고 세탁기
                등 제공, 1인 사용은 13만원) 채용 담당자 정보 담당자: 김모씨 HP:
                010-1234-5678 전화: 02-1234-1234 E-Mail: recruiting@terminal.int
              </p>
            </div>

            <div className="h-2 bg-gray-z "></div>

            {/* 채용담당자 연락처 */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-primary font-semibold mb-2">
                채용담당자 연락처
              </h2>
              <div className="grid grid-cols-[auto,1fr] gap-y-4 gap-x-10">
                <p>담당자</p>
                <p className="font-bold">김오즈</p>
                <p>전화</p>
                <p className="font-bold">02-1234-1234</p>
              </div>
            </div>

            <div className="h-2 bg-gray-z "></div>

            {/* 지원하기 버튼 */}
            <div className="text-center py-6 sticky bottom-0 bg-white z-10">
              <button className="w-full  bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded">
                지원하기
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
