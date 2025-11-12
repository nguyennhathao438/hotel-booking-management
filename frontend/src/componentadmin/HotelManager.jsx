import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, CircleDollarSignIcon, HotelIcon, StarIcon } from "lucide-react";
import EditHotelForm from "./DetailHotelForm";
import api from "../api";
import testImg from "../assets/img/banner2.jpg";
import ImageSlider from "../components/Common/ImageSlider";
import { Phone } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import CustomerInfo from "./CustomerInfo";
import Swal from "sweetalert2";

export default function HotelManager() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const scrollRef = useRef(null);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [images, setImages] = useState([])
  const [selectedRating,setSelectedRating] = useState(null);
  const [selectedAmount,setSelectedAmount] = useState(null);
  const [keywords,setKeyWords] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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

  const fetchHotels = async (
    page = 1,
    rating = selectedRating,
    sort = selectedAmount
  ) => {
    try {
      let sortByCost = null;
      if (sort === "low") sortByCost = "asc";
      else if (sort === "best") sortByCost = "desc";
      const res = await api.get("hotels/all/page", {
        params: {
          pageNo: page,
          pageSize: 5,
          hotelRating: rating || undefined,
          sortByCost: sortByCost || undefined,
          keyword: keywords || undefined,
        },
      });
      const hotels = res.data.result;
      console.log("dữ liệu hotel", hotels);
      setHotels(hotels.content || []);
      setTotalPages(hotels.totalPages);
      setCurrentPage(hotels.number + 1 || 1);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách người dùng:", err);
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
      await api.delete(`/hotels/${hotelId}`);
      fetchHotels();
    } catch (err) {
      console.error(err);
    }
  };
  const getDynamicPagination = (currentPage, totalPages) => {
  if (totalPages <= 8) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const pages = [1, 2]; // luôn show 2 trang đầu
  const left = Math.max(currentPage - 1, 3);
  const right = Math.min(currentPage + 1, totalPages - 2);

  if (left > 3) pages.push("...");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < totalPages - 2) pages.push("...");

  pages.push(totalPages - 1, totalPages); // luôn show 2 trang cuối
  return pages;
  };

  useEffect(() => {
    fetchHotels(1);
  }, [keywords, selectedRating, selectedAmount]);

  return (
    <div className="p-4 flex ">
        <div className="w-80">
        </div>
         <div>
      <h3 className="w-full p-4 font-bold text-lg md:text-xl space-x-0.5">
        <HotelIcon className="w-8 h-8 inline"/>
        <span>TẤT CẢ KHÁCH SẠN</span>
      </h3>
      <div className="p-4 flex items-end space-x-6 rounded-lg mb-2">
        {/* Lọc theo sao */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700 space-x-1">
            <StarIcon className="inline w-5 h-5 fill-yellow-300 text-yellow-300"/>
            <span>Số sao</span>
          </label>
          <select 
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedRating || ""}
            onChange={(e) => {
              const values = e.target.value ? Number(e.target.value) : null;
              setSelectedRating(values);
              fetchHotels(1,values,selectedAmount);
            }}
          >
            <option value="">Tất cả</option>
            <option value="1">1 sao</option>
            <option value="2">2 sao</option>
            <option value="3">3 sao</option>
            <option value="4">4 sao</option>
            <option value="5">5 sao</option>
          </select>
        </div>

        {/* Lọc theo giá */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700 space-x-1">
          <CircleDollarSignIcon className="inline w-5 h-5 text-emerald-500"/>
          <span>Theo giá</span>
          </label>
          <select 
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedAmount || ""}
            onChange={(e) => {
              const values = e.target.value;
              setSelectedAmount(values);
              fetchHotels(1,selectedRating,values);
            }}  
          >
            <option value="">Mặc định</option>
            <option value="low">Thấp đến cao</option>
            <option value="best">Cao đến thấp</option>
          </select>  
        </div>

        {/* Ô tìm kiếm */}
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium mb-1 text-gray-700">Tìm kiếm</label>
          <input 
            type="text"
            placeholder="Nhập tên hoặc địa chỉ khách sạn..."
            value={keywords}
            onChange={(e) => setKeyWords(e.target.value)}
            onKeyDown={(e) => {
            if (e.key === "Enter") fetchHotels(1, selectedRating, selectedAmount);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-[600px]"
          />
        </div>
      </div>

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
             className="flex w-[1100px] h-[250px] flex-col md:flex-row bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
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

      <div className="flex justify-center mt-6 space-x-2">
        {getDynamicPagination(currentPage, totalPages).map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-1">...</span>
        ) : (
          <button
            key={index}
            onClick={() => fetchHotels(page)}
            className={`px-3 py-1 border rounded-md ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}

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
