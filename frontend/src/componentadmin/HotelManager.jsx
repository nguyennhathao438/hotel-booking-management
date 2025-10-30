import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EditHotelForm from "./DetailHotelForm";
import api from "../api";
import testImg from "../assets/img/banner2.jpg";

export default function HotelManager() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const fetchHotels = async () => {
    try {
      const res = await api.get("/hotels/all");
      setHotels(res.data.result || []);
    } catch (err) {
      console.error(err);
    }
  };

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
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-blue-100 transition"
        >
          <ChevronLeft className="text-blue-600" />
        </button>

        <ul
          ref={scrollRef}
          className="flex flex-row gap-4 overflow-x-auto scrollbar-hide scroll-smooth md:gap-6 md:overflow-hidden"
        >
          {hotels.map((hotel) => (
            <div
              key={hotel.hotelId}
              className="flex-shrink-0 w-[240px] md:w-[260px] lg:w-[280px] h-[360px] flex flex-col justify-between rounded-xl border shadow p-4 bg-white"
            >
              <div className="overflow-hidden h-[45%]">
               <img
                 src={hotel.hotelImages && hotel.hotelImages.length > 0 ? hotel.hotelImages[0] : testImg}
                 alt={hotel.hotelName || "Ảnh khách sạn"}
                 className="w-full h-full object-cover rounded-t-xl hover:scale-105 transition-transform duration-300"
               />
              </div>
              <div className="flex flex-col justify-between h-[55%] p-2">
                <h3 className="font-bold text-base text-center line-clamp-1">
                  {hotel.hotelName}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-1 text-center">
                  {hotel.hotelAddress}
                </p>
                <p className="text-sm text-gray-500 line-clamp-2 text-center">
                  {hotel.hotelDescription}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-semibold text-blue-600">
                    ⭐ {hotel.hotelRating}
                  </span>
                  <span className="font-semibold text-orange-600 text-sm">
                    {hotel.hotelCost.toLocaleString()} VNĐ
                  </span>
                </div>
                <div className="flex gap-2 mt-2 ">
                  <button
                    onClick={() => setSelectedHotel(hotel)}
                    className="w-35 h-10 bg-white border rounded-full shadow-lg hover:bg-blue-100 flex items-center justify-center transition text-xl font-bold"
                  >
                    Xem chi tiết
                  </button>
                  <button
                    onClick={() => handleDelete(hotel.hotelId)}
                    className="w-20 h-10 bg-white border rounded-full shadow-lg hover:bg-blue-100 flex items-center justify-center transition text-xl font-bold"
                  >
                    Xóa
                  </button>
{/*                   note sau nay sua nut xoa nay thanh thay doi trang thai an di ks =>> thay doi cho phe duyet tu 0 va 1 thanh 0 1 va 2 */}
                </div>
              </div>
            </div>
          ))}
        </ul>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-blue-100 transition"
        >
          <ChevronRight className="text-blue-600" />
        </button>
      </div>

      {selectedHotel && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-start pt-20 z-50"
         onClick={() => setSelectedHotel(null)}
        >
          <div
            className="w-[1400px] max-w-full bg-white p-6 rounded shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-12 h-12 bg-white border rounded-full shadow-lg hover:bg-blue-100 flex items-center absolute justify-center top-2 right-2 text-xl font-bold"
              onClick={() => setSelectedHotel(null)}
            >
              ✕
            </button>
            <EditHotelForm
              hotel={selectedHotel}
              onClose={() => setSelectedHotel(null)}
              onUpdated={fetchHotels}
            />
          </div>
        </div>
      )}
  </div>
    </div>
  );
}
