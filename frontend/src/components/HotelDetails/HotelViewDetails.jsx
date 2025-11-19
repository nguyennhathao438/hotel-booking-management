import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import banner2 from "../../assets/img/banner2.jpg";
import { FaMapMarkerAlt } from "react-icons/fa";
import BookingSearch from "../BookingSearch";
import SlidePanel from "../Common/SlidePanel";
import ImageSlider from "../Common/ImageSlider";
import { FaRegCommentDots, FaConciergeBell } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import api from "../../api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import ChatBox from "../Chatbox";
import { Context } from "../RoomContext";
import ModelForm from "../Common/FormModel";
function DetailsHotelView() {

    const scrollRef = useRef(null);
    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8; // mỗi lần trượt 80% chiều rộng
            scrollRef.current.scrollTo({
                left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };


    const user = useSelector((state) => state.user);
    const [rooms, setRooms] = useState([]);
    const [images, setImages] = useState([]);
    const { hotelId } = useParams();
    const { checkInDate, checkOutDate } = useContext(Context);
    //Chat
    const [openChat, setOpenChat] = useState(false);
    const [hotel, setHotel] = useState([]);
    const [feedbacks, setFeedBacks] = useState([])
    const [services, setServices] = useState([])
    const [openDetails, setOpenDetails] = useState(false)


    const fetchHotelServices = async () => {
        try {
            const response = await api.get(`/service/hotel/${hotelId}`)
            setServices(response.data.result)
        } catch (error) {
            console.log("Khong the lay dich vu khach san", error)
        }
    }

    const handleCloseChat = () => {
        setOpenChat(false);
    };

    const fetchHotelById = async () => {
        try {
            const response = await api.get(`/hotels/${hotelId}`)
            setHotel(response.data.result)
        } catch (error) {
            console.error("Error when load data :", error);
        }
    }

    const fetchFeedBackByHotelId = async () => {
        try {
            const response = await api.get(`review/hotel/${hotelId}`)
            setFeedBacks(response.data.result)
        } catch (error) {
            console.error("Error when load data :", error);
        }
    }

    const checkRoomStatus = async (roomId, checkInDate, checkOutDate) => {
        try {
            const response = await api.get("/rooms/check-room-status", {
                params: {
                    roomId,
                    checkInDate: formatDate(checkInDate),
                    checkOutDate: formatDate(checkOutDate),
                }
            });
            return response.data.result;
        } catch (error) {
            console.error("Lỗi khi kiểm tra trạng thái phòng:", error);
            return 0;
        }
    };


    const fetchRoomsByHotelId = async () => {
        try {
            const roomData = await api.get(`rooms/hotel/${hotelId}`);
            const roomsWithStatus = await Promise.all(
                roomData.data.result.map(async (room) => {
                    const roomStatus = await checkRoomStatus(room.roomId, checkInDate, checkOutDate);
                    return { ...room, roomStatus };
                })
            );
            setRooms(roomsWithStatus);
            const imageData = await api.get(`/images/hotel/${hotelId}`);
            setImages(imageData.data.result);
        } catch (error) {
            console.error("Lỗi khi load phòng:", error);
        }
    };

    const disableBooking = (status, room) => {
        if (status === 3 || status === 1)
            return (<button></button>)
        else
            return (<button onClick={() => handleBooking(room.roomId, room)}
                className=" bg-blue-400 text-white cursor-pointer font-semibold px-6 py-2 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
                Đặt phòng
            </button>)
    }
    const changeStatusRoom = (status, roomStatus) => {
        if (status === 3) {
            return <span className="text-md font-medium text-red-500">Đang bảo trì</span>;
        }
        if (status === 1) {
            return <span className="text-md font-medium text-red-500">Khách đang ở</span>;
        }
        if (status === 2) {
            if (roomStatus === 2) {
                return <span className="text-md font-medium text-orange-500">Đã đặt (trùng ngày)</span>;
            }
            return <span className="text-md font-medium text-green-600">Phòng còn trống</span>;
        }
        if (status === 0) {
            if (roomStatus === 2) {
                return <span className="text-md font-medium text-orange-500">Đã đặt (trùng ngày)</span>;
            }
            return <span className="text-md font-medium text-green-600">Phòng còn trống</span>;
        }
        return null;
    };


    // const checkRoomAvailable = async (roomId) => {
    //     try {
    //         const response = await api.get(`/invoice/check-room`, {
    //             params: {
    //                 checkInDate: formatDate(checkInDate),
    //                 checkOutDate: formatDate(checkOutDate),
    //                 roomId: roomId,
    //             },
    //         });
    //         return response.data.result;
    //     } catch (error) {
    //         console.error("Lỗi khi kiểm tra phòng:", error);
    //         return false;
    //     }
    // };

    // const fetchRoomsByHotelId = async () => {
    //     try {
    //         const roomData = await api.get(`rooms/hotel/${hotelId}`);
    //         const roomsWithStatus = await Promise.all(
    //             roomData.data.result.map(async (room) => {
    //                 const available = await checkRoomAvailable(room.roomId);
    //                 return { ...room, available }; // thêm thuộc tính available
    //             })
    //         );
    //         setRooms(roomsWithStatus);
    //         const imageData = await api.get(`/images/hotel/${hotelId}`);
    //         setImages(imageData.data.result);
    //     } catch (error) {
    //         console.error("Error when load data :", error);
    //     }
    // };

    useEffect(() => {
        fetchHotelById()
        fetchFeedBackByHotelId()
        fetchRoomsByHotelId()
        fetchHotelServices()
    }, [hotelId])

    console.log("danh sach room", rooms)

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? feedbacks.length - 1 : prev - 1
        );
    };
    console.log("danh sach phog", rooms)

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === feedbacks.length - 1 ? 0 : prev + 1
        );
    };

    const navigate = useNavigate();
    const isValidDate = () => {
        let flag = true;
        if (checkOutDate - checkInDate < 0) flag = false;
        return flag;
    }

    const handleBooking = (roomId, room) => {
        if (!user.userId) {
            toast.error("Vui lòng đăng nhập để đặt phòng");
            return;
        }
        if (room.roomStatus === 2) {
            toast.error("Phòng đã hết, vào khoảng ngày này")
            return;
        }
        if (!isValidDate()) {
            toast.error("Vui lòng chọn ngày nhận phòng và trả phòng hợp lệ!");
            return;
        }
        navigate(`/booking-form/${roomId}?hotelId=${hotelId}`);
    };




    const [openSlide, setOpenSlide] = useState(false);
    const [slideContent, setSlideContent] = useState(""); // "feedback" hoặc "service"

    useEffect(() => {
        if (checkInDate && checkOutDate) {
            fetchRoomsByHotelId();
        }
    }, [checkInDate, checkOutDate]);

    const tabs = [
        "Tổng quan", "Thông tin căn hộ", "Tiện nghi", "Quy tắc chung", "Ghi chú", "Đánh giá của khách"
    ]
    const [activeTab, setActiveTab] = useState("Tổng quan")
    const roomRef = useRef(null)
    const hotelRef = useRef(null)
    const serviceRef = useRef(null)
    const handleScroll = (tab) => {
        if (tab === "Tổng quan")
            hotelRef.current.scrollIntoView({ behavior: "smooth" })
        else if (tab === "Thông tin căn hộ")
            roomRef.current.scrollIntoView({ behavior: "smooth" })
        else if (tab === "Tiện nghi")
            serviceRef.current.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div>
            {/* Banner */}
            <img src={banner2} alt="" className="w-full h-[65vh] object-cover" />
            {/* Booking form */}
            <div className="container mx-auto relative mb-[50px]">
                <div className="bg-white lg:absolute lg:left-0 lg:right-0 lg:p-0 lg:-top-12">
                    <BookingSearch />
                </div>
            </div>

            {/**Thanh điều hướng */}
            <div className="w-full flex gap-7 bg-white px-10 py-5 shadow-md bordẻ-gray-300">
                {tabs.map((tab, index) => (
                    <button key={index}
                        onClick={() => { setActiveTab(tab), handleScroll(tab) }}
                        className="relative group font-medium text-[#4b2e1f] text-md lg:text-xl cursor-pointer">
                        {tab}
                        <span className={`absolute left-0 bg-[#6B4423] transition-all duration-400 -bottom-0.5 h-0.5 text-[#4b2e1f] group-hover:w-full ${activeTab === tab ? "w-full" : "w-0"}`}></span>
                    </button>
                ))}
            </div>

            {/* Chi tiết khách sạn */}
            <div ref={hotelRef} className="gap-6 p-6 from-[#f9f5f0] via-white to-[#f9f5f0] rounded-2xl shadow-lg">
                {/* phía trên */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* bên trái */}
                    <div className="flex-2 rounded-xl p-4 shadow-md bg-white/90 backdrop-blur-sm">
                        <h2 className="font-bold font-serif text-2xl text-[#4b2e1f] drop-shadow-sm mb-3">
                            {hotel.hotelName}
                        </h2>
                        <div className="flex items-center mb-3">
                            <FaMapMarkerAlt className="w-5 h-5 text-red-600" />
                            <p className="text-md pl-2 text-gray-700">
                                <span className="font-semibold text-[#4b2e1f]">Địa chỉ:</span>{" "}
                                {hotel.hotelAddress}
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                if (!user.userId) {
                                    toast.error("Vui lòng đăng nhập để chat ");
                                    return;
                                }
                                setOpenChat(true);
                            }}
                            className="fixed bottom-6 right-6 bg-[#4b2e1f] text-white p-4 rounded-full shadow-lg hover:bg-[#6e3d27] transition z-50"
                        >
                            <ChatBubbleOvalLeftIcon className="w-6 h-6 text-white" />
                        </button>

                        <div className="relative h-[50vh] w-[75%] border-2 border-[#4b2e1f]/40 rounded-xl overflow-hidden group">
                            {images && images.length > 0 ? (
                                <>
                                    <ImageSlider sliders={images} />

                                    {/* "Modal nhỏ" hiện khi hover */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div onClick={() => setOpenDetails(true)} className="bg-white/90 cursor-pointer text-[#4b2e1f] px-6 py-3 rounded-xl shadow-lg font-semibold text-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                            Xem chi tiết khách sạn
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex justify-center items-center h-full text-[#4b2e1f]/70">
                                    Chưa có hình ảnh
                                </div>
                            )}
                        </div>
                    </div>

                    {/* bên phải */}
                    <div className="flex-1 border-2 border-[#4b2e1f]/20 rounded-xl shadow-inner bg-white/70 backdrop-blur-sm">
                        <div>
                            <div className="flex justify-end border-b border-gray-300">
                                <div >{
                                    feedbacks.length != 0 && (
                                        hotel.hotelRating >= 4 ? (
                                            <span className="block py-1 px-2 font-bold text-md ">Tuyệt hảo</span>
                                        ) : hotel.hotelRating >= 2 ? (
                                            <span className="block py-1 px-2 font-bold text-md ">Tạm ổn</span>
                                        ) : (
                                            <span className="block py-1 px-2 font-bold text-md">Khá tệ</span>
                                        )
                                    )}
                                    <span className="block pb-1 px-2 font-light text-sm">{feedbacks.length} đánh giá</span>
                                </div>
                                <div className=" flex items-center px-2">
                                    <span className="w-12 text-center bg-blue-800 text-white py-3 border rounded-xl ">{hotel.hotelRating && (hotel.hotelRating.toFixed(1))}</span>
                                </div>
                            </div>
                            <div className="mt-3">
                                <span className="block font-bold text-sm py-1 px-2">Khách lưu trú ở đây thích điều gì?</span>

                                <div className="flex items-center justify-between rounded-md p-3 relative">
                                    {/* Nút trái */}
                                    <button onClick={handlePrev} className="text-gray-600 cursor-pointer hover:text-black text-xl px-2 absolute left-2"
                                        disabled={feedbacks.length === 0}
                                    >
                                        <ChevronLeft size={22} />
                                    </button>

                                    {/* Nội dung feedback */}
                                    <div className="flex-1 text-center px-10">
                                        {feedbacks.length > 0 ? (<p className="text-gray-700 text-sm ">
                                            “{feedbacks[currentIndex].feedback}”</p>) :
                                            (<p className="text-gray-500 text-sm italic">Chưa có đánh giá nào.</p>)
                                        }
                                    </div>

                                    {/* Nút phải */}
                                    <button
                                        onClick={handleNext}
                                        className="text-gray-600 hover:text-black cursor-pointer text-xl px-2 absolute right-2"
                                        disabled={feedbacks.length === 0}
                                    >
                                        <ChevronRight size={22} />
                                    </button>
                                </div>
                                <span className="py-2 px-4 text-blue-600">Tác giả : {feedbacks.length > 0 && (feedbacks[currentIndex].user.firstName + " " + feedbacks[currentIndex].user.lastName)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* phía dưới */}
                {
                    services.length != 0 && (
                        <div>
                            <h2 ref={serviceRef} className="text-xl px-6 font-semibold pt-4">Danh sách tiện nghi nổi bật của khách sạn</h2>
                            <div className="relative py-2 px-4">
                                {/* Vùng cuộn danh sách */}
                                <button onClick={() => scroll("left")} className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-blue-100 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 cursor-poiter text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <div ref={scrollRef} className="flex gap-4 overflow-x scroll-smooth scrollbar-hidden md:overflow-hidden px-2">
                                    {services.map((s) => (
                                        <div key={s.serviceId} className="min-w-[250px] bg-white border border-gray-300 rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-row items-center gap-3 text-left">
                                            <img src={s.icon} className="w-7 h-7 object-contain" />
                                            <div>
                                                <h3 className="text-blue-600 font-semibold text-md">{s.serviceName}</h3>
                                                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{s.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => scroll("right")} className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-blue-100 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 cursor-poiter text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>


            <h2 ref={roomRef} className="w-full text-center mt-5 p-2 font-bold font-sans text-lg md:text-2xl text-[#4b2e1f]">
                Danh sách phòng của {hotel.hotelName} {"(" + checkInDate.toLocaleDateString() + " đến " + checkOutDate.toLocaleDateString() + ")"}
            </h2>
            {
                rooms.length != 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-[90%] bg-gray-50 mx-auto py-6">
                        {rooms.map((room) => (
                            <div key={room.roomId} className="rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition bg-white">
                                {/* Nếu bạn có ảnh room thì thay bằng room.imageUrls[0] */}
                                <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-500">
                                    <img src={banner2} alt="" />
                                </div>

                                <div className="pt-7 pb-5 px-4">
                                    {/* Tên khách sạn */}
                                    <h2 className="mt-5 text-lg font-semibold text-blue-700">
                                        {room.hotel?.hotelName || "Không có tên khách sạn"}
                                    </h2>

                                    {/* Tên & loại phòng */}
                                    <p className="mt-1 font-medium text-gray-800">
                                        {room.roomName} ({room.roomType})
                                    </p>

                                    {/* Thông tin chi tiết */}
                                    <p className="text-sm text-gray-600 mt-1">
                                        🛏️ {room.bedCount} giường • {room.bedRoomCount} phòng ngủ • {room.roomCapacity} khách
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        📐 Diện tích: {room.roomArea} m²
                                    </p>

                                    {/* Giá phòng */}
                                    <div className="flex justify-between items-center mt-3">
                                        <span className="text-lg font-bold text-green-600">
                                            {room.roomPrice.toLocaleString()} ₫/đêm
                                        </span>
                                    </div>

                                    {/* Trạng thái phòng */}
                                    <div className="flex flex-col gap-2 mt-2">
                                        {/* Trạng thái phòng */}
                                        {/* <p className={`text-sm font-medium ${room.statusRoom === 0 ? "text-green-600" :
                                            room.statusRoom === 1 ? "text-red-500" :
                                                "text-yellow-600"
                                            }`}>
                                            {room.statusRoom === 0 ? "Phòng còn trống" :
                                                room.statusRoom === 1 ? "Khách đang ở" :
                                                    "Hết chỗ"}
                                        </p> */}

                                        {/* <p className={`text-sm font-medium ${room.statusRoom === 0 ? "text-green-600" : "text-red-500"}`}>
                                            {room.statusRoom === 0 ? "Phòng còn trống" : "Hết chỗ"}
                                        </p> */}
                                        {changeStatusRoom(room.status, room.roomStatus)}


                                        {/* Nút hành động */}
                                        <div className="flex gap-3 justify-end">
                                            {disableBooking(room.status, room)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) :
                    <div className="font-md text-xl text-center py-4">Không có phòng nào</div>
            }
            {/* <RoomList rooms={rooms} hotelId={hotelId} /> */}

            {openChat && (
                <div className="fixed bottom-4 right-4 flex gap-4 z-10">
                    <ChatBox onClose={() => handleCloseChat()} hotelId={hotelId} />
                </div>
            )}
            {openDetails && (
                <ModelForm width="1150px" onClose={() => setOpenDetails(false)}>
                    <div className="w-[1150px] grid grid-cols-1 md:grid-cols-12 gap-2">
                        {/* Cột 1: Thông tin cá nhân */}
                        <div className="md:col-span-4 flex justify-center">
                            <div className="bg-white shadow-lg rounded-2xl w-full p-8">
                                <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                                    Chủ khách sạn
                                </h1>

                                <div className="flex flex-col items-center mb-6">
                                    <div className="relative w-24 h-24">
                                        <img
                                            alt="Avatar"
                                            src={hotel.user.avatar || "/default-avatar.png"}
                                            className="w-24 h-24 rounded-full object-cover border"
                                        />
                                        <input
                                            id="avatar"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Họ</label>
                                        <input
                                            value={hotel.user.firstName}
                                            disabled
                                            className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Tên</label>
                                        <input
                                            value={hotel.user.lastName}
                                            disabled
                                            className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={hotel.user.email}
                                            disabled
                                            className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                                        <input
                                            disabled
                                            value={hotel.user.phone}
                                            className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Ngày sinh</label>
                                        <input
                                            type="date"
                                            value={hotel.user.dateOfBirth || ""}
                                            disabled
                                            className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cột 2 */}
                        <div className="md:col-span-5 flex flex-col justify-start items-center bg-white shadow-lg rounded-2xl pb-2 gap-4 w-full mx-auto">

                            <h2 className="text-2xl font-bold text-[#4b2e1f] text-center">{hotel.hotelName}</h2>
                            <p className="flex items-center text-gray-600 text-sm text-center">
                                <FaMapMarkerAlt className="text-red-600 mr-2" /> {hotel.hotelAddress}
                            </p>

                            <div className="flex justify-center gap-15 items-center w-full mt-2 text-gray-700 text-sm px-4">
                                {/* Điện thoại */}
                                <div className="flex items-center gap-1">
                                    <FaPhoneAlt className="text-green-600" />
                                    {hotel.hotelPhone}
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="bg-green-600 text-white px-3 py-1 rounded-full font-semibold text-sm">
                                        {hotel.hotelRating.toFixed(1)}
                                    </span>
                                    <span className="text-gray-600 text-sm">
                                        {feedbacks.length} đánh giá
                                    </span>
                                </div>
                            </div>


                            <div className="flex justify-center gap-15 w-full mt-2 text-gray-700 text-sm px-4">
                                <span className="flex items-center gap-1">
                                    <FaBed className="text-blue-600" /> {hotel.hotelTotalRoom} phòng
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaDollarSign className="text-green-600" /> {hotel.hotelCost.toLocaleString()}₫/đêm
                                </span>
                            </div>

                            {hotel.hotelDescription && (
                                <p className="text-gray-700 text-sm text-center mt-2 line-clamp-4">
                                    {hotel.hotelDescription}
                                </p>
                            )}

                            <div className="grid grid-cols-2 gap-2 w-[95%]">
                                {(images.length > 0 ? images : [banner2]).map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img.imgUrl || banner2}
                                        alt={`hotel-${idx}`}
                                        className="w-full h-32 object-cover rounded shadow-sm"
                                    />
                                ))}
                            </div>
                        </div>


                        {/* Cột 3 */}
                        <div className="md:col-span-3 flex flex-col gap-6 p-4 w-full max-h-[80vh] overflow-y-auto">
                            <button
                                onClick={() => {
                                    setSlideContent("feedback");
                                    setOpenSlide(true);
                                }}
                                className="flex items-center gap-3 w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-200"
                            >
                                <FaRegCommentDots className="text-xl" />
                                <span className="text-lg">Xem tất cả đánh giá</span>
                            </button>

                            <button
                                onClick={() => {
                                    setSlideContent("service");
                                    setOpenSlide(true);
                                }}
                                className="flex items-center gap-3 w-full bg-green-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:bg-green-700 hover:scale-105 transition-transform duration-200"
                            >
                                <FaConciergeBell className="text-xl" />
                                <span className="text-lg">Xem tất cả dịch vụ</span>
                            </button>
                            <SlidePanel isOpen={openSlide} onClose={() => setOpenSlide(false)} width="50%">
                                {slideContent === "feedback" ? (
                                    <div>
                                        <h2 className="text-xl font-bold mb-4">Tất cả đánh giá</h2>
                                        {feedbacks.length > 0 ? (
                                            feedbacks.map((f, i) => (
                                                <div key={i} className="border-b py-2">
                                                    <p className="text-gray-700">{f.feedback}</p>
                                                    <p className=" text-sm font-medium mt-1">
                                                        Khách hàng : {f.user.firstName} {f.user.lastName} — Đánh giá {f.star} ⭐
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 italic">Chưa có đánh giá nào.</p>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <h2 className="text-xl font-bold mb-4">Tất cả dịch vụ</h2>
                                        {services.length > 0 ? (
                                            services.map((s) => (
                                                <div key={s.serviceId} className="flex items-center gap-3 border-b py-2">
                                                    <img src={s.icon} className="w-6 h-6" />
                                                    <p className="text-gray-700">{s.serviceName}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 italic">Chưa có dịch vụ nào.</p>
                                        )}
                                    </div>
                                )}
                            </SlidePanel>
                        </div>

                    </div>


                </ModelForm>
            )}
        </div>
    );
}
export default DetailsHotelView;