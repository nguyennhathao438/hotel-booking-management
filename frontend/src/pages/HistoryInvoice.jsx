import { useEffect, useState } from "react";
import api from "../api";
import ModelForm from "../components/Common/FormModel";
import { Star } from "lucide-react";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
const reviewSchema = z.object({
    feedback: z
        .string()
        .min(10, "Nhận xét phải có ít nhất 10 ký tự")
        .max(500, "Nhận xét không quá 500 ký tự"),
    invoiceId: z.string().nonempty("Thiếu thông tin hóa đơn"),
    userId: z.string().nonempty("Thiếu thông tin người dùng"),
    hotelId: z.string().nonempty("Thiếu thông tin khách sạn"),
});
export default function HistoryInvoice() {
    const [user, setUser] = useState([])
    const fetchUserLogin = async () => {
        try {
            const response = await api.get("/users/myInfo")
            setUser(response.data.result)
        } catch (error) {
            console.error("Error when load data :", error);
        }
    }
    useEffect(() => {
        fetchUserLogin();
    }, [])

    const [invoices, setInvoices] = useState([])
    const fetchInvoiceByUserId = async (userId) => {
        try {
            const response = await api.get(`/invoice/user/${userId}`)
            setInvoices(response.data.result)
        } catch (error) {
            console.error("Error when load data :", error);
        }
    }
    console.log("user", user.id)
    useEffect(() => {
        if (user.id != null)
            fetchInvoiceByUserId(user.id);
    }, [user.id])
    console.log("invoice", invoices)
    const [status, setStatus] = useState("Tất cả");
    const [rating, setRating] = useState(0);
    const [hotelSelect, setHotelSelect] = useState();
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    const [openReview, setOpenReview] = useState(false)
    const [invoiceSelect, setInvoiceSelect] = useState()
    const { register, handleSubmit, reset, setValue } = useForm({
        resolver: zodResolver(reviewSchema),
    })
    useEffect(() => {
        if (user?.id) setValue("userId", String(user.id));
    }, [user, setValue]);

    useEffect(() => {
        if (hotelSelect) setValue("hotelId", String(hotelSelect));
    }, [hotelSelect, setValue]);

    useEffect(() => {
        if (invoiceSelect) setValue("invoiceId", String(invoiceSelect));
    }, [invoiceSelect, setValue]);

    console.log("selectedFeedback", selectedFeedback)
    if (selectedFeedback)
        console.log("selectedFeedback ID", selectedFeedback.id)
    const onSubmit = async (data) => {
        console.log("data ne", data)
        console.log("selectedFeedback", selectedFeedback)
        console.log("selectedFeedback ID", selectedFeedback.id)
        if (!selectedFeedback) {
            console.log("hoang anh huyhu huy")

            if (rating < 1) {
                toast.error("Bạn phải chọn ít nhất 1 sao")
                return
            }
            console.log("dmmmmmm", data)
            const review = {
                ...data,
                star: Number(rating) || 0,
            }
            console.log("review", review)
            const response = await api.post("/review/create", review)
            if (response.data.code == 1) {
                toast.success(response.data.message)
                fetchFeddBack()
                setOpenReview(false)
            } else {
                toast.error(response.data.message)
            }
        } else {
            console.log("hoang anh huyhu huy")
            if (rating < 1) {
                toast.error("Bạn phải chọn ít nhất 1 sao")
                return
            }
            console.log("dmmmmmm", data)
            const review = {
                ...data,
                star: Number(rating) || 0,
            }
            console.log("review", review)
            const response = await api.put(`/review/update/${selectedFeedback.id}`, review)
            if (response.data.code == 1) {
                toast.success(response.data.message)
                fetchFeddBack()
                setOpenReview(false)
            } else {
                toast.error(response.data.message)
            }
        }
    }
    const onError = (err) => {
        const firstErr = Object.values(err)[0]
        if (firstErr)
            toast.error(firstErr.message)
    }
    useEffect(() => {
        reset({
            feedback: "",
            star: 0,
        });
        setRating(0);
    }, [hotelSelect, invoiceSelect, reset]);
    const [feedbacks, setFeedBacks] = useState([])
    const fetchFeddBack = async () => {
        const response = await api.get("/review/all")
        console.log("tat ca feddback", response.data.result)
        setFeedBacks(response.data.result)
    }
    useEffect(() => {
        fetchFeddBack();
    }, [])
    return (
        <div className="w-[100%] h-auto">
            <div className="w-[90%] border border-gray-300 rounded-xl mx-auto h-full">
                <div className="flex gap-3 justify-center p-3">
                    <button className="bg-yellow-200 px-4 py-2 rounded-md cursor-pointer" onClick={() => setStatus("Tất cả")}>Tất cả</button>
                    <button className="bg-yellow-200 px-4 py-2 rounded-md cursor-pointer" onClick={() => setStatus("Chờ xác nhận")}>Chờ xác nhận</button>
                    <button className="bg-blue-200 px-4 py-2 rounded-md cursor-pointer" onClick={() => setStatus("Đang xác nhận")}>Đang xác nhận</button>
                    <button className="bg-blue-500 px-4 py-2 rounded-md cursor-pointer" onClick={() => setStatus("Đã xác nhận")}>Đã xác nhận</button>
                    <button className="bg-green-400 px-4 py-2 rounded-md cursor-pointer" onClick={() => setStatus("Đã hủy")}>Hoàn thành</button>
                </div>
                <table className="w-full p-2 ">
                    <thead>
                        <tr>
                            <th className="p-2 border border-gray-300">Tên khách sạn</th>
                            <th className="p-2 border border-gray-300">Tên phòng</th>
                            <th className="p-2 border-gray-300 border">Ngày nhận</th>
                            <th className="p-2 border border-gray-300">Ngày trả</th>
                            <th className="p-2 border border-gray-300">Tổng tiền</th>
                            <th className="p-2 border border-gray-300">Trạng thái</th>
                            <th className="p-2 border border-gray-300">Thực hiện</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                        {invoices.map((i, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors duration-200 text-center">
                                <td className="px-4 py-3 font-medium text-gray-900">{i.room.hotel.hotelName}</td>
                                <td className="px-4 py-3">{i.room.roomName}</td>
                                <td className="px-4 py-3">{i.checkInDate}</td>
                                <td className="px-4 py-3">{i.checkOutDate}</td>
                                <td className="px-4 py-3 font-semibold text-green-600">{i.totalAmount.toLocaleString()}₫</td>
                                <td className="px-4 py-3">
                                    {i.status === 0 ? (
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                                            Chờ xác nhận
                                        </span>
                                    ) : i.status === 1 ? (
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                                            Đang xác nhận
                                        </span>
                                    ) : i.status === 2 ? (
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                                            Đã xác nhận
                                        </span>
                                    ) : i.status === 3 ? (
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                                            Đã hủy
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                                            Không xác định
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-3 justify-center">
                                        <button className="text-indigo-600 bg-blue-200 p-2 rounded-md cursor-pointer hover:text-indigo-800 font-medium">
                                            Xem chi tiết
                                        </button>
                                        {i.status === 0 ? (
                                            feedbacks.some(fb => fb.invoice.id === i.id) ? (
                                                <button
                                                    className="text-white px-2 cursor-pointer bg-green-400 rounded-md hover:text-indigo-800 font-medium"
                                                    onClick={() => {
                                                        const fb = feedbacks.find(f => f.invoice.id === i.id);
                                                        if (fb) {
                                                            setSelectedFeedback(fb);
                                                            setRating(fb.star);
                                                            reset({
                                                                feedback: fb.feedback,
                                                                invoiceId: String(fb.invoice.id),
                                                                userId: String(fb.user.id),
                                                                hotelId: String(fb.hotel.id),
                                                            });
                                                            setOpenReview(true);
                                                        }
                                                    }}
                                                >
                                                    Đã đánh giá
                                                </button>
                                            ) : (
                                                <button
                                                    className="text-indigo-600 cursor-pointer bg-blue-200 p-2 rounded-md hover:text-white font-medium"
                                                    onClick={() => {
                                                        setOpenReview(true);
                                                        setHotelSelect(i.room.hotel.hotelId);
                                                        setInvoiceSelect(i.id);
                                                        setSelectedFeedback(null)
                                                    }}
                                                >
                                                    Đánh giá
                                                </button>
                                            )
                                        ) : (
                                            <button
                                                disabled
                                                className="text-gray-400 bg-gray-100 p-2 rounded-md cursor-not-allowed"
                                            >
                                                Đánh giá
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {
                openReview && (
                    <ModelForm title="ĐÁNH GIÁ KHÁCH SẠN" width="500px" onClose={() => setOpenReview(false)}>
                        <form className="w-[500px] h-auto space-y-5" onSubmit={handleSubmit(onSubmit, onError)}>
                            {/* Đánh giá sao */}
                            <div className="flex justify-center space-x-2">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <Star
                                        key={value}
                                        onClick={() => setRating(value)}
                                        className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${rating >= value
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Ô nhập nội dung */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Nhận xét của bạn
                                </label>
                                <textarea
                                    {...register("feedback", { required: true })}
                                    rows="4"
                                    placeholder="Hãy chia sẻ cảm nhận của bạn..."
                                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                                ></textarea>
                            </div>
                            <input type="hidden" {...register("invoiceId")} />
                            <input type="hidden" {...register("userId")} />
                            <input type="hidden" {...register("hotelId")} />

                            {/* Nút gửi */}
                            {!selectedFeedback && (
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white cursor-pointer font-semibold px-6 py-2 rounded-xl hover:bg-blue-700 transition-all duration-200"
                                    >
                                        Gửi đánh giá
                                    </button>
                                </div>
                            )}
                            {selectedFeedback && (
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white cursor-pointer font-semibold px-6 py-2 rounded-xl hover:bg-blue-700 transition-all duration-200"
                                    >
                                        Sửa đánh giá
                                    </button>
                                </div>
                            )}
                        </form>
                    </ModelForm>
                )
            }
        </div>
    );
}