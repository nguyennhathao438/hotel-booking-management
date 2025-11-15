import { useContext, useEffect, useState } from "react";
import api from "../../api";
import ImageSlider from "../Common/ImageSlider";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Phone } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Context } from "../RoomContext";
export default function HotelProvince() {
    const [images, setImages] = useState([])
    const { province } = useParams();
    const location = useLocation();
    const hotelProvince = location.state?.hotelProvince;
    const { checkInDate, checkOutDate } = useContext(Context)

    useEffect(() => {
        const fetchAllImgHotel = async () => {
            const respone = await api.get("/images/all")
            setImages(respone.data.result)
        }
        fetchAllImgHotel()
    }, [])

    return (
        <div className="h-auto ">
            <div className="w-[90%] border border-gray-300 rounded-xl mx-auto">
                <div className="px-5 py-3">
                    <span className="font-bold text-center block py-2 text-xl">Tìm thấy {hotelProvince.length} chỗ nghỉ ở {province}</span>
                    <span className="font-light text-center py-2 block text-md">Click nút bên dưới để tìm phòng trống từ {checkInDate.toLocaleDateString()} đến {checkOutDate.toLocaleDateString()}</span>

                </div>
                <div className="flex gap-5">
                    {/* SIDEBAR BÊN TRÁI */}
                    <div className="hidden md:block md:w-1/4">
                        {/* Lọc theo sao */}
                        <div className="border border-gray-300 rounded-xl p-4 mb-5">
                            <h3 className="font-bold text-lg mb-3">Lọc theo sao</h3>
                            <div className="space-y-2 text-gray-700">
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <div key={star} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            value={star}
                                            // onChange={(e) => handleFilterStar(e)}
                                            className="w-4 h-4"
                                        />
                                        <span>{star} ⭐</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* DANH SÁCH KHÁCH SẠN BÊN PHẢI */}
                    <div className="w-full md:w-3/4">
                        <div className="grid grid-cols-1 gap-4 md:gap-6 p-2">
                            {hotelProvince.map((item) => {
                                const hotelImages = images.filter(
                                    (img) => img.hotel.hotelId === item.hotelId
                                );

                                return (
                                    <div
                                        key={item.hotelId}
                                        className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                                    >
                                        {/* Ảnh khách sạn */}
                                        <div className="md:w-1/3 h-48 md:h-auto">
                                            {hotelImages && hotelImages.length > 0 ? (
                                                <ImageSlider sliders={hotelImages} />
                                            ) : (
                                                <div className="flex justify-center items-center h-full text-[#4b2e1f]/70">
                                                    Chưa có hình ảnh
                                                </div>
                                            )}
                                        </div>

                                        {/* Thông tin */}
                                        <div className="flex-1 flex flex-col justify-between p-4">
                                            <div>
                                                {/* Tên khách sạn */}
                                                <div className="flex">
                                                    <div className="shrink-0">
                                                        <Link to={`/detailshotel/${item.hotelId}`}>
                                                            <h2 className="text-2xl font-bold text-blue-600 mb-1">
                                                                {item.hotelName}
                                                            </h2>
                                                        </Link>
                                                    </div>
                                                    <div className="flex justify-end w-full items-center">
                                                        <Phone className="text-blue-500 mx-2" />
                                                        <span>Liên hệ : {item.hotelPhone}</span>
                                                    </div>
                                                </div>

                                                {/* Địa chỉ */}
                                                <div className="flex items-start gap-2 mb-2">
                                                    <FaMapMarkerAlt className="text-red-500 mt-1" />
                                                    <p className="text-gray-700">
                                                        <span className="font-semibold text-gray-800">
                                                            Địa chỉ:
                                                        </span>{" "}
                                                        {item.hotelAddress}
                                                    </p>
                                                </div>

                                                {/* Mô tả */}
                                                <p className="text-gray-600 text-sm md:text-base mb-2 line-clamp-2">
                                                    {item.hotelDescription}
                                                </p>

                                                {/* Rating + số phòng */}
                                                <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-700">
                                                    <span>
                                                        <strong>⭐ {item.hotelRating.toFixed(1)}</strong> / 5
                                                    </span>
                                                    <span>|</span>
                                                    <span>{item.hotelTotalRoom} phòng</span>
                                                </div>
                                            </div>

                                            {/* Giá & nút */}
                                            <div className="flex justify-between items-center mt-4">
                                                <div>
                                                    <span className="text-gray-600 text-sm">Giá từ</span>
                                                    <p className="text-lg md:text-xl font-semibold text-green-600">
                                                        {item.hotelCost.toLocaleString("vi-VN")}₫ / đêm
                                                    </p>
                                                </div>
                                                <Link to={`/detailshotel/${item.hotelId}`}>
                                                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-xl transition">
                                                        Xem phòng trống
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}