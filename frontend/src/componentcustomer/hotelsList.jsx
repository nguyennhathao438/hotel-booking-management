import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import testImg from "../assets/img/banner1.jpg";
import api from "../api";
import RoomManagerCustomer from "../componentcustomer/RoomManagerCustomer";
import AddRoom from "../componentcustomer/AddRoom";
import EditHotelForm from "../componentcustomer/EditHotelForm";

export default function HotelList() {
  const [images, setImages] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [DetailHotel, setDetailHotel] = useState(null);
  const [showRooms, setShowRooms] = useState(false);
  const [addRooms, setAddRooms] = useState(false);
  const user = useSelector((state) => state.user);

  const getHotelImages = async (hotelId) => {
    try {
      const res = await api.get(`/images/hotel/${hotelId}`);
      return (res.data?.result || []).map((img) => ({ ...img, hotelId }));
    } catch (err) {
      console.error(`Lỗi khi lấy ảnh khách sạn ${hotelId}:`, err);
      return [];
    }
  };

  useEffect(() => {
    const fetchHotelsAndImages = async () => {
      if (!user?.userId) return;
      try {
        const res = await api.get(`/hotels/user/${user.userId}`);
        const hotelsList = res.data.result || [];
        setHotels(hotelsList);

        const imagesPromises = hotelsList.map((hotel) =>
          getHotelImages(hotel.hotelId)
        );
        const allImagesArrays = await Promise.all(imagesPromises);
        setImages(allImagesArrays.flat());
      } catch (err) {
        console.error("Lỗi khi lấy khách sạn hoặc ảnh:", err);
      }
    };
    fetchHotelsAndImages();
  }, [user?.userId]);

  return (
    <div className="p-1 relative font-serif ml-[300px]">
      <h2 className="text-4xl font-bold mb-3 text-center">Khách sạn của bạn</h2>

      <div className="flex flex-row items-center">
        <ul className="flex w-full flex-row gap-3 overflow-x-auto scrollbar-hide md:grid md:grid-cols-1 lg:grid-cols-1 md:gap-6 md:overflow-visible">
          {hotels.map((hotel) => {
            const hotelImages = images.filter(
              (img) => img.hotelId === hotel.hotelId
            );
            return (
              <li
                key={hotel.hotelId}
                className="w-full md:w-auto flex-shrink-0 border rounded-2xl shadow-lg hover:shadow-2xl transition bg-white cursor-pointer"
                onClick={() => setDetailHotel(hotel)}
              >
                <img
                  src={hotelImages[0]?.imgUrl || testImg}
                  alt={hotel.hotelName}
                  className="w-full h-160 object-cover rounded-t-xl transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="font-bold text-base text-center line-clamp-1">
                    {hotel.hotelName}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-1 text-center">
                    {hotel.hotelAddress}
                  </p>
                  <p className="hidden md:block text-sm text-gray-500 line-clamp-2 text-center">
                    {hotel.hotelDescription}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold text-blue-600">
                      ⭐ {hotel.hotelRating}
                    </span>
                    <span className="font-semibold text-blue-600">
                      Giá: {hotel.hotelCost.toLocaleString()} VNĐ
                    </span>
                  </div>
                  <p className="mt-1 text-sm">
                    Trạng thái:{" "}
                    <span
                      className={
                        hotel.status === 0
                          ? "text-yellow-600 font-semibold"
                          : "text-green-600 font-semibold"
                      }
                    >
                      {hotel.status === 0 ? "Đang duyệt" : "Đang hoạt động"}
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Xem phòng */}
      <div className="flex justify-center mt-6 relative group">
        <button
          onClick={() => setShowRooms(!showRooms)}
          className="w-12 h-12 bg-white border rounded-full shadow-lg hover:bg-blue-100 flex items-center justify-center transition text-xl font-bold"
        >
          {showRooms ? "↑" : "↓"}
        </button>
        <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1">
          Xem ds phòng
        </span>
      </div>

      {/* Thêm phòng */}
      <div className="w-full flex justify-end items-center mt-3">
        <button
          className="w-50 h-10 bg-white border rounded-full shadow-lg hover:bg-blue-100 flex items-center justify-center transition text-xl font-bold"
          onClick={() => setAddRooms(!addRooms)}
        >
          Thêm phòng
        </button>
      </div>

      {addRooms && hotels.length > 0 && (
        <div className="mt-6">
          <AddRoom
            hotelId={hotels[0].hotelId}
            hotelName={hotels[0].hotelName}
          />
        </div>
      )}

      {showRooms && hotels.length > 0 && (
        <div className="mt-6">
          <RoomManagerCustomer
            hotelId={hotels[0].hotelId}
            hotelName={hotels[0].hotelName}
          />
        </div>
      )}

      {/* Modal detail hotel */}
      {DetailHotel && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-start pt-20 z-50 overflow-y-auto"
          onClick={() => setDetailHotel(null)}
        >
          <div
            className="border w-[1200px] max-w-full bg-white p-6 rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-10 h-10 absolute top-2 border rounded-full right-2 text-xl font-bold"
              onClick={() => setDetailHotel(null)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">{DetailHotel.hotelName}</h2>

            <EditHotelForm
              hotel={DetailHotel}
              onClose={() => setDetailHotel(null)}
              onUpdated={() => {
                api
                  .get(`/hotels/user/${user.userId}`)
                  .then((res) => setHotels(res.data.result || []))
                  .catch((err) => console.error(err));
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
