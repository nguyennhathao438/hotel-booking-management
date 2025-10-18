import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Context } from "../RoomContext";
import api from "../../api";
import monney from "../../assets/img/monney.png"
import ImageSlider from "../DetailsHotel/ImageSlider";
import { FaLock } from "react-icons/fa";
export default function ConfirmBooking() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const hotelId = searchParams.get("hotelId");
    const payment = searchParams.get("payment")
    console.log("payment", payment)
    const location = useLocation();
    const invoice = location.state?.invoice;
    const urlVnpay = location.state?.urlVnpay;
    console.log("paymentUrl", urlVnpay)
    console.log("thong tin booking", invoice)
    const { roomId } = useParams();
    const [images, setImages] = useState([]);
    const [room, setRoom] = useState([]);
    const [hotel, setHotel] = useState([])
    const { checkInDate } = useContext(Context)
    console.log(checkInDate.getDate())
    const { checkOutDate } = useContext(Context)
    console.log(checkOutDate.toLocaleDateString())

    const handleSubmit = async (e, roomId) => {
        e.preventDefault();
        const respone = await api.post(`/invoice/room/${roomId}/create`, invoice) // eslint-disable-line no-unused-vars
        navigate("/success-booking")
    }
    useEffect(() => {
        if (payment == 3 && urlVnpay) {
            window.location.href = urlVnpay;
        }
    }, [payment, urlVnpay]);

    useEffect(() => {
        const fetchHotelById = async () => {
            try {
                const request = await api.get(`/hotels/${hotelId}`)
                setHotel(request.data.result)
            } catch (error) {
                console.error("Error when load data :", error);
            }
        }
        fetchHotelById()
    }, [])

    useEffect(() => {
        const fetchAllHotel = async () => {
            try {
                const request = await api.get(`/rooms/${roomId}`)
                setRoom(request.data.result)
            } catch (error) {
                console.error("Error when load data :", error);
            }
        }
        fetchAllHotel()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const imageData = await api.get(`/images/hotel/${hotelId}`);
                setImages(imageData.data.result);
            } catch (error) {
                console.error("Error when load data :", error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (payment === 3 && urlVnpay) {
            window.location.href = urlVnpay;
        }
    }, [payment, urlVnpay]);
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
                        <span className="w-full block p-2 text-md font-bold">Tổng thời gian lưu trú : {checkOutDate.getDate() - checkInDate.getDate()} đêm </span>
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
                            className="w-fit mx-auto bg-gradient-to-r from-blue-50 to-blue-100 
                                    border border-blue-200 rounded-2xl px-5 py-2 shadow-md hover:shadow-lg 
                                    transition-all duration-300 
                                    hover:scale-[1.02] hover:from-blue-100 hover:to-blue-200">
                            <span className="block px-2 py-1 text-gray-800">
                                Giá phòng 1 đêm: <span className="text-blue-700 font-medium">{Number(room.roomPrice).toLocaleString("vi-VN")} VNĐ</span>
                            </span>
                            <span className="block px-2 py-1 text-gray-700">
                                Tổng số đêm: <span className="font-medium text-blue-700">
                                    {checkOutDate.getDate() - checkInDate.getDate()} đêm
                                </span>
                            </span>
                        </div>
                        <div
                            className="flex justify-between items-center border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl px-3 py-1 mt-3 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]">
                            <span className="font-bold text-gray-800 text-lg">Tổng tiền:</span>
                            <span className="font-semibold text-blue-700 text-md">
                                {Number(room.roomPrice * (checkOutDate.getDate() - checkInDate.getDate())).toLocaleString("vi-VN")} VNĐ
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-[75%] border border-gray-300 rounded-2xl p-2 mx-4">
                    <div className="border border-gray-300 m-2 rounded-2xl">
                        {
                            payment == 1 &&
                            (<div className="flex flex-col md:flex-row lg:flex-row">
                                <div className="flex-3">
                                    <span className="block text-xl font-bold px-3 py-2">Thanh toán tại khách sạn</span>
                                    <span className="px-3 py-2 text-md block">Bạn sẽ thanh toán trực tiếp cho <span className="font-bold">{hotel.hotelName}</span> khi nhận phòng. Không cần nhập thông tin thanh toán trực tuyến cho đơn đặt này.</span>
                                </div>
                                <div className="flex-1 h-full">
                                    <img className="p-2 object-cover" src={monney} alt="" />
                                </div>
                            </div>
                            )
                        }
                    </div>
                    <div className="flex justify-end mt-4">
                        <button onClick={(e) => handleSubmit(e, roomId)} type="submit" className="flex items-center gap-2 cursor-pointer px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-md transition-all duration-300">
                            <FaLock className="text-white text-xl" />
                            Hoàn tất đặt chỗ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}