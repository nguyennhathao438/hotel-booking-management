import { useEffect, useState } from "react";
import api from "../../api";
import ImageSlider from "../DetailsHotel/ImageSlider";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Phone } from "lucide-react";
import { Link, useParams } from "react-router-dom";
export default function HotelProvince() {
    let hotelProvince = []
    const [hotels, setHotels] = useState([])
    const [images, setImages] = useState([])
    const { province } = useParams();
    console.log("tinh tren link api la luc sau la", province)



    useEffect(() => {
        const fetchAllHotel = async () => {
            const respone = await api.get("/hotels/all")
            setHotels(respone.data.result)
        }
        fetchAllHotel()
    }, [])

    useEffect(() => {
        const fetchAllImgHotel = async () => {
            const respone = await api.get("/images/all")
            setImages(respone.data.result)
        }
        fetchAllImgHotel()
    }, [])

    const findHotelByProvince = () => {
        let proviceTemp = ""
        if (hotels.length >= 0 && hotels) {
            for (let hotel of hotels) {
                proviceTemp = (hotel.hotelAddress).split(",")[2].trim()
                if (proviceTemp === province)
                    hotelProvince.push(hotel)
            }
        }
    }
    findHotelByProvince();

    return (
        <div className="h-auto">
            <div className="w-[85%] border border-gray-300 rounded-xl mx-auto">
                <div className="px-5 py-3">
                    <span className="font-bold text-xl">Tìm thấy {hotelProvince.length} chỗ nghỉ ở {province}</span>
                </div>
                <div className="grid grid-cols-1 gap-4 md:gap-6 p-2">
                    {hotelProvince.map((item) => {
                        const hotelImages = images.filter((img) => img.hotel.hotelId === item.hotelId);
                        return (<div key={item.hotelId} className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
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

                            {/* Thông tin khách sạn */}
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
                                            <span className="font-semibold text-gray-800">Địa chỉ:</span>{" "}
                                            {item.hotelAddress}
                                        </p>
                                    </div>

                                    {/* Mô tả */}
                                    <p className="text-gray-600 text-sm md:text-base mb-2 line-clamp-2">
                                        {item.hotelDescription}
                                    </p>

                                    {/* Số phòng & đánh giá */}
                                    <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-700">
                                        <span>
                                            <strong>⭐ {item.hotelRating}</strong> / 5
                                        </span>
                                        <span>|</span>
                                        <span>{item.hotelTotalRoom} phòng</span>
                                    </div>
                                </div>

                                {/* Giá & nút đặt */}
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
                        </div>)
                    })}
                </div>

            </div>
        </div>
    );
}