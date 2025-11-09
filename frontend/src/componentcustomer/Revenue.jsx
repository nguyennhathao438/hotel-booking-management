import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../api";

export default function Revenue() {
  const { hotelId } = useParams();
  const location = useLocation();
  const { hotelName } = location.state || {};

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    bookings: [],
  });

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await api.get(`/invoice/hotel/${hotelId}`);
        const invoices = response.data.result || [];

        // Lọc hóa đơn theo tháng và năm
        const filteredInvoices = invoices.filter((inv) => {
          const checkOut = new Date(inv.checkOutDate);
          return checkOut.getMonth() + 1 === month && checkOut.getFullYear() === year;
        });

        // Tính tổng doanh thu và tổng booking
        const totalRevenue = filteredInvoices.reduce(
          (sum, inv) => sum + (inv.totalAmount || 0),
          0
        );
        const totalBookings = filteredInvoices.length;

        const bookings = filteredInvoices.map((inv) => ({
          bookingId: inv.id,
          roomName: inv.room?.roomName || "N/A",
          customerName: `${inv.user?.firstName || ""} ${inv.user?.lastName || ""}`,
          date: inv.checkOutDate,
          price: inv.totalAmount,
        }));

        setRevenueData({ totalRevenue, totalBookings, bookings });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu doanh thu:", error);
      }
    };

    fetchRevenue();
  }, [hotelId, month, year]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-blue-600">
        Doanh thu khách sạn {hotelName || hotelId}
      </h2>

      {/* Bộ lọc tháng/năm */}
      <div className="flex gap-4 mb-6 items-center">
        <div>
          <label className="mr-2 font-semibold">Tháng:</label>
          <select
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold">Năm:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="border rounded px-2 py-1 w-20"
          />
        </div>
      </div>

      {/* Tổng doanh thu và tổng lượt booking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-green-50 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-2">Tổng doanh thu</h3>
          <p className="text-xl font-bold text-green-600">
            {revenueData.totalRevenue.toLocaleString()} VNĐ
          </p>
        </div>
        <div className="p-4 bg-blue-50 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-2">Tổng số lượt đặt phòng</h3>
          <p className="text-xl font-bold text-blue-600">{revenueData.totalBookings}</p>
        </div>
      </div>

      {/* Bảng chi tiết booking */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Chi tiết đặt phòng</h3>
        <table className="w-full border-collapse shadow rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Phòng</th>
              <th className="border px-4 py-2">Khách hàng</th>
              <th className="border px-4 py-2">Ngày đặt</th>
              <th className="border px-4 py-2">Giá VNĐ</th>
            </tr>
          </thead>
          <tbody>
            {revenueData.bookings.map((booking) => (
              <tr key={booking.bookingId}>
                <td className="border px-4 py-2">{booking.roomName}</td>
                <td className="border px-4 py-2">{booking.customerName}</td>
                <td className="border px-4 py-2">{booking.date}</td>
                <td className="border px-4 py-2">{booking.price.toLocaleString()}</td>
              </tr>
            ))}
            {revenueData.bookings.length === 0 && (
              <tr>
                <td className="border px-4 py-2 text-center" colSpan={4}>
                  Không có dữ liệu cho tháng/năm này
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
