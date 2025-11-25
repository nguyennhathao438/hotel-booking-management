import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import ItemHeader from "./ItemHeader.jsx";
import InvoiceTodayModal from "./InvoiceTodayModal.jsx";
import toast from "react-hot-toast";
import {
  BedDoubleIcon,
  ShoppingCartIcon,
  BellRingIcon,
  MessageCircleQuestionIcon,
  CircleDollarSignIcon,
} from "lucide-react";
import RoomAvailableKid from "./RoomAvailableKid.jsx";
import api from "../api.js";
import HotelDetailModal from "../components/HotelDetailModal.jsx";
import { useNavigate } from "react-router-dom";
import RevenueLineChart from "./RevenueLineChart.jsx";
import BookingBarChart from "./BookingBarChart.jsx";
import UserAreaLineChart from "./UserAreaLineChart.jsx";
import InvoiceDChart from "./InvoiceDChart.jsx";

export default function DashBoard() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [availableCount, setAvailableCount] = useState(0);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const [invoice, setInvoicetoday] = useState([]);
  const [showInvoicetoday, setShowInvoicetoday] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState([]);
  const [userCount, setUserCount] = useState([]);
  const [filter, setFilter] = useState("week");
  const [filters, setFilters] = useState("week");
  const [barFiler, setBarFilter] = useState("7-day-last");
  const [barChart, setBarChart] = useState({ labels: [], datasets: [] });
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [chartUserData, setChartUserData] = useState({ labels: [], data: [] });
  const [chartInvoice, setChartInvoice] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    fetchAvailableRooms();
    fetchAvailableCount();
    fetchAllHotel();
    fetchCheckouttoday();
    fetchInvoiceStatus();
    fetchUserCount();
    fetchInvoiceCount();
  }, []);
  useEffect(() => {
    updateChartData();
  }, [filter, invoiceStatus]);
  useEffect(() => {
    updateBarChart();
  }, [barFiler]);
  useEffect(() => {
    updateUserChartData();
  }, [filters, userCount]);
  const fetchCheckouttoday = async () => {
    try {
      const rs = await api.get("/invoice/checkouttoday");
      setInvoicetoday(rs.data.result || []); // dùng đúng biến rs
      console.log("Lấy danh sách hóa đơn thành công:", rs.data.result);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  // === Lấy danh sách khách sạn chưa duyệt (status = 0) ===
  const fetchAllHotel = async () => {
    try {
      const request = await api.get("/hotels/getkhong");
      setHotels(request.data.result || []);
      console.log("Danh sách khách sạn chưa duyệt:", request.data.result);
    } catch (error) {
      console.error("Error when load data:", error);
    }
  };

  // === Lấy danh sách phòng còn trống trong 1 tuần ===
  const fetchAvailableRooms = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const oneWeekLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      const response = await api.get("/rooms/available", {
        params: { startDate: today, endDate: oneWeekLater },
      });

      setRooms(response.data.result || []);
      console.log("Danh sách phòng còn trống:", response.data.result);
    } catch (error) {
      console.error("Error when loading available rooms:", error);
    }
  };

  // === Lấy số lượng phòng trống ===
  const fetchAvailableCount = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const oneWeekLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      const res = await api.get(`/rooms/available/count`, {
        params: { startDate: today, endDate: oneWeekLater },
      });

      setAvailableCount(res.data.result || 0);
    } catch (err) {
      console.error("Lỗi khi lấy số phòng còn trống:", err);
    }
  };

  const fetchInvoiceStatus = async () => {
    try {
      const res = await api.get("/invoice/all");
      const invoices = res.data.result;
      const invoiceStatus = invoices.filter(
        (i) => i.status === 3 && i.checkOutDate
      );
      console.log(invoiceStatus);
      setInvoiceStatus(invoiceStatus);
    } catch (err) {
      console.error("Lỗi khi lấy invoice status da huy:", err);
    }
  };

  const fetchUserCount = async () => {
    try {
      const res = await api.get("/users");
      setUserCount(res.data.result);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách người dùng:", err);
    }
  };
  // === Hàm duyệt khách sạn ===
  const handleApprove = async (hotelId) => {
    try {
      const res = await api.put(`/hotels/approve/${hotelId}`);
      console.log("Duyệt thành công:", res.data);
      alert("✅ Duyệt khách sạn thành công!");
      fetchAllHotel();
    } catch (error) {
      console.error("Lỗi khi duyệt khách sạn:", error);
      alert("Duyệt thất bại!");
    }
  };

  // === Hàm xem chi tiết khách sạn ===
  const handleViewDetail = async (hotelId) => {
    try {
      const res = await api.get(`/hotels/see/${hotelId}`);
      console.log("Thông tin chi tiết khách sạn:", res.data.result);
      setSelectedHotel(res.data.result);
      setShowModal(true);
    } catch (error) {
      console.error("❌ Lỗi khi lấy chi tiết khách sạn:", error);
      alert("❌ Lấy chi tiết thất bại!");
    }
  };

  const handleDetaiClick = (title) => {
    if (title === "User") {
      navigate("/admin/user");
    } else if (title === "Pending Payments") {
      navigate("/admin/invoice");
    }
  };
  // === Hàm filter linechart ===
  const updateChartData = () => {
    if (!invoiceStatus.length) return;

    if (filter === "week") {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - dayOfWeek);
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
      const dayRevenue = Array(7).fill(0);
      invoiceStatus.forEach((inv) => {
        const checkOut = new Date(inv.checkOutDate);
        if (checkOut >= startOfWeek && checkOut <= endOfWeek) {
          const idx = checkOut.getDay(); // 0–6
          dayRevenue[idx] += inv.totalAmount || 0;
        }
      });
      setChartData({ labels: days, data: dayRevenue });
    } else if (filter === "month") {
      // === Tháng hiện tại ===
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth(); // 0–11
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const labels = Array.from({ length: daysInMonth }, (_, i) => `T${i + 1}`);
      const revenues = Array(daysInMonth).fill(0);

      invoiceStatus.forEach((inv) => {
        const checkOut = new Date(inv.checkOutDate);
        if (checkOut.getMonth() === month && checkOut.getFullYear() === year) {
          const day = checkOut.getDate() - 1;
          revenues[day] += inv.totalAmount || 0;
        }
      });

      setChartData({ labels, data: revenues });
    } else if (filter === "year") {
      // === Năm hiện tại ===
      const now = new Date();
      const year = now.getFullYear();
      const labels = Array.from({ length: 12 }, (_, i) => `T${i + 1}`);
      const revenues = Array(12).fill(0);

      invoiceStatus.forEach((inv) => {
        const checkOut = new Date(inv.checkOutDate);
        if (checkOut.getFullYear() === year) {
          const monthIdx = checkOut.getMonth(); // 0–11
          revenues[monthIdx] += inv.totalAmount || 0;
        }
      });

      setChartData({ labels, data: revenues });
    }
  };
  // === Hàm Update barChart ===
  const updateBarChart = async () => {
    try {
      const res = await api.get("/invoice/all");
      const data = res.data.result || [];
      const now = new Date();
      let labels = [];
      let bookedData = [];
      let canceledData = [];

      if (barFiler === "7-day-last") {
        labels = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
        const today = new Date();
        const dayOfWeek = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - dayOfWeek);
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        bookedData = Array(7).fill(0);
        canceledData = Array(7).fill(0);
        data.forEach((i) => {
          const d = new Date(i.checkOutDate);
          if (d >= startOfWeek && d <= endOfWeek) {
            const dayIdx = d.getDay();
            if (i.status === 3) bookedData[dayIdx]++;
            if (i.status === 4) canceledData[dayIdx]++;
          }
        });
      } else if (barFiler === "this-month") {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        labels = Array.from({ length: daysInMonth }, (_, i) => `T${i + 1}`);
        bookedData = Array(daysInMonth).fill(0);
        canceledData = Array(daysInMonth).fill(0);
        data.forEach((i) => {
          const d = new Date(i.checkOutDate);
          if (d.getMonth() === month && d.getFullYear() === year) {
            const day = d.getDate() - 1;
            if (i.status === 3) bookedData[day]++;
            if (i.status === 4) canceledData[day]++;
          }
        });
      } else if (barFiler === "this-year") {
        labels = Array.from({ length: 12 }, (_, i) => `T${i + 1}`);
        bookedData = Array(12).fill(0);
        canceledData = Array(12).fill(0);

        const y = now.getFullYear();

        data.forEach((inv) => {
          const d = new Date(inv.checkOutDate);
          if (d.getFullYear() === y) {
            const month = d.getMonth(); // 0–11
            if (inv.status === 3) bookedData[month]++;
            if (inv.status === 4) canceledData[month]++;
          }
        });
      }

      setBarChart({
        labels,
        datasets: [
          {
            label: "Booked",
            data: bookedData,
            backgroundColor: "#3B82F6",
            borderRadius: 4,
          },
          {
            label: "Canceled",
            data: canceledData,
            backgroundColor: "#EF4444",
            borderRadius: 4,
          },
        ],
      });
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu cho biểu đồ Booking/Cancel:", err);
    }
  };
  const updateUserChartData = () => {
    if (!userCount.length) return;

    if (filters === "week") {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - dayOfWeek);
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
      const dayCountUser = Array(7).fill(0);
      userCount.forEach((inv) => {
        const createAt = new Date(inv.createAt);
        if (createAt >= startOfWeek && createAt <= endOfWeek) {
          const idx = createAt.getDay();
          dayCountUser[idx]++;
        }
      });
      setChartUserData({ labels: days, data: dayCountUser });
    } else if (filters === "month") {
      // === Tháng hiện tại ===
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth(); // 0–11
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const labels = Array.from({ length: daysInMonth }, (_, i) => `T${i + 1}`);
      const counts = Array(daysInMonth).fill(0);

      userCount.forEach((inv) => {
        const createAt = new Date(inv.createAt);
        if (createAt.getMonth() === month && createAt.getFullYear() === year) {
          const day = createAt.getDate() - 1;
          counts[day]++;
        }
      });

      setChartUserData({ labels, data: counts });
    } else if (filters === "year") {
      // === Năm hiện tại ===
      const now = new Date();
      const year = now.getFullYear();
      const labels = Array.from({ length: 12 }, (_, i) => `T${i + 1}`);
      const counts = Array(12).fill(0);

      userCount.forEach((inv) => {
        const createAt = new Date(inv.createAt);
        if (createAt.getFullYear() === year) {
          const monthIdx = createAt.getMonth(); // 0–11
          counts[monthIdx]++;
        }
      });

      setChartUserData({ labels, data: counts });
    }
  };
  const handleDelete = async (hotelId) => {
    const result = await Swal.fire({
      title: "Bạn có chắc muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed) return;
    try {
      const response = await api.delete(`/hotels/${hotelId}`);
      toast.success(response.data.message);
      const request = await api.get("/hotels/getkhong");
      setHotels(request.data.result || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Có lỗi xảy ra khi xóa vai trò"
      );
    }
  };
  const fetchInvoiceCount = async () => {
    try {
      const req = await api.get("/invoice/count/hotel");
      const dataset = req.data.result;
      console.log("SIUUU", dataset);
      const top5 = dataset.slice(0, 5);
      const total = top5.reduce((sum, item) => sum + item.invoiceCount, 0);
      const labels = top5.map((item) => item.hotelName);
      const data = top5.map((item) =>
        ((item.invoiceCount / total) * 100).toFixed(1)
      );

      setChartInvoice({
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
          },
        ],
      });
    } catch (error) {
      console.log("Lỗi không lấy được count hotel", error);
    }
  };
  return (
    <div className="bg-gray-300 min-h-screen w-full ml-[70px] lg:ml-[300px] transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 place-items-center gap-5 p-5 ">
        <ItemHeader
          Icon={BedDoubleIcon}
          title="Available Rooms"
          value={availableCount}
          detail="VIEW DETAILS"
          onDetailClick={() => setShowRoomDetails(true)}
        />
        <ItemHeader
          Icon={ShoppingCartIcon}
          title="Today Checkout"
          value={invoice.length}
          detail="VIEW DETAILS"
          onDetailClick={() => setShowInvoicetoday(true)}
        />
        <ItemHeader
          Icon={BellRingIcon}
          title="User"
          value={userCount.length}
          detail="VIEW DETAILS"
          onDetailClick={() => handleDetaiClick("User")}
        />
        <ItemHeader
          Icon={MessageCircleQuestionIcon}
          title="Message"
          value="21"
          detail="VIEW DETAILS"
        />
        <ItemHeader
          Icon={CircleDollarSignIcon}
          title="Pending Payments"
          value={invoiceStatus.length}
          detail="VIEW DETAILS"
          onDetailClick={() => handleDetaiClick("Pending Payments")}
        />
      </div>

      {/* ==== Thống kê ==== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ml-5">
        {/* === Chart tổng doanh thu */}
        <RevenueLineChart
          chartData={chartData}
          filter={filter}
          setFilter={setFilter}
          title="Monthly Revenue"
        />
        {/* === Chart số lượng booking và cancel */}
        <BookingBarChart
          barChart={barChart}
          barFilter={barFiler}
          setBarFilter={setBarFilter}
        />
        {/* === Chart user */}
        <UserAreaLineChart
          chartData={chartUserData}
          filter={filters}
          setFilter={setFilters}
          title="UserSign"
        />

        <InvoiceDChart
          chartData={chartInvoice}
          title="Top 5 khách sạn nhiều lượt booking"
        />
      </div>

      {/* ==== Danh sách khách sạn chưa duyệt ==== */}
      <div className="pb-10">
        <h2 className="text-lg bg-gray-100 text-black font-bold p-3 ml-7 mr-10 rounded-lg">
          Hotels Pending Approval
        </h2>

        {hotels.length === 0 ? (
          <p className="text-center text-gray-600 mt-4">
            Không có khách sạn nào đang chờ duyệt.
          </p>
        ) : (
          <div className="mt-3">
            <div className="text-md grid grid-cols-6 text-center font-semibold">
              <p>Hotel Name</p>
              <p>Address</p>
              <p>Owner</p>
              <p>Phone</p>
              <p>Status</p>
              <p>Actions</p>
            </div>

            {hotels.map((hotel) => {
              const status = Number(hotel.status);
              return (
                <div
                  key={hotel.hotelId}
                  className="grid grid-cols-6 text-center border-b border-gray-200 py-2 items-center"
                >
                  <p>{hotel.hotelName}</p>
                  <p>{hotel.hotelAddress}</p>
                  <p>
                    {hotel.user
                      ? `${hotel.user.firstName} ${hotel.user.lastName}`
                      : "N/A"}
                  </p>
                  <p>{hotel.hotelPhone}</p>
                  <p className="text-yellow-600 font-semibold">
                    {status === 0 ? "Chưa duyệt" : "Đã duyệt"}
                  </p>
                  <div className="flex justify-center gap-2">
                    {status === 0 && (
                      <button
                        onClick={() => handleApprove(hotel.hotelId)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                      >
                        Duyệt
                      </button>
                    )}
                    <button
                      onClick={() => handleViewDetail(hotel.hotelId)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
                    >
                      Xem chi tiết
                    </button>
                    <button
                      onClick={() => handleDelete(hotel.hotelId)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ==== Modal hiển thị chi tiết khách sạn ==== */}
      {showModal && selectedHotel && (
        <HotelDetailModal
          hotel={selectedHotel}
          onClose={() => setShowModal(false)}
        />
      )}
      {showInvoicetoday && (
        <InvoiceTodayModal
          invoices={invoice}
          onClose={() => setShowInvoicetoday(false)}
        />
      )}

      {showRoomDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[80%] lg:w-[70%] max-h-[80vh] overflow-auto relative">
            <button
              onClick={() => setShowRoomDetails(false)}
              className="absolute top-2 right-2 text-red-500 font-bold text-lg"
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4">Available Rooms</h2>
            {/* Render dữ liệu rooms từ database */}
            {rooms.length === 0 ? (
              <p>Không có phòng trống</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {rooms.map((room) => (
                  <RoomAvailableKid key={room.roomId} {...room} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
