import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import banner2 from "../../assets/img/banner2.jpg";
import { FaMapMarkerAlt } from "react-icons/fa";
import BookingSearch from "../BookingSearch";
import TopTabBar from "./TabbarDetailsHotel";
import ImageSlider from "./ImageSlider";
import RoomList from "./RoomList";
import api from "../../api";
function DetailsHotelView() {
    const [rooms, setRooms] = useState([]);
    const [images, setImages] = useState([]);
    const { hotelId } = useParams();
    console.log(typeof hotelId)
    const [hotel, setHotel] = useState([]);

    useEffect(() => {
        const fetchHotelByHotelId = async () => {
            try {
                const request = await api.get(`/hotels/${hotelId}`)
                setHotel(request.data.result)
            } catch (error) {
                console.error("Error when load data :", error);
            }
        }
        fetchHotelByHotelId()
    }, [])


    useEffect(() => {
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
        fetchRoomsByHotelId();
    }, [hotelId]);

    const roomsRef = useRef(null);
    const handleScrollToRooms = () => {
        roomsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const detailsHotelsRef = useRef(null);
    const handleScrollToDetailsHotel = () => {
        detailsHotelsRef.current?.scrollIntoView({ behavior: "smooth" });
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
            <div ref={detailsHotelsRef} className="flex flex-col lg:flex-row gap-6 p-6 bg-gradient-to-r from-[#f9f5f0] via-white to-[#f9f5f0] rounded-2xl shadow-lg">
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

                <div className="flex-1 border-2 border-[#4b2e1f]/20 rounded-xl shadow-inner bg-white/70 backdrop-blur-sm">
                    {/* Bạn có thể thêm đánh giá, mô tả chi tiết, bản đồ... */}
                </div>
            </div>

            <h2 ref={roomsRef} className="w-full text-center mt-5 p-2 font-bold font-sans text-lg md:text-xl text-[#4b2e1f]">
                Những phòng còn trống tại khách sạn {hotel.hotelName}
            </h2>
            <RoomList rooms={rooms} hotelId={hotelId} />
        </div>
    );
}
export default DetailsHotelView;
