import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import api from "../api";

export default function ServiceManager() {
    const [myServices, setMyServices] = useState([]);
    const {hotelId} = useParams()
    const fetchServicesByHotelId = async (hotelId) => {
            const response = await api.get(`/service/hotel/${hotelId}`)
            setMyServices(response.data.result)
        }
    useEffect(()=>{
        fetchServicesByHotelId(hotelId)
    },[hotelId])
    const addService = async (sv) => {
        try {
            const dataService = {
                ...sv,
                hotelID: hotelId
            }
            await api.post("/service/create",dataService)
            fetchServicesByHotelId(hotelId)
        } catch (error) {
            toast.error("Dịch vụ đã tồn tại")
            console.log("Không thể thêm dịch vụ",error)
        }
    }
    const services = [
        {
            serviceName: "Dọn phòng hằng ngày",
            description: "Giữ phòng của bạn luôn sạch sẽ và gọn gàng mỗi ngày.",
            icon: "https://cdn-icons-png.flaticon.com/128/5443/5443535.png",
            price: 150000,
        },
        {
            serviceName: "Giặt ủi quần áo",
            description: "Giặt, sấy và ủi chuyên nghiệp cho khách lưu trú.",
            icon: "https://cdn-icons-png.flaticon.com/128/2990/2990631.png",
            price: 80000,
        },
        {
            serviceName: "Đưa đón sân bay",
            description: "Xe đưa đón tận nơi, an toàn và đúng giờ.",
            icon: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
            price: 250000,
        },
        {
            serviceName: "Buffet sáng",
            description: "Thưởng thức bữa sáng đa dạng với món Á - Âu mỗi ngày.",
            icon: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
            price: 180000,
        },
        {
            serviceName: "Thuê xe máy",
            description: "Thuê xe máy tiện lợi để khám phá thành phố.",
            icon: "https://cdn-icons-png.flaticon.com/128/7053/7053332.png",
            price: 200000,
        },
        {
            serviceName: "Giao đồ ăn tận phòng",
            description: "Đặt món ăn yêu thích và nhận ngay tại phòng.",
            icon: "https://cdn-icons-png.flaticon.com/512/562/562678.png",
            price: 50000,
        },
        {
            serviceName: "Giữ hành lý",
            description: "Gửi hành lý an toàn trước khi nhận hoặc sau khi trả phòng.",
            icon: "https://cdn-icons-png.flaticon.com/512/2331/2331970.png",
            price: 0,
        },
        {
            serviceName: "Wi-Fi tốc độ cao",
            description: "Kết nối internet nhanh và ổn định trong toàn bộ khu vực khách sạn.",
            icon: "https://cdn-icons-png.flaticon.com/128/17902/17902763.png",
            price: 0,
        },
    ];

    return (
        <div className="w-[1700px] items-center justify-center min-h-screen bg-gray-100 ml-[300px]">
            <div className=" bg-white shadow-md rounded-xl p-6">
                <h2 className="px-2 py-4 font-medium text-center text-3xl">QUẢN LÝ DỊCH VỤ</h2>

                {/* DỊCH VỤ CỦA BẠN */}
                <div>
                    <h2 className="text-center py-2 text-xl font-medium text-gray-700">DỊCH VỤ CỦA BẠN</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                        {myServices.length === 0 ? (
                            <p className="text-center text-gray-500 col-span-3">
                                Bạn chưa có dịch vụ nào.
                            </p>
                        ) : (
                            myServices.map((service) => (
                                <div key={service.serviceId} className="bg-green-50 border-green-300 shadow-sm rounded-2xl p-4">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <img src={service.icon} alt={service.serviceName} className="w-10 h-10" />
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {service.serviceName}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 text-sm">{service.description}</p>
                                    <p className="text-green-700 font-semibold mt-1">
                                        Giá: {service.price.toLocaleString()} VNĐ
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* DANH SÁCH DỊCH VỤ KHÁCH SẠN */}
                <div className="p-6 bg-gray-100 mt-6 rounded-xl">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">🌟 Danh sách dịch vụ khách sạn 🌟</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div key={service.serviceId} className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition duration-300 flex flex-col justify-between ">
                                <div>
                                    <div className="flex items-center space-x-3 mb-3">
                                        <img src={service.icon} alt={service.serviceName} className="w-10 h-10" />
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {service.serviceName}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 mb-3 line-clamp-3">{service.description}</p>
                                    <p className="text-green-600 font-semibold mb-4">
                                        Giá: {service.price.toLocaleString()} VNĐ
                                    </p>
                                </div>

                                {/* Nút thêm */}
                                <button onClick={() => {addService(service)}} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md w-full mt-auto">
                                    THÊM
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
