import { X } from "lucide-react";

export default function InvoiceTodayModal({ invoices, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[800px] max-h-[600px] overflow-y-auto relative">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-700">Danh sách trả phòng hôm nay</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Bảng dữ liệu */}
        <table className="w-full border-collapse text-sm text-gray-700">
          <thead className="bg-yellow-100 sticky top-0">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Mã phòng</th>
              <th className="p-3 border">Người dùng</th>
              <th className="p-3 border">Nhận phòng</th>
              <th className="p-3 border">Trả phòng</th>
              <th className="p-3 border">Tổng tiền</th>
              <th className="p-3 border">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((item, index) => (
                <tr key={item.invoiceId} className="hover:bg-gray-50 transition">
                  <td className="border p-3 text-center">{index + 1}</td>
                  <td className="border p-3 text-center">{item.roomName || item.roomId}</td>
                  <td className="border p-3 text-center">{item.userName || item.userId}</td>
                  <td className="border p-3 text-center">{item.checkInDate}</td>
                  <td className="border p-3 text-center">{item.checkOutDate}</td>
                  <td className="border p-3 text-center">
                    {item.totalAmount?.toLocaleString("vi-VN")}₫
                  </td>
                  <td className="border p-3 text-center">
                    {item.status === 1 ? (
                      <span className="text-green-600 font-semibold">Đã thanh toán</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Chưa thanh toán</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  Không có hóa đơn trả phòng hôm nay
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
