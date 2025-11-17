import { useEffect, useState } from "react";
import EditHotelForm from "./DetailHotelForm";
import api from "../api";
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegCommentDots, FaConciergeBell } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import banner2 from "../assets/img/banner2.jpg"
import SlidePanel from "../components/Common/SlidePanel";
import ImageSlider from "../components/Common/ImageSlider";
import { Phone } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import ModelForm from "../components/Common/FormModel";

export default function HotelManager() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [images, setImages] = useState([])
  const [feedbacks, setFeedBacks] = useState([])
  const [services, setServices] = useState([])
  const [openSlide, setOpenSlide] = useState(false);
  const [slideContent, setSlideContent] = useState(""); // "feedback" hoặc "service"


  useEffect(() => {
    const fetchAllImgHotel = async () => {
      try {
        const respone = await api.get(`/images/hotel/${selectedHotel.hotelId}`)
        setImages(respone.data.result)
      } catch (error) {
        console.log("Khong the lay anh theo hotelid", error)
      }
    }
    fetchAllImgHotel()
  }, [selectedHotel])

  const [rooms, setRooms] = useState([])
  useEffect(() => {
    const fetchRoomByHotelId = async () => {
      try {
        const response = await api.get(`/rooms/hotel/${selectedHotel.hotelId}`)
        setRooms(response.data.result || [])
      } catch (error) {
        console.log("Khong the lay du lieu phong", error)
      }
    }
    fetchRoomByHotelId()
  }, [selectedHotel])

  const fetchHotels = async () => {
    try {
      const res = await api.get("/hotels/all");
      setHotels(res.data.result || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchFeedBackByHotelId = async () => {
      if (selectedHotel) {
        try {
          const response = await api.get(`review/hotel/${selectedHotel.hotelId}`)
          setFeedBacks(response.data.result)
        } catch (error) {
          console.error("Error when load data :", error);
        }
      }
    }
    fetchFeedBackByHotelId()
  }, [selectedHotel])

  useEffect(() => {
    const fetchHotelServices = async () => {
      if (selectedHotel) {
        try {
          const response = await api.get(`/service/hotel/${selectedHotel.hotelId}`)
          setServices(response.data.result)
        } catch (error) {
          console.log("Khong the lay dich vu khach san", error)
        }
      }
    }
    fetchHotelServices()
  }, [selectedHotel])

  const handleDelete = async (hotelId) => {
    if (!window.confirm("Bạn có chắc muốn xóa khách sạn này?")) return;
    try {
      await api.delete(`/hotels/${hotelId}`);
      fetchHotels();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);





  return (
    <div className="p-4 flex ">
      <div className="w-80">
      </div>
      <div>
        <h3 className="w-full p-4 font-bold text-lg md:text-xl">
          TẤT CẢ KHÁCH SẠN
        </h3>

        <div className="relative group px-4 md:px-8">

          <ul
            className=" flex-row gap-4 overflow-x-auto scrollbar-hide scroll-smooth md:gap-6 md:overflow-hidden"
          >
            {hotels.map((hotel) => {
              const hotelImages = images.filter(
                (img) => img.hotelId === hotel.hotelId || img.hotel?.hotelId === hotel.hotelId
              );

              return (
                <div key={hotel.hotelId} className="flex w-[1400px] h-[250px] flex-col md:flex-row bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  {/* Ảnh khách sạn */}
                  <div className="md:w-1/3 h-30 md:h-auto">
                    {hotelImages.length > 0 ? (
                      <ImageSlider sliders={hotelImages} />
                    ) : (
                      <div className="flex justify-center items-center h-full text-[#4b2e1f]/70">
                        Chưa có hình ảnh
                      </div>
                    )}
                  </div>

                  {/* Thông tin khách sạn */}
                  <div className="flex-1 flex flex-col justify-between p-4">
                    <div>
                      {/* Tên & liên hệ */}
                      <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-blue-600 mb-1">{hotel.hotelName}</h2>
                        <div className="flex items-center gap-2">
                          <Phone className="text-blue-500" />
                          <span>Liên hệ: {hotel.hotelPhone}</span>
                        </div>
                      </div>

                      {/* Địa chỉ */}
                      <div className="flex items-start gap-2 mb-2">
                        <FaMapMarkerAlt className="text-red-500 mt-1" />
                        <p className="text-gray-700">
                          <span className="font-semibold text-gray-800">Địa chỉ:</span>{" "}
                          {hotel.hotelAddress}
                        </p>
                      </div>

                      {/* Mô tả */}
                      <p className="text-gray-600 text-sm md:text-base mb-2 line-clamp-2">
                        {hotel.hotelDescription}
                      </p>

                      {/* Số phòng & đánh giá */}
                      <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-700">
                        <span>
                          <strong>⭐ {hotel.hotelRating}</strong> / 5
                        </span>
                        <span>|</span>
                        <span>{hotel.hotelTotalRoom} phòng</span>
                      </div>
                    </div>

                    {/* Giá & nút */}
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <span className="text-gray-600 text-sm">Giá từ</span>
                        <p className="text-lg md:text-xl font-semibold text-green-600">
                          {hotel.hotelCost.toLocaleString("vi-VN")}₫ / đêm
                        </p>
                      </div>

                      <div className="flex gap-2 mt-2">
                        <button onClick={() => setSelectedHotel(hotel)} className="w-35 h-10 bg-white border rounded-full shadow-lg hover:bg-blue-100 flex items-center justify-center transition text-xl font-bold">
                          Xem chi tiết
                        </button>
                        <button onClick={() => handleDelete(hotel.hotelId)} className="w-20 h-10 bg-white border rounded-full shadow-lg hover:bg-blue-100 flex items-center justify-center transition text-xl font-bold">
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}


          </ul>


        </div>

        {selectedHotel && (
          <ModelForm width="1150px" onClose={() => setSelectedHotel(null)}>
            <div className="w-[1150px] grid grid-cols-1 md:grid-cols-12 gap-2">
              {/* Cột 1: Thông tin cá nhân */}
              <div className="md:col-span-4 flex justify-center">
                <div className="bg-white shadow-lg rounded-2xl w-full p-8">
                  <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Chủ khách sạn
                  </h1>

                  <div className="flex flex-col items-center mb-6">
                    <div className="relative w-24 h-24">
                      <img
                        alt="Avatar"
                        src={selectedHotel.user.avatar || "/default-avatar.png"}
                        className="w-24 h-24 rounded-full object-cover border"
                      />
                      <input
                        id="avatar"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Họ</label>
                      <input
                        value={selectedHotel.user.firstName}
                        disabled
                        className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Tên</label>
                      <input
                        value={selectedHotel.user.lastName}
                        disabled
                        className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        value={selectedHotel.user.email}
                        disabled
                        className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                      <input
                        disabled
                        value={selectedHotel.user.phone}
                        className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Ngày sinh</label>
                      <input
                        type="date"
                        value={selectedHotel.user.dateOfBirth || ""}
                        disabled
                        className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cột 2 */}
              <div className="md:col-span-5 flex flex-col justify-start items-center bg-white shadow-lg rounded-2xl pb-2 gap-4 w-full mx-auto">

                <h2 className="text-2xl font-bold text-[#4b2e1f] text-center">{selectedHotel.hotelName}</h2>
                <p className="flex items-center text-gray-600 text-sm text-center">
                  <FaMapMarkerAlt className="text-red-600 mr-2" /> {selectedHotel.hotelAddress}
                </p>

                <div className="flex justify-center gap-15 items-center w-full mt-2 text-gray-700 text-sm px-4">
                  {/* Điện thoại */}
                  <div className="flex items-center gap-1">
                    <FaPhoneAlt className="text-green-600" />
                    {selectedHotel.hotelPhone}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full font-semibold text-sm">
                      {selectedHotel.hotelRating.toFixed(1)}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {feedbacks.length} đánh giá
                    </span>
                  </div>
                </div>


                <div className="flex justify-center gap-15 w-full mt-2 text-gray-700 text-sm px-4">
                  <span className="flex items-center gap-1">
                    <FaBed className="text-blue-600" /> {selectedHotel.hotelTotalRoom} phòng
                  </span>
                  <span className="flex items-center gap-1">
                    <FaDollarSign className="text-green-600" /> {selectedHotel.hotelCost.toLocaleString()}₫/đêm
                  </span>
                </div>

                {selectedHotel.hotelDescription && (
                  <p className="text-gray-700 text-sm text-center mt-2 line-clamp-4">
                    {selectedHotel.hotelDescription}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-2 w-[95%]">
                  {(images.length > 0 ? images : [banner2]).map((img, idx) => (
                    <img
                      key={idx}
                      src={img.imgUrl || banner2}
                      alt={`hotel-${idx}`}
                      className="w-full h-32 object-cover rounded shadow-sm"
                    />
                  ))}
                </div>
              </div>


              {/* Cột 3 */}
              <div className="md:col-span-3 flex flex-col gap-6 p-4 w-full max-h-[80vh] overflow-y-auto">
                <button
                  onClick={() => {
                    setSlideContent("feedback");
                    setOpenSlide(true);
                  }}
                  className="flex items-center gap-3 w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-200"
                >
                  <FaRegCommentDots className="text-xl" />
                  <span className="text-lg">Xem tất cả đánh giá</span>
                </button>

                <button
                  onClick={() => {
                    setSlideContent("service");
                    setOpenSlide(true);
                  }}
                  className="flex items-center gap-3 w-full bg-green-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:bg-green-700 hover:scale-105 transition-transform duration-200"
                >
                  <FaConciergeBell className="text-xl" />
                  <span className="text-lg">Xem tất cả dịch vụ</span>
                </button>

                <button
                  onClick={() => {
                    setSlideContent("rooms");
                    setOpenSlide(true);
                  }}
                  className="flex items-center gap-3 w-full bg-purple-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:bg-purple-700 hover:scale-105 transition-transform duration-200"
                >
                  <FaBed className="text-xl" />
                  <span className="text-lg">Xem danh sách phòng</span>
                </button>

                <SlidePanel isOpen={openSlide} onClose={() => setOpenSlide(false)} width="50%">

                  {slideContent === "feedback" ? (
                    /* ==== FEEDBACK ==== */
                    <div>
                      <h2 className="text-xl font-bold mb-4">Tất cả đánh giá</h2>
                      {feedbacks.length > 0 ? (
                        feedbacks.map((f, i) => (
                          <div key={i} className="border-b py-2">
                            <p className="text-gray-700">{f.feedback}</p>
                            <p className=" text-sm font-medium mt-1">
                              Khách hàng : {f.user.firstName} {f.user.lastName} — Đánh giá {f.star} ⭐
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">Chưa có đánh giá nào.</p>
                      )}
                    </div>

                  ) : slideContent === "service" ? (
                    /* ==== SERVICE ==== */
                    <div>
                      <h2 className="text-xl font-bold mb-4">Tất cả dịch vụ</h2>
                      {services.length > 0 ? (
                        services.map((s) => (
                          <div key={s.serviceId} className="flex items-center gap-3 border-b py-2">
                            <img src={s.icon} className="w-6 h-6" />
                            <p className="text-gray-700">{s.serviceName}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">Chưa có dịch vụ nào.</p>
                      )}
                    </div>

                  ) : (
                    /* ==== ROOMS ==== */
                    <div>
                      <h2 className="text-2xl font-bold mb-6">Danh sách phòng</h2>

                      {rooms.length > 0 ? (
                        rooms.map((r) => (
                          <div
                            key={r.roomId}
                            className="border p-4 mb-4 rounded-xl shadow-sm hover:shadow-md transition flex items-center gap-4"
                          >
                            {/* Ảnh bên trái */}
                            <img
                              // src={r.imageUrls?.[0] || "/no-image.jpg"}
                              src={banner2}
                              alt={r.roomName}
                              className="w-40 h-35 object-cover rounded-lg shadow"
                            />

                            {/* Thông tin bên phải */}
                            <div className="flex-1">
                              <p className="text-xl font-bold text-blue-700">{r.roomName} ({r.roomType})</p>
                              <p className="text-base text-gray-700 mt-1 mb-1">
                                Giá:{" "}<span className="font-semibold text-green-700">{r.roomPrice.toLocaleString()}₫</span>{" "}/ đêm
                              </p>

                              <div className="grid grid-cols-2 gap-2 text-gray-700 text-base">
                                <p>Dien tich: <span className="font-semibold">{r.roomArea}m²</span></p>
                                <p>Sức chứa: <span className="font-semibold">{r.roomCapacity}</span></p>
                                <p>Số phòng ngủ: <span className="font-semibold">{r.bedRoomCount}</span></p>
                                <p>Số giường ngủ: <span className="font-semibold">{r.bedCount}</span></p>
                              </div>


                              <p className="text-base text-gray-700 justify-end flex mt-1">
                                Trạng thái:{" "}
                                <span
                                  className={
                                    r.status === 0
                                      ? "text-green-600 font-semibold"
                                      : r.status === 1
                                        ? "text-red-600 font-semibold"
                                        : r.status === 2
                                          ? "text-orange-500 font-semibold"
                                          : r.status === 3
                                            ? "text-purple-600 font-semibold"
                                            : "text-gray-500"
                                  }
                                >
                                  {r.status === 0
                                    ? " Còn trống"
                                    : r.status === 1
                                      ? " Khách đang ở"
                                      : r.status === 2
                                        ? " Đã đặt"
                                        : r.status === 3
                                          ? " Bảo trì"
                                          : " Không xác định"}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 italic">Chưa có phòng nào.</p>
                      )}
                    </div>


                  )}

                </SlidePanel>

              </div>

            </div>


          </ModelForm>
        )}
      </div>
    </div>
  );
}
