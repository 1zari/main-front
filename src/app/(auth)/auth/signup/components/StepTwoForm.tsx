export default function StepTwoForm() {
  return (
    <div className="flex flex-col items-center space-y-8">
      <h2 className="text-[26px] md:text-[30px] font-bold">기업 회원 정보</h2>

      <div className="w-full max-w-[700px] space-y-6">
        <Input label="기업명" />
        <Input label="개업년월일" type="date" />
        <Input label="사업자등록번호" withButton />
        <TextArea label="기업 소개" />
        <Input label="담당자 성함" />
        <Input label="담당자 전화번호" />
        <Input label="담당자 이메일" />
        
        <button
          className="w-full h-[70px] bg-primary text-white text-[20px] md:text-[22px] font-semibold rounded hover:opacity-90 transition cursor-pointer"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

function Input({
  label,
  type = 'text',
  withButton = false,
}: {
  label: string;
  type?: string;
  withButton?: boolean;
}) {
  return (
    <div>
      <label className="block mb-1 font-semibold text-[18px] md:text-[22px]">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type={type}
          className="flex-1 h-[70px] text-[22px] border border-gray-300 rounded px-4 bg-white"
        />
        {withButton && (
          <button
            type="button"
            className="h-[70px] px-4 text-[16px] md:text-[18px] border border-primary text-primary rounded hover:bg-primary hover:text-white transition cursor-pointer"
          >
            중복확인
          </button>
        )}
      </div>
    </div>
  );
}

function TextArea({ label }: { label: string }) {
  return (
    <div>
      <label className="block mb-1 font-semibold text-[18px] md:text-[22px]">
        {label}
      </label>
      <textarea
        className="w-full h-[70px] text-[22px] border border-gray-300 rounded px-4 bg-white"
        placeholder={`${label}을 입력해주세요`}
      />
    </div>
  );
}
