export default function AuthLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center min-h-[200px]">
      <div className="flex flex-col items-center gap-2">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500">로딩 중...</p>
      </div>
    </div>
  );
}
