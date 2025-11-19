import { ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function PendingHotelApproval() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        <ClockIcon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Khách sạn của bạn đang chờ được duyệt
        </h1>

        <p className="text-gray-600 mb-6">
          Cảm ơn bạn đã đăng ký khách sạn. Đội ngũ quản trị đang xem xét và sẽ
          phê duyệt hồ sơ của bạn trong thời gian sớm nhất.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
}
