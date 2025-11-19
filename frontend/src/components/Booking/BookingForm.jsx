import { useContext, useEffect, useState } from "react";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import ImageSlider from "../Common/ImageSlider";
import api from "../../api";
import { Context } from "../RoomContext";
import vnpay from "../../assets/img/vnpay.png"
import thanhtoan from "../../assets/img/thanhToan.png"
import { Mail, Phone } from "lucide-react";
import NotificationModal from "../Common/Modal";
import Swal from "sweetalert2";
export default function FormBooking() {
    const [searchParams] = useSearchParams();
    const hotelId = searchParams.get("hotelId");
    const { roomId } = useParams();
    const [hotel, setHotel] = useState([])
    const [images, setImages] = useState([]);
    const [room, setRoom] = useState([]);
    const [user, setUser] = useState([]);
    const { checkInDate, checkOutDate } = useContext(Context)
    const [selected, setSelected] = useState(0);
    const [phone, setPhone] = useState("");
    const [errorPhone, setErrorPhone] = useState("");
    const navigate = useNavigate();
    const [urlVnpay, setUrlVnpay] = useState(null); // eslint-disable-line no-unused-vars
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState("warning");
    const night = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalAmount = room.roomPrice * night;
    // const [invoice, setInvoice] = useState(// eslint-disable-line no-unused-vars
    //     {
    //         checkInDate: " ",
    //         checkOutDate: " ",
    //         totalAmount: " ",
    //         payment: " ",
    //         roomId: " ",
    //         userId: " ",
    //     }
    // )


    console.log("ngay vao", checkInDate.getDate())
    console.log("ngay ra", checkOutDate.getDate())

    const payments = [
        {
            "id": 1,
            "title": "Thanh toán tại chỗ",
            "text": "Thanh toán bằng tiền mặt tại khách sạn",
            "icon": thanhtoan
        },
        {
            "id": 3,
            "title": "Thanh toán qua VNPay",
            "text": "Thanh toán an toàn qua VNPay",
            "icon": vnpay
        }
    ]

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };
    console.log("ngay vao", formatDate(checkInDate))
    console.log("ngay ra", formatDate(checkOutDate))



    const handleNext = async (e, roomId) => {
        e.preventDefault();
        if (!phone.trim()) {
            setErrorPhone("Vui lòng nhập số điện thoại");
            setModalMessage("Bạn chưa nhập số điện thoại!");
            setModalType("error");
            setShowModal(true);
            return;
        }

        if (!selected) {
            setModalMessage("Vui lòng chọn phương thức thanh toán trước khi tiếp tục!");
            setModalType("warning");
            setShowModal(true);
            return;
        }
        setErrorPhone("");
        const newInvoice = {
            checkInDate: formatDate(checkInDate),
            checkOutDate: formatDate(checkOutDate),
            payment: selected,
            totalAmount: totalAmount,
            status: 0,
            roomId: roomId,
            userId: user.id,
        };
        // setInvoice(newInvoice);
        const result = await Swal.fire({
            title: "Xác nhận đặt phòng này?",
            text: "Hành động này không thể hoàn tác!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xác nhận",
            cancelButtonText: "Hủy",
        });
        if (!result.isConfirmed) return;

        const response = await api.post(`/invoice/room/${roomId}/create`, newInvoice)
        // eslint-disable-line no-unused-vars
        localStorage.setItem("invoice", JSON.stringify(response.data.result));
        navigate("/history")
        // if (selected == 1) {
        //     navigate(`/confirm-booking/${roomId}?hotelId=${hotelId}&payment=${selected}`, {
        //         state: { invoice: newInvoice },
        //     });
        // } else if (selected == 3) {
        //     const response = await api.get(`/payment/vn-pay?amount=${totalAmount}`);
        //     const newVnpayUrl = response.data.result.paymentUrl;
        //     setUrlVnpay(newVnpayUrl);
        //     navigate(`/confirm-booking/${roomId}?hotelId=${hotelId}&payment=${selected}`, {
        //         state: { invoice: newInvoice, urlVnpay: newVnpayUrl },
        //     });
        // }
    };

    const fetchUserLogin = async () => {
        try {
            const userData = await api.get("/users/myInfo")
            setUser(userData.data.result)
        } catch (error) {
            console.error("Error when load data :", error);
        }
    }
    useEffect(() => {
        fetchUserLogin();
    }, [])
    console.log(user)

    const fetchHotelById = async () => {
        try {
            const request = await api.get(`/hotels/${hotelId}`)
            setHotel(request.data.result)
        } catch (error) {
            console.error("Error when load data :", error);
        }
    }
    useEffect(() => {
        fetchHotelById()
    }, [])

    const fetchRoomById = async () => {
        try {
            const request = await api.get(`/rooms/${roomId}`)
            setRoom(request.data.result)
        } catch (error) {
            console.error("Error when load data :", error);
        }
    }
    useEffect(() => {
        fetchRoomById()
    }, [])

    const fetchImgHotel = async () => {
        try {
            const imageData = await api.get(`/images/hotel/${hotelId}`);
            setImages(imageData.data.result);
        } catch (error) {
            console.error("Error when load data :", error);
        }
    };
    useEffect(() => {
        fetchImgHotel();
    }, []);

    return (
        <div className="h-auto bg-gray-200">
            <div className="w-[95%] mx-auto bg-white flex">
                <div className="w-[35%]">
                    <div className="w-full h-[60vh] bg-white border border-gray-400 border-opacity-30 rounded-2xl">
                        <div className="h-[70%]">
                            {images && images.length > 0 ? (<ImageSlider sliders={images} />) : <div className="flex h-full items-center">Chưa có hình ảnh</div>}
                        </div>
                        <div className="w-full h-[30%]">
                            <span className="font-bold block text-md px-2 py-1 font-serif">{hotel.hotelName}</span>
                            <span className="font-extralight block text-sm px-2 py-1">{hotel.hotelAddress}</span>
                            <span className="font-light text-sm rounded-sm px-2 py-1 m-2 inline-block border bg-blue-900 text-white">{hotel.hotelRating}</span>
                        </div>
                    </div>
                    <div className="w-full border border-gray-400 border-opacity-30 rounded-2xl h-auto p-2 mt-5">
                        <span className="font-bold text-xl font-sans p-2 block">Chi tiết đặt phòng</span>
                        <div className="flex flex-wrap">
                            <div className="flex-1">
                                <span className="text-md text-center font-bold block">Nhận phòng</span>
                                <span className="text-center block p-2">Ngày : {checkInDate.toLocaleDateString()} </span>
                            </div>
                            <div className="flex-1 border-l border-gray-400 border-opacity-30">
                                <span className="text-md text-center font-bold block">Trả phòng</span>
                                <span className="text-center block p-2">Ngày : {checkOutDate.toLocaleDateString()}</span>
                            </div>
                        </div>
                        <span className="w-full block p-2 text-md font-bold">Tổng thời gian lưu trú : {night} đêm </span>
                        <div className="border-t border-gray-400 border-opacity-30">
                            <span className="block px-2 py-1">Bạn đã chọn</span>
                            <span className="block px-2 py-1 font-bold">1 phòng cho {room.roomCapacity} người</span>
                            <span className="block px-2 py-1 font-bold">{room.bedRoomCount} phòng , {room.bedCount} giường ngủ</span>
                            <Link to={`/detailshotel/${hotelId}`}>
                                <span className="font-bold text-blue-500 block p-2">Đổi lựa chọn của bạn</span>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full border rounded-2xl p-2 mt-2 border-gray-400 border-opacity-30 h-auto">
                        <span className="block font-bold p-2 text-xl">Tóm tắt giá</span>
                        <div
                            className="w-fit mx-auto from-blue-50 to-blue-100 
                            border border-blue-200 rounded-2xl px-5 py-2 shadow-md hover:shadow-lg 
                            transition-all duration-300 
                            hover:scale-[1.02] hover:from-blue-100 hover:to-blue-200">
                            <span className="block px-2 py-1 text-gray-800">
                                Giá phòng 1 đêm: <span className="text-blue-700 font-medium">{Number(room.roomPrice).toLocaleString("vi-VN")} VNĐ</span>
                            </span>
                            <span className="block px-2 py-1 text-gray-700">
                                Tổng số đêm: <span className="font-medium text-blue-700">
                                    {night} đêm
                                </span>
                            </span>
                        </div>
                        <div
                            className="flex justify-between items-center border border-blue-200 from-blue-50 to-blue-100 rounded-2xl px-3 py-1 mt-3 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]">
                            <span className="font-bold text-gray-800 text-lg">Tổng tiền:</span>
                            <span className="font-semibold text-blue-700 text-md">
                                {Number(room.roomPrice * (night)).toLocaleString("vi-VN")} VNĐ
                            </span>
                        </div>
                    </div>
                </div>

                <div className="w-[65%] p-4 border border-gray-400 ml-2 rounded-2xl border-opacity-30">
                    <span className="block font-bold px-3 py-1 text-xl">Nhập thông tin chi tiết của bạn</span>
                    <span className="block font-light font-sans px-3 py-1 text-sm">Gần xong rồi ! Chỉ cần điền phần thông tin <span className="text-red-600">* </span>bắt buột</span>
                    <div className="flex flex-col md:flex-row lg:flex-row md:flex-wrap lg:flex-wrap">
                        <div className="m-4">
                            <span className="block">Họ :</span>
                            <input value={user.firstName} className="border px-3 py-1 w-[300px]" type="text" placeholder="Ví dụ : Nguyễn" />
                        </div>
                        <div className="m-4">
                            <span className="block">Tên :</span>
                            <input value={user.lastName} className="border px-3 py-1 w-[300px]" type="text" placeholder="Ví dụ : Tuấn" />
                        </div>
                        <div className="m-4">
                            <span className="flex items-center"><Mail className="inline mr-1" /> Địa chỉ email</span>
                            <input value={user.email} className="border px-3 py-1 w-[300px]" type="text" />
                        </div>
                        <div className="m-4">
                            <span className="flex items-center"><Phone className="inline mr-1" />Số điện thoại</span>
                            <input className="border px-3 py-1 w-[300px]"
                                type="number" placeholder="Nhập số điện thoại liên hệ"
                                value={phone} onChange={(e) => setPhone(e.target.value)} />
                            {/* Báo lỗi nếu chưa nhập */}
                            {errorPhone && (
                                <p className="text-red-500 text-sm mt-1 animate-pulse">
                                    {errorPhone}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-6 border-t border-gray-300 pt-4">
                        <span className="block font-semibold text-lg mb-2 px-3">
                            Phương thức thanh toán
                        </span>
                        <div className="flex flex-col px-3 border py-2 rounded-2xl border-gray-300">
                            {payments.map((item) => (
                                <label key={item.id}
                                    className={`flex items-center my-1 mx-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${selected === item.id
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-300 hover:border-blue-300"}`}>

                                    <input
                                        type="radio"
                                        name="payment"
                                        value={item.id}
                                        checked={selected === item.id}
                                        onChange={() => setSelected(item.id)}
                                        className="accent-blue-600 w-5 h-5 mr-3 cursor-pointer"
                                    />

                                    <div className="w-[10%] flex justify-center">
                                        <img
                                            className="w-8 h-8 object-cover"
                                            src={item.icon}
                                            alt={item.title}
                                        />
                                    </div>

                                    <div className="px-3">
                                        <span className="block font-medium text-gray-800">
                                            {item.title}
                                        </span>
                                        <span className="block text-sm text-gray-500">{item.text}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" onClick={(e) => handleNext(e, room.roomId)} className="font-bold text-xl p-2 m-2 rounded-md text-white bg-blue-500 cursor-pointer">Xác nhận đặt phòng</button>
                        </div>
                    </div>
                </div>
            </div>
            <NotificationModal
                show={showModal}
                type={modalType}
                message={modalMessage}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
}