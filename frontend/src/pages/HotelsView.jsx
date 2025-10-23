import { Star, StarHalf, StarOff } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api";

export default function HotelsView() {
    const [hotelList,setHotelList] = useState([]); 
    const [selectedRating, setSelectedRating] = useState(null);
    const [price, setPrice] = useState([0, 10000000]);
    const [active, setActive] = useState("top"); // Mặc định nút đầu tiên
    const [expandedIndex, setExpandedIndex] = useState(null);
    const getHotels = async () => {
    try {
        const res = await api.get("hotels/all");
        const hotels = res.data.result
        console.log("dữ liệu hotel",res.data.result);
        setHotelList(hotels);
    } catch (err){
        console.error("Lỗi khi lấy danh sách người dùng:", err);
        }
    }
    const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating); // số sao đầy
    const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75; // sao nửa
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // sao trống

    for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={`full-${i}`} className="text-yellow-400 fill-yellow-400" size={18} />);
    }
    if (hasHalfStar) {
        stars.push(<StarHalf key="half" className="text-yellow-400 fill-yellow-400" size={18} />);
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<StarOff key={`empty-${i}`} className="text-gray-300" size={18} />);
    }

    return stars;
    };

    useEffect(() => {
        getHotels();
    }, [])
    const buttons = [
    { id: "top", label: "Lựa chọn hàng đầu của chúng tôi" },
    { id: "low", label: "Giá thấp trước" },
    { id: "best", label: "Được đánh giá tốt nhất" },
    ];
    const handleRatingChange = (rating) => {
    setSelectedRating(rating === selectedRating ? null : rating);
    };
    return(
    <>
<div className="max-w-full p-6 bg-white shadow-md rounded-lg">
    <div className="mt-[90px] p-6 flex gap-6 ml-30">
        {/* Cột trái: Bộ lọc */}
        <div className="border border-gray-200 p-5 rounded w-[250px] h-max">
        {/* Đánh giá sao */}
            <div className="mb-6">
                <h2 className="font-semibold mb-2">Đánh giá sao</h2>
                {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center space-x-2 mb-1">
                    <input
                    type="checkbox"
                    checked={selectedRating === rating}
                    onChange={() => handleRatingChange(rating)}
                    className="cursor-pointer"
                    />
                    <span>{rating} sao</span>
                </label>
                ))}
            </div>
      {/* Giá mỗi đêm */}
            <div>
                <h2 className="font-semibold mb-2">Giá mỗi đêm</h2>
                <input
                type="range"
                min="0"
                max="10000000"
                value={price[1]}
                onChange={(e) => setPrice([0, parseInt(e.target.value)])}
                className="w-full"
                />
                <div className="flex justify-between mt-2 space-x-2">
                <div>
                    <p className="text-sm text-gray-600">TỐI THIỂU</p>
                    <input
                    type="number"
                    value={price[0]}
                    readOnly
                    className="w-20 border rounded text-right"
                    />
                </div>
                <div>
                    <p className="text-sm text-gray-600">TỐI ĐA</p>
                    <input
                    type="number"
                    value={price[1]}
                    onChange={(e) =>
                        setPrice([0, parseInt(e.target.value) || 0])
                    }
                    className="w-28 border rounded text-right"
                    />
                </div>
                </div>
            </div>
        </div>

        {/* Cột phải: Nút lọc và danh sách */}
        <div className="flex-1">
        {/* Nút sắp xếp */}
        <div className="flex space-x-3 mb-4 text-black">
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
        </div>
        {/* Khu vực danh sách khách sạn */}
        <div className="space-y-5">
            {!hotelList ? (
                <div>No data</div>
            ) : hotelList.map((hotel,id) => (
                <div key={id} className="flex border-2 border-gray-200 max-w-10/12">
                <div className="p-3">
                    <img src="." className="w-60 h-60"></img>
                </div>
                <div className="p-3 px-5 max-w-2/5">
                    <p className="font-bold text-xl mb-2">{hotel.hotelName}</p>
                    <p className="mb-1 flex">{renderStars(hotel.hotelRating)}  <span className="text-sm text-gray-600 ml-1">{hotel.hotelRating.toFixed(1)}</span></p>
                    <p className="mb-2 text-blue-500">{hotel.hotelAddress}</p>
                    <div className="mb-2">
                        <span className="border-2 border-gray-200 font-semibold px-1 py-1 mr-1">Miễn phí wifi</span>
                        <span className="border-2 border-gray-200 font-semibold px-1 py-1">Đỗ xe miễn phí</span>
                    </div>
                    <div className="relative">
                        <p  className={`text-sm transition-all duration-300 ${
                            expandedIndex === id ? "max-h-full" : "max-h-[40px] overflow-hidden"
                            }`}>
                            {hotel.hotelDescription}
                        </p>
                        {hotel.hotelDescription?.length > 120 && (
                            <button
                            onClick={() => setExpandedIndex(expandedIndex === id ? null : id)}
                            className="text-blue-500 mt-2 flex items-center gap-1 hover:underline">
                            {expandedIndex === id ? (
                                <>Ẩn bớt</>
                            ) : (<>Xem thêm</>)}
                            </button>
                        )}
                    </div>
                </div>
                <div className="p-3 border-l-2 border-gray-200 w-[250px]">
                    <div className="mb-20 text-right">
                        <p>Trên cả tuyệt vời<span className="ml-2">7.8</span></p>
                        <p>Tổng Số lượng phòng<span className="ml-3">{hotel.hotelTotalRoom}</span></p>
                    </div>
                    <p className="font-semibold flex justify-end">Giá trung bình mỗi đêm</p>
                    <p className="text-red-500 text-2xl font-bold flex justify-end">{hotel.hotelCost} đ</p>
                    <button className="bg-blue-500 mx-auto ml-2 mt-5 min-w-52 min-h-12 rounded-lg hover:bg-blue-300">
                        <p className="text-white">Kiểm tra lượng phòng trống </p>
                    </button>
                </div>
            </div>
            ))}       
        </div>
        </div>
  </div>
</div>

    </>
    );
};