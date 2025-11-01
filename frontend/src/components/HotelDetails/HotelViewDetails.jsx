import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import banner2 from "../../assets/img/banner2.jpg";
import { FaMapMarkerAlt } from "react-icons/fa";
import BookingSearch from "../BookingSearch";
import TopTabBar from "./Tabbar";
import ImageSlider from "../Common/ImageSlider";
import RoomList from "./RoomList";
import api from "../../api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import ChatBox from "../Chatbox";

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
    const user = useSelector((state) => state.user);
    const [rooms, setRooms] = useState([]);
    const [images, setImages] = useState([]);
    const { hotelId } = useParams();
    //Chat
    const [openChat, setOpenChat] = useState(false);
    const [hotel, setHotel] = useState([]);
    const [feedbacks, setFeedBacks] = useState([])
    const [services, setServices] = useState([])

    const fetchHotelService = async () => {
        const response = await api.get(`/service/hotel/${hotelId}`)
        setServices(response.data.result)
        return response.data.result;
    }
    useEffect(() => {
        fetchHotelService()
    }, [])

    const handleCloseChat = () => {
        setOpenChat(false);
    };
    const fetchHotelByHotelId = async () => {
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

    const fetchRoomsByHotelId = async () => {
        try {
            const roomData = await api.get(`rooms/hotel/${hotelId}`);
            setRooms(roomData.data.result)
            const imageData = await api.get(`/images/hotel/${hotelId}`);
            setImages(imageData.data.result);
        } catch (error) {
            console.error("Error when load data :", error);
        }
    };

    useEffect(() => {
        fetchHotelByHotelId()
        fetchFeedBackByHotelId()
        fetchRoomsByHotelId()
    }, [])

    const roomsRef = useRef(null);
    const handleScrollToRooms = () => {
        roomsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const detailsHotelsRef = useRef(null);
    const handleScrollToDetailsHotel = () => {
        detailsHotelsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? feedbacks.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === feedbacks.length - 1 ? 0 : prev + 1
        );
    };
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

            {/* Thanh tab điều hướng */}
            <TopTabBar scrollToRooms={handleScrollToRooms} scrollToDetailsHotel={handleScrollToDetailsHotel} />



            {/* Chi tiết khách sạn */}
            <div ref={detailsHotelsRef} className="gap-6 p-6 bg-gradient-to-r from-[#f9f5f0] via-white to-[#f9f5f0] rounded-2xl shadow-lg">
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

                        <div className="h-[50vh] w-[75%] border-2 border-[#4b2e1f]/40 rounded-xl overflow-hidden">
                            {images && images.length > 0 ? (
                                <ImageSlider sliders={images} />
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
                                    hotel.hotelRating >= 4 ? (
                                        <span className="block py-1 px-2 font-bold text-md ">Tuyệt hảo</span>
                                    ) : hotel.hotelRating >= 2 ? (
                                        <span className="block py-1 px-2 font-bold text-md ">Tạm ổn</span>
                                    ) : (
                                        <span className="block py-1 px-2 font-bold text-md">Khá tệ</span>
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
                <h2 className="text-xl px-6 font-semibold pt-4">Danh sách dịch vụ nổi bật của khách sạn</h2>
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


            <h2 ref={roomsRef} className="w-full text-center mt-5 p-2 font-bold font-sans text-lg md:text-xl text-[#4b2e1f]">
                Những phòng còn trống tại khách sạn {hotel.hotelName}
            </h2>
            <RoomList rooms={rooms} hotelId={hotelId} />
            {openChat && (
                <div className="fixed bottom-4 right-4 flex gap-4 z-10">
                    <ChatBox onClose={() => handleCloseChat()} hotelId={hotelId} />
                </div>
            )}
        </div>
    );
}
export default DetailsHotelView;