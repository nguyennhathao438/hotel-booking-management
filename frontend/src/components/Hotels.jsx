import { useContext, useRef } from "react";
import testImg from "../assets/img/banner2.jpg";
import { Context } from "./RoomContext";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Hotels() {
    const { hotels } = useContext(Context)
    const hotelsSort = [...hotels]
    hotelsSort.sort((a, b) => b.hotelRating - a.hotelRating)
    const hotelsTops = hotelsSort.splice(0, 10)
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
    return (
        <div className="p-4">
            <h3 className="w-full p-4 font-bold font-sans text-lg md:text-xl">
                KHÁCH SẠN ĐƯỢC ĐÁNH GIÁ CAO
            </h3>
            <div className="relative group px-4 md:px-8">
                <button onClick={() => scroll("left")} className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-blue-100 transition">
                    <ChevronLeft className="text-blue-600" />
                </button>
                <ul ref={scrollRef} className="flex flex-row gap-4 overflow-x-auto scrollbar-hide scroll-smooth md:gap-6 md:overflow-hidden">
                    {hotelsTops.map((hotel) => (
                        <li key={hotel.hotelId} className="flex-shrink-0 w-[220px] md:w-[260px] lg:w-[280px] h-[360px] flex flex-col justify-between rounded-xl border shadow hover:shadow-lg transition bg-white cursor-pointer">
                            <div className="overflow-hidden h-[45%]">
                                <img src={testImg} alt={hotel.hotelName} className="w-full h-full object-cover rounded-t-xl hover:scale-105 transition-transform duration-300" />
                            </div>
                            {/* Nội dung */}
                            <div className="flex flex-col justify-between h-[55%] p-4">
                                <Link to={`/detailshotel/${hotel.hotelId}`}>
                                    <h3 className="font-bold text-base text-center line-clamp-1">{hotel.hotelName}</h3>
                                </Link>
                                <p className="text-sm text-gray-600 line-clamp-1 text-center">{hotel.hotelAddress}</p>
                                <p className="hidden md:block text-sm text-gray-500 line-clamp-2 text-center">{hotel.hotelDescription}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="font-semibold text-blue-600"> ⭐ {hotel.hotelRating}</span>
                                    <span className="font-semibold text-orange-600 text-sm">{hotel.hotelCost.toLocaleString()} VNĐ</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <button onClick={() => scroll("right")} className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-blue-100 transition">
                    <ChevronRight className="text-blue-600" />
                </button>
            </div>
        </div>
    );
}

export default Hotels;
