import { useEffect, useState } from "react";
import ItemHeader from "./ItemHeader.jsx";
import SideBar from "./SideBar.jsx";
import ViewRoom from "./viewRoom.jsx";
import InvoiceTodayModal from "./InvoiceTodayModal.jsx";
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

export default function DashBoard() {
  const [rooms, setRooms] = useState([]);
  const [availableCount, setAvailableCount] = useState(0);
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const [invoice, setInvoicetoday] = useState([]);
  const [showInvoicetoday, setShowInvoicetoday] = useState(false);
  useEffect(() => {
    fetchAvailableRooms();
    fetchAvailableCount();
    fetchAllHotel();
    fetchCheckouttoday();
  }, []);
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

  return (
    <div className="bg-gray-300 ml-[300px] w-full min-h-screen">
      {/* ==== Thống kê ==== */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 px-7 py-8">
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
          title="Cancellation"
          detail="VIEW DETAILS"
        />
        <ItemHeader
          Icon={MessageCircleQuestionIcon}
          title="Enquiries"
          value="21"
          detail="VIEW DETAILS"
        />
        <ItemHeader
          Icon={CircleDollarSignIcon}
          title="Pending Payments"
          detail="VIEW DETAILS"
        />
      </div>

      {/* ==== Biểu đồ (placeholder) ==== */}
      <div className="bg-gray-100 ml-7 mr-10 rounded-lg shadow-sm p-5 mb-8">
        <h2 className="text-xl font-semibold mb-2">Booking Status</h2>
        <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
          (Biểu đồ thống kê đang cập nhật...)
        </div>
      </div>

      {/* ==== Danh sách phòng trống ==== */}
      <div className="px-7 py-4">
        <h2 className="text-lg font-semibold py-2">Available Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {rooms.map((room) => (
            <RoomAvailableKid key={room.roomId} {...room} />
          ))}
        </div>
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
                  <p>{hotel.user ? `${hotel.user.firstName} ${hotel.user.lastName}` : "N/A"}</p>
                  <p>{hotel.hotelPhone}</p>
                  <p className="text-yellow-600 font-semibold">{status === 0 ? "Chưa duyệt" : "Đã duyệt"}</p>
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