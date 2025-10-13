import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import banner2 from "../../assets/img/banner2.jpg"
import { Context } from "../RoomContext";
import { FaHome } from "react-icons/fa";
import { MdWifi } from "react-icons/md";
import { Bed } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { DoorOpen } from "lucide-react";
import { User } from "lucide-react";
import Booking from "../Booking"
import TopTabBar from "./TabbarDetailsHotel";
import ImageSlider from "./ImageSlider";
import api from "../../api";
function DetailsHotel() {
    const { rooms, setRooms } = useContext(Context)
    const { images, setImages } = useContext(Context)
    const { hotelId } = useParams()
    console.log("hotelId from params:", hotelId);
    const { hotels } = useContext(Context)
    const hotel = hotels.find((h) => {
        return String(h.hotelId) === hotelId
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const roomData = await api.get(`rooms/hotel/${hotelId}`);
                setRooms(roomData.data.result)
                const imageData = await api.get(`/images/hotel/${hotelId}`);
                setImages(imageData.data.result);
            } catch (error) {
                console.error("Error when load data :", error);
            }
        };
        fetchData();
    }, [hotelId]);
    if (!hotel) {
  return <div className="p-4 text-center">Đang tải dữ liệu khách sạn...</div>;
}
    return (
        <div>
            <img src={banner2} alt="" className="w-full h-[65vh] object-cover" />
            <div className="container mx-auto relative mb-[50px] ">
                <div className="bg-white lg:absolute lg:left-0
                            lg:right-0 lg:p-0 lg:-top-12">
                    <Booking />
                </div>
            </div>
            {/*thanh taskbar gioi thieu*/}
            <TopTabBar />
            {/*chi tiết khách sạn*/}
            <div className="flex p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-2xl shadow-lg">
                {/* Khối thông tin */}
                <div className=" flex-2 rounded-xl p-4 shadow-md bg-white/80 backdrop-blur-sm">
                    <h2 className="font-bold font-serif text-2xl text-blue-600 drop-shadow-sm mb-3">
                        {hotel.hotelName}
                    </h2>

                    <div className="flex items-center mb-3">
                        <FaMapMarkerAlt className="w-5 h-5 text-red-500" />
                        <p className="text-md pl-2 text-gray-700">
                            <span className="font-semibold">Địa chỉ:</span> {hotel.hotelAddress}
                        </p>
                    </div>

                    <div className="h-[50vh] w-[75%] border rounded-xl">
                        {images && images.length > 0 ? (<ImageSlider sliders={images} />) : (<div></div>)}
                    </div>
                </div>

                {/* Khối bên phải (trống) */}
                <div className="flex-1 border rounded-xl shadow-inner bg-white/70 backdrop-blur-sm">
                    {/* Bạn có thể thêm đánh giá, tiện ích, giá ở đây */}
                </div>
            </div>

            {/*nếu phòng còn trống của khách sạn đó*/}
            <h2 className="w-full text-center mt-5 p-2 font-bold font-sans text-lg md:text-xl">Những phòng còn trống tại khách sạn {hotel.hotelName}</h2>
            <div className="w-[90%] m-auto">
                {
                    rooms.map((room) => (
                        <div
                            key={room.roomId}
                            className="flex m-5 p-2 border rounded-2xl shadow-xl bg-gradient-to-r from-blue-50 via-white to-blue-50 hover:from-blue-100 hover:to-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                        >
                            <div className="w-[30%]">
                                <h2 className="p-2 text-2xl font-bold text-blue-400 drop-shadow-sm">
                                    {room.roomName}
                                </h2>
                                <img
                                    src={banner2}
                                    alt=""
                                    className="rounded-2xl object-cover shadow-md hover:shadow-lg transition-all duration-300"
                                />
                            </div>

                            <div className="flex w-[70%] p-4 rounded-xl bg-white/70 backdrop-blur-sm">
                                {/* --- Thông tin phòng --- */}
                                <div className="flex-1 border rounded-xl bg-gradient-to-b from-white to-blue-50 p-2">
                                    <div className="text-center font-bold text-lg p-2 text-blue-600">
                                        <h2>Thông tin phòng</h2>
                                    </div>
                                    <div className="flex p-2 items-center ">
                                        <Bed className="text-blue-500" />
                                        <span className="pl-2">{room.bedCount} giường ngủ</span>
                                    </div>
                                    <div className="flex p-2 items-center ">
                                        <DoorOpen className="text-blue-500" />
                                        <span className="pl-2">{room.bedRoomCount} phòng ngủ</span>
                                    </div>
                                    <div className="flex items-center pl-2">
                                        <FaHome className="text-blue-500" />
                                        <span className="p-2">{room.roomArea} m<sup>2</sup></span>
                                    </div>
                                    <div className="flex items-center pl-2">
                                        <MdWifi className="text-green-500" />
                                        <span className="p-2">Wifi miễn phí</span>
                                    </div>
                                </div>

                                {/* --- Số lượng người --- */}
                                <div className="flex-1 border rounded-xl flex flex-col bg-gradient-to-b from-white to-blue-50">
                                    <div className="text-center font-bold text-lg p-2 text-blue-600">
                                        <h2>Số lượng người</h2>
                                    </div>
                                    <div className="flex h-full items-center justify-center gap-1">
                                        {Array.from({ length: room.roomCapacity }).map((_, index) => (
                                            <User key={index} className="w-6 h-6 text-blue-600" />
                                        ))}
                                    </div>
                                </div>

                                {/* --- Giá phòng --- */}
                                <div className="flex-1 border rounded-xl flex flex-col bg-gradient-to-b from-white to-blue-50">
                                    <div className="text-center font-bold text-lg p-2 text-blue-600">
                                        <h2>Giá phòng / đêm</h2>
                                    </div>
                                    <div className="h-full items-center flex justify-end pr-4">
                                        <p className="text-orange-500 font-bold text-xl drop-shadow-sm">
                                            {room.roomPrice} VNĐ
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
export default DetailsHotel