import { BanIcon, CircleCheckIcon, CircleXIcon, ClipboardCheckIcon, EyeIcon, HandbagIcon, RotateCcwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api";

export default function BookingHistory(){
    const [orderListSearch,setOrderListSearch] = useState([]);
    const[statusFilter,setStatusFilter] = useState("");
    const[dateFrom,setDateFrom] = useState("");
    const[dateTo,setDateTo] = useState("");
    const [totalPages , setTotalPages] = useState(0);
    const [searchParams,setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("page")) || 1;
    const fetchOrderFilter = async (page = 1) => {
        try {
            setSearchParams({page});
            const resUser = await api.get("/users/myInfo");
            const userID = resUser.data.result.id;
            const res = await api.get(`/invoice/order/${userID}`, {
                params: {
                    pageNo:page,
                    pageSize: 5,
                    status: statusFilter || null,
                    dateFrom: dateFrom || null,
                    dateTo: dateTo || null,
                },
            });
            const data = res.data.result;
            console.log("dữ liệu order",data);
            setOrderListSearch(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Lỗi khi lấy lịch sử đơn hàng:", error);
        }
    };
    useEffect(() => {
        setSearchParams({page:1});   
    }, [statusFilter, dateFrom, dateTo]);
    useEffect(() => {
        fetchOrderFilter(currentPage);
    }, [currentPage , statusFilter,dateFrom,dateTo]);

    const getStatusText = (status) => {
            switch (status) {
                case 0: return "Chờ xác nhận";
                case 1: return "Đã xác nhận";
                case 2: return "Hoàn thành";
                case 3: return "Đã hủy";
                default: return "Không rõ";
            }
    };
    const getStatusColor = (status) => {
    switch (status) {
        case 0: // Chờ xác nhận
        return "bg-yellow-100 text-yellow-700";
        case 1: // Đã xác nhận
        return "bg-blue-100 text-blue-700";
        case 2: // Hoàn thành
        return "bg-green-100 text-green-700";
        case 3: // Đã hủy
        return "bg-red-100 text-red-700";
        default:
        return "bg-gray-100 text-gray-700";
            }
    };
    const getPaymentText = (payment) => {
        switch(payment) {
            case 1: return "Thanh toán trực tiếp";
            case 2: return "Chuyển khoản";
            case 3: return "Thẻ";
            default: return "";
        }
    };
    return(
    <>
        <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-gray-100 shadow-md">
            <div className="mt-[90px] bg-white rounded-lg p-4 sm:p-6">
                <div className="flex flex-row items-start sm:items-center gap-3 mb-5">
                <HandbagIcon className="w-10 h-10 rounded-full p-2 bg-yellow-100" />
                <div className="">
                    <h2 className="font-bold text-xl sm:text-2xl">Đặt phòng của tôi</h2>
                    <p className="text-gray-600 text-sm sm:text-base">Theo dõi đặt phòng và lịch khách sạn của bạn</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 p-2 sm:p-4">
                <button className="border-2 border-gray-300 rounded-md px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm sm:text-base">Tất cả</button>
                <button className="flex items-center gap-2 border-2 border-gray-300 rounded-md px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm sm:text-base">
                <RotateCcwIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <p>Chờ xác nhận</p>
                </button>
                <button className="flex items-center gap-2 border-2 border-gray-300 rounded-md px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm sm:text-base">
                <ClipboardCheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <p>Đã xác nhận</p>
                </button>
                <button className="flex items-center gap-2 border-2 border-gray-300 rounded-md px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm sm:text-base">
                <CircleCheckIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <p>Đã hoàn thành</p>
                </button>
                <button className="flex items-center gap-2 border-2 border-gray-300 rounded-md px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm sm:text-base">
                <BanIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <p>Đã hủy</p>
                </button>
            </div>

            <div className="p-3 sm:p-4 rounded-lg bg-neutral-100 overflow-x-auto">
                <table className="min-w-full text-sm sm:text-base border-collapse">
                <thead className="bg-neutral-200 text-gray-700">
                    <tr>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left">Khách sạn</th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left">Ngày đặt</th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left">Phòng</th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left">Ngày nhận/trả</th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left">Tổng tiền</th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left">Thanh toán</th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left">Trạng thái</th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left">Hành động</th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    {!orderListSearch ? (
                        <div>Không có dữ liệu</div>
                    ) : orderListSearch.map((order,id) => (
                        <tr key={id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors text-sm sm:text-base">
                            <td className="px-3 py-2 sm:px-4 sm:py-3 break-words">{order.room.hotel ? order.room.hotel.hotelName : "No Hotelname"}</td>
                            <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap">{order.createdAt ? order.createdAt.split("T")[0] : ""}</td>
                            <td className="px-3 py-2 sm:px-4 sm:py-3">{order.room?.roomName}</td>
                            <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap">
                                <p>{order.checkInDate}</p>
                                <p>{order.checkOutDate}</p>
                            </td>
                            <td className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap font-semibold">{order.totalAmount} ₫</td>
                            <td className="px-3 py-2 sm:px-4 sm:py-3">
                                <span className="inline-block bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-xs sm:text-sm">{getPaymentText(order.payment)}</span>
                            </td>
                             <td className={`px-3 py-2 sm:px-4 sm:py-3 rounded-md text-center sm:text-sm ${getStatusColor(order.status)}`}>
                                <span className="px-2 py-1 inline-block" >{getStatusText(order.status)}</span>
                            </td>
                            <td className="px-3 py-2 sm:px-4 sm:py-3 space-y-2 sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row items-center sm:justify-start">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md flex items-center gap-1 w-full sm:w-auto justify-center">
                                    <EyeIcon className="w-4 h-4" />
                                    <span className="text-xs sm:text-sm">Xem chi tiết</span>
                                </button>
                            </td>
                            <td>
                                {order.status === 0 && (
                                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-1 w-full sm:w-auto justify-center">
                                    <CircleXIcon className="w-4 h-4" />
                                    <span className="text-xs sm:text-sm">Hủy đơn</span>
                                </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
      </div>
        </>
    );
};