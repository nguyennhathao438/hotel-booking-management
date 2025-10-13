import React from "react";

export default function HotelDetailModal({ hotel, onClose }) {
  if (!hotel) return null;

  const user = hotel.user || {};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-4">{hotel.hotelName}</h2>

        {/* Thông tin khách sạn */}
        <div className="space-y-3 mb-4">
          <div>
            <label className="font-semibold">Địa chỉ:</label>
            <p>{hotel.hotelAddress}</p>
          </div>

          <div>
            <label className="font-semibold">Số điện thoại:</label>
            <p>{hotel.hotelPhone}</p>
          </div>

          <div>
            <label className="font-semibold">Giá phòng:</label>
            <p>{hotel.hotelCost?.toLocaleString()} VNĐ</p>
          </div>

          <div>
            <label className="font-semibold">Số phòng:</label>
            <p>{hotel.hotelTotalRoom}</p>
          </div>

          <div>
            <label className="font-semibold">Mô tả:</label>
            <p>{hotel.hotelDescription}</p>
          </div>

          <div>
            <label className="font-semibold">Trạng thái khách sạn:</label>
            <p className={`${hotel.status === 0 ? "text-red-600" : "text-green-600"} font-semibold`}>
              {hotel.status === 0 ? "Chưa duyệt" : "Đã duyệt"}
            </p>
          </div>
        </div>

        {/* Thông tin người đăng */}
        <div className="border-t border-gray-300 pt-4 space-y-2">
          <h3 className="text-xl font-semibold mb-2">Người đăng</h3>
          <div className="flex items-center space-x-3">
            {user.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                N/A
              </div>
            )}
            <div>
              <p><strong>Tên:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email || "N/A"}</p>
              <p><strong>Điện thoại:</strong> {user.phone || "N/A"}</p>
              <p><strong>Ngày tạo:</strong> {user.createAt ? new Date(user.createAt).toLocaleDateString() : "N/A"}</p>
              <p><strong>Trạng thái:</strong> {user.status === 0 ? "Chưa kích hoạt" : "Đã kích hoạt"}</p>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded-md"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
