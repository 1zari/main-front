export default function Footer() {
  return (
    <>
      <footer>
        <div className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p className="text-sm">© 2025 시니어내일. All rights reserved.</p>
            <p className="flex flex-wrap gap-3 justify-center text-sm mt-3">
              <a href="/privacy" className="text-gray-400 hover:text-white">
                회사소개
              </a>
              <a href="/privacy" className="text-gray-400 hover:text-white">
                이용약관
              </a>

              <a href="/privacy" className="text-gray-400 hover:text-white">
                개인정보 처리방침
              </a>

              <a href="/privacy" className="text-gray-400 hover:text-white">
                제휴문의
              </a>
              <a href="/privacy" className="text-gray-400 hover:text-white">
                고객센터
              </a>
            </p>
          </div>
        </div>
        <div className="bg-gray-900 text-white py-2">
          <div className="container mx-auto text-center">
            <p className="text-xs">
              시니어내일은 시니어를 위한 일자리 플랫폼입니다. 더 나은 내일을 위해 함께합니다.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
