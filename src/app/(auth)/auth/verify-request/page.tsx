export default function VerifyRequestPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="mb-4 text-2xl font-bold text-primary">이메일 확인</h1>
        <p className="mb-6 text-gray-700">
          이메일로 인증 링크를 보냈습니다. 이메일을 확인하고 링크를 클릭하여 로그인을 완료해주세요.
        </p>
        <p className="mb-6 text-sm text-gray-500">
          이메일이 도착하지 않았다면 스팸 폴더를 확인해주세요.
        </p>
      </div>
    </div>
  );
}
