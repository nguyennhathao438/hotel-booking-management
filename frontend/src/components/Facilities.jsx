import { BookPlusIcon, CarFrontIcon, CheckCircle2Icon, ClockIcon, CrownIcon, DropletIcon, FireExtinguisherIcon, HeartPlusIcon, LandmarkIcon, PhoneIcon, ShieldCheckIcon, StarIcon, WifiIcon, WrenchIcon } from "lucide-react";
import { infomationsi, infomationslt } from "../informations.js";

export default function Facilities() {
  return (
    <section className="px-4 py-10 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto">
        {/* --- Phần tiêu đề và mô tả --- */}
        <div className="text-center mb-8">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4">Trải nghiệm đẳng cấp tại khách sạn</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed whitespace-pre-line">{infomationsi}</p>
        </div>

        {/* --- Phần icon tiện ích --- */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 text-center">
          <div className="flex flex-col items-center w-full sm:w-1/3 bg-gray-50 p-6 rounded-2xl shadow-sm ">
            <CheckCircle2Icon className="w-10 h-10 text-green-500 mb-3" />
            <p className="text-lg font-bold">Chất lượng cao</p>
            <p className="text-gray-600">Tiêu chuẩn 5 sao quốc tế</p>
          </div>

          <div className="flex flex-col items-center w-full sm:w-1/3 bg-gray-50 p-6 rounded-2xl shadow-sm">
            <ClockIcon className="w-10 h-10 text-blue-500 mb-3" />
            <p className="text-lg font-bold">Phục vụ 24/7</p>
            <p className="text-gray-600">Hỗ trợ mọi lúc mọi nơi</p>
          </div>

          <div className="flex flex-col items-center w-full sm:w-1/3 bg-gray-50 p-6 rounded-2xl shadow-sm">
            <CrownIcon className="w-10 h-10 text-yellow-500 mb-3" />
            <p className="text-lg font-bold">Đẳng cấp VIP</p>
            <p className="text-gray-600">Trải nghiệm cao cấp</p>
          </div>
        </div>

        {/* --- Phần tiện ích bổ sung --- */}
        <div className="text-center mt-10">
  <h2 className="text-xl md:text-2xl font-semibold mb-2">Tiện ích bổ sung</h2>
  <p className="text-gray-600">Những tiện ích hiện đại và dịch vụ tiện lợi khác</p>

  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center">
    {[
      { icon: "https://cdn-icons-png.flaticon.com/128/5443/5443535.png", title: "Dọn phòng hằng ngày", desc: "Giữ phòng của bạn luôn sạch sẽ và gọn gàng mỗi ngày" },
      { icon: "https://cdn-icons-png.flaticon.com/128/2990/2990631.png", title: "Giặt ủi quần áo", desc: "Giặt, sấy và ủi chuyên nghiệp cho khách lưu trú" },
      { icon: "https://cdn-icons-png.flaticon.com/512/854/854878.png", title: "Đưa đón sân bay", desc: "Xe đưa đón tận nơi, an toàn và đúng giờ" },
      { icon: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png", title: "Buffet sáng", desc: "Thưởng thức bữa sáng đa dạng với món Á - Âu mỗi ngày" },
      { icon: "https://cdn-icons-png.flaticon.com/128/7053/7053332.png", title: "Thuê xe máy", desc: "Thuê xe máy tiện lợi để khám phá thành phố" },
      { icon: "https://cdn-icons-png.flaticon.com/512/562/562678.png", title: "Giao đồ ăn tận phòng", desc: "Đặt món ăn yêu thích và nhận ngay tại phòng" },
      { icon: "https://cdn-icons-png.flaticon.com/512/2331/2331970.png", title: "Giữ hành lý", desc: "Gửi hành lý an toàn trước khi nhận hoặc sau khi trả phòng" },
      { icon: "https://cdn-icons-png.flaticon.com/128/17902/17902763.png", title: "Wi-Fi tốc độ cao", desc: "Kết nối internet nhanh và ổn định trong toàn bộ khu vực khách sạn" },
    ].map((item, index) => (
      <div
        key={index}
        className="flex flex-col items-center justify-center p-5 w-full sm:w-60"
      >
        <div className="w-12 h-12 flex justify-center mb-2">
          <img src={item.icon} alt={item.title} className="w-10 h-10 object-contain" />
        </div>
        <p className="font-bold text-lg text-gray-800 text-center">{item.title}</p>
        <p className="text-sm text-gray-600 text-center">{item.desc}</p>
      </div>
    ))}
  </div>
</div>


        {/* --- Phần Cam kết chất lượng dịch vụ --- */}
        <div className="text-center mt-10 px-4">
          <div className="mb-8">
            <h1 className="lg:text-3xl md:text-xl sm:text-lg font-bold mb-3">Cam Kết Chất Lượng Dịch Vụ</h1>
            <p className="text-gray-700 max-w-3xl mx-auto">{infomationslt}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-items-center">
            <div className="bg-gray-50 rounded-2xl shadow-md p-6 flex flex-col items-center text-center w-full max-w-sm">
              <StarIcon className="text-blue-600 w-10 h-10 mb-3" />
              <h2 className="font-semibold text-lg mb-2">Đánh giá sao</h2>
              <p className="text-gray-600">Được khách hàng đánh giá 4.8/5 sao và nhận được nhiều giải thưởng uy tín trong ngành</p>
            </div>
            <div className="bg-gray-50 rounded-2xl shadow-md p-6 flex flex-col items-center text-center w-full max-w-sm">
              <CheckCircle2Icon className="text-emerald-400 w-10 h-10 mb-3" />
              <h2 className="font-semibold text-lg mb-2">Đảm Bảo Chất Lượng</h2>
              <p className="text-gray-600">Tất cả tiện ích đều được kiểm tra và bảo trì thường xuyên để đảm bảo hoạt động tốt nhất</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
