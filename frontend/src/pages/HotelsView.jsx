import { MapPinIcon, PhoneIcon, Star, StarHalf, StarIcon, StarOff } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import ImageSlider from "../components/Common/ImageSlider"
export default function HotelsView() {
  const [hotelList, setHotelList] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [active, setActive] = useState("top"); 
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hotelImages,setHotelImages] = useState([]);
  const [keywords,setKeyWords] = useState("");
  const getHotels = async (
    page = 1,
    rating = selectedRating,
    sort = active
  ) => {
    try {
      let sortByCost = null;
      if (sort === "low") sortByCost = "asc";
      else if (sort === "best") sortByCost = "desc";
      const res = await api.get("hotels/all/get-page", {
        params: {
          pageNo: page,
          pageSize: 7,
          hotelRating: rating || undefined,
          sortByCost: sortByCost || undefined,
          keyword: keywords || undefined,
        },
      });
      const hotels = res.data.result;
      console.log("dữ liệu hotel", hotels);
      const hotelArray = hotels.content || [];
      setHotelList(hotelArray);
      hotelArray.forEach((hotel) => getImg(hotel.hotelId));
      setTotalPages(hotels.totalPages || 1);
      setCurrentPage(hotels.number + 1 || 1);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách khách sạn:", err);
    }
  };
  
  const getImg = async (hotelId) => {
    try {
    const res = await api.get(`images/hotel/${hotelId}`);
    const imgList = res.data.result;
    if (imgList && imgList.length > 0) {
      // Lưu ảnh đầu tiên làm ảnh đại diện
      setHotelImages((prev) => ({
        ...prev,
        [hotelId]: imgList,
      }));
    }
  } catch (err) {
    console.error("Lỗi khi lấy ảnh khách sạn:", err);
    }
  }
  useEffect(() => {
    getHotels(1);
  }, [keywords, selectedRating, active]);
  const buttons = [
    { id: "top", label: "Lựa chọn hàng đầu của chúng tôi" },
    { id: "low", label: "Giá thấp trước" },
    { id: "best", label: "Giá cao trước" },
  ];
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      getHotels(page);
    }
  };
  const handleRatingChange = (rating) => {
    setSelectedRating(rating === selectedRating ? null : rating);
  };
  return (
    <>
      <div className="w-full bg-white shadow-md rounded-lg px-4 py-6 md:p-6">
        <div className="flex flex-col lg:flex-row gap-6 mt-[90px] p-6">
          {/* Cột trái: Bộ lọc */}
          <div className="border border-gray-200 p-5 rounded w-full lg:w-[260px] h-max">
            {/* Đánh giá sao */}
            <div className="mb-6">
              <h2 className="font-semibold mb-3 text-lg text-gray-800">
                Đánh giá sao
              </h2>
              {[5, 4, 3, 2, 1].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center space-x-2 mb-2 cursor-pointer text-gray-700 hover:text-blue-600"
                >
                  <input
                    type="checkbox"
                    checked={selectedRating === rating}
                    onChange={() => handleRatingChange(rating)}
                    className="cursor-pointer accent-blue-500"
                  />
                  <span>{rating} sao</span>
                </label>
              ))}
            </div>
          </div>

          {/* Cột phải: Nút lọc và danh sách */}
          <div className="flex-1">
            {/* Nút sắp xếp */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6 text-sm sm:text-base">
              {buttons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setActive(btn.id)}
                  className={`px-4 py-2 rounded-md border transition
                ${
                  active === btn.id
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white hover:text-white border-gray-300 hover:bg-blue-500"
                }`}
                >
                  {btn.label}
                </button>
              ))}
              <input 
                  type="text"
                  placeholder="Tìm kiếm theo tên và địa chỉ"
                  className="w-96 border-2 border-gray-400 p-2"
                  value={keywords}
                  onChange={(e) => setKeyWords(e.target.value)}
              />
            </div>
            {/* Khu vực danh sách khách sạn */}
            <div className="space-y-5">
              {!hotelList ? (
                <div>No data</div>
              ) : (
                hotelList.map((hotel, id) => (
                  <div
                    key={id}
                    className="flex flex-col sm:flex-row border-2 border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="p-3 sm:w-1/3 flex justify-center sm:justify-start">
                      <div className="w-full sm:w-44 md:w-48 lg:w-52 xl:w-100 h-48 sm:h-60 object-cover rounded-md">
                        {hotelImages[hotel.hotelId] && hotelImages[hotel.hotelId].length > 0 ? (
                        <ImageSlider sliders={hotelImages[hotel.hotelId]} className="w-full sm:w-44 md:w-48 lg:w-52 xl:w-100 h-48 sm:h-60 object-cover rounded-md"/>
                      ) : (
                        <div className="flex justify-center items-center h-full text-[#4b2e1f]/70">
                          Chưa có hình ảnh
                        </div>
                      )}
                      </div>
                    </div>
                    <div className="p-4 sm:px-5 flex-1">
                      <div className="text-xl sm:text-xl mb-2 flex justify-between">
                        <span className="font-bold text-blue-700">{hotel.hotelName}</span>
                        <span className="space-x-1">
                          <PhoneIcon className="text-blue-500 inline"/>
                          <span>Liên hệ:</span>
                          <span>{hotel.hotelPhone}</span>
                        </span>
                      </div>
                      <p className="mb-1 flex items-center space-x-1">
                        <StarIcon className = "text-yellow-400 fill-yellow-400"/>
                        <span className="text-sm text-gray-600 font-bold">
                          {hotel.hotelRating ? hotel.hotelRating?.toFixed(1) : 0}
                        </span>
                        <span className="text-sm"> / 5</span>
                      </p>
                      <p className="mb-2 text-sm sm:text-base space-x-1">
                        <MapPinIcon className="text-red-500 inline" />
                        <span> <span className="font-bold">Địa chỉ:</span> <span>{hotel.hotelAddress}</span></span>
                      </p>
                      <div className="mb-2 flex flex-wrap gap-2">
                        <span className="border border-gray-200 text-xs sm:text-sm font-semibold px-2 py-1 rounded">
                          Miễn phí wifi
                        </span>
                        <span className="border border-gray-200 text-xs sm:text-sm font-semibold px-2 py-1 rounded">
                          Đỗ xe miễn phí
                        </span>
                      </div>
                      <div className="relative">
                        <p
                          className={`text-sm text-gray-700 transition-all duration-300 ${
                            expandedIndex === id
                              ? "max-h-full"
                              : "max-h-10 overflow-hidden"
                          }`}
                        >
                          {hotel.hotelDescription}
                        </p>
                        {hotel.hotelDescription?.length > 120 && (
                          <button
                            onClick={() =>
                              setExpandedIndex(expandedIndex === id ? null : id)
                            }
                            className="text-blue-500 mt-1 text-sm hover:underline"
                          >
                            {expandedIndex === id ? <>Ẩn bớt</> : <>Xem thêm</>}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="p-4 sm:border-l border-t sm:border-t-0 border-gray-200 sm:w-[250px]">
                      <div className="mb-6 text-right">
                        <p className="text-gray-700 text-sm sm:text-base">
                          Tổng Số lượng phòng
                          <span className="ml-1 font-semibold">
                            {hotel.hotelTotalRoom}
                          </span>
                        </p>
                      </div>
                      <p className="font-semibold text-sm sm:text-base text-right">
                        Giá trung bình mỗi đêm
                      </p>
                      <p className="text-emerald-600 text-xl sm:text-2xl font-bold text-right">
                        {hotel.hotelCost}đ/đêm
                      </p>
                      <button className="bg-blue-500 w-full mt-9 py-2 rounded-lg hover:bg-blue-400 transition">
                        <Link to={`/detailshotel/${hotel.hotelId}`}>
                          <p className="text-white text-sm sm:text-base">
                            Xem phòng trống
                          </p>
                        </Link>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 flex-wrap gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === 1
                  ? "text-gray-400 border-gray-300"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
            >
              Trước
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white border-blue-500"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-300"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
            >
              Sau
            </button>
          </div>
        )}
      </div>
    </>
  );
}

