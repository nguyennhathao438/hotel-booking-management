import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EditHotelForm from "./DetailHotelForm";
import api from "../api";
import testImg from "../assets/img/banner2.jpg";
import ImageSlider from "../components/Common/ImageSlider";
import { Phone } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import CustomerInfo from "./CustomerInfo";

export default function HotelManager() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const scrollRef = useRef(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
    const [images, setImages] = useState([])

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
useEffect(() => {
        const fetchAllImgHotel = async () => {
            const respone = await api.get("/images/all")
            setImages(respone.data.result)
        }
        fetchAllImgHotel()
    }, [])
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

        <ul
          ref={scrollRef}
          className=" flex-row gap-4 overflow-x-auto scrollbar-hide scroll-smooth md:gap-6 md:overflow-hidden"
        >
       {hotels.map((hotel) => {
         const hotelImages = images.filter(
           (img) => img.hotelId === hotel.hotelId || img.hotel?.hotelId === hotel.hotelId
         );

         return (
           <div
             key={hotel.hotelId}
             className="flex w-[1400px] h-[250px] flex-col md:flex-row bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
           >
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
                     <h2 className="text-2xl font-bold text-blue-600 mb-1">
                       {hotel.hotelName}
                     </h2>
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
                 </div>
               </div>
             </div>
           </div>
         );
       })}


        </ul>


      </div>

      {selectedHotel && (
        <div
          className="fixed inset-0  bg-black/30 flex justify-center items-start pt-20 z-50"
                      style={{ paddingTop: "10px" }}

          onClick={() => setSelectedHotel(null)}
        >
          <div
            className="w-[1600px] h-[850px]  max-w-full bg-white p-6 rounded shadow-lg relative flex gap-6 "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-12 h-12 bg-white border rounded-full shadow-lg hover:bg-blue-100 flex items-center absolute justify-center top-2 right-2 text-xl font-bold"
              onClick={() => setSelectedHotel(null)}
            >
              ✕
            </button>
            <div className="flex gap-6 max-h-[800px]">


              {/* Thông tin admin */}
              <div className="flex-1 overflow-y-auto p-2">
                <CustomerInfo userId={selectedHotel.userId} readOnly={true} />
              </div>
            </div>


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
