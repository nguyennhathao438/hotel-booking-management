// src/pages/Forbidden.jsx
export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
      <p className="text-xl text-gray-700 mb-2">
        Bạn không có quyền truy cập trang này.
      </p>
      <a href="/" className="text-blue-500 hover:underline">
        Quay lại trang chủ
      </a>
    </div>
  );
}
